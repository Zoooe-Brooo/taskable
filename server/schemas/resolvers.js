const { User, Freelancer, Order } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const Stripe = require('stripe');
const stripe = new Stripe('sk_test_wsFx86XDJWwmE4dMskBgJYrt'); 
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const resolvers = {
	Query: {
		freelancers: async () => {
			return await Freelancer.find({});
		},
		freelancer: async (parent, { _id }) => {
			return await Freelancer.findById(_id);
		},
		user: async (parent, args, context) => {
			if (context.user) {
				const user = await User.findById(context.user._id).populate(
					'orders.freelancers'
				);

				user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

				return user;
			}

			throw AuthenticationError;
		},
		order: async (parent, { _id }, context) => {
			if (context.user) {
				const user = await User.findById(context.user._id).populate(
					'orders.freelancers'
				);

				return user.orders.id(_id);
			}

			throw AuthenticationError;
		},
		checkout: async (parent, args, context) => {
			const url = new URL(context.headers.referer).origin;
			const order = new Order({ freelancers: args.freelancers });
			const line_items = [];
		  
			const { freelancers } = await order.populate('freelancers');
		  
			for (let i = 0; i < freelancers.length; i++) {
			  // Create a product to represent the freelancer's service
			  const product = await stripe.products.create({
				name: freelancers[i].name,
				description: freelancers[i].description,
				images: [`${url}/images/${freelancers[i].image}`],
			  });
		  
			  // Create a price for that product
			  const price = await stripe.prices.create({
				product: product.id,
				unit_amount: freelancers[i].price * 100, // Convert to cents if needed
				currency: 'aud',
			  });
		  
			  // Add line item for the checkout session
			  line_items.push({
				price: price.id,
				quantity: 1,
			  });
			}
		  
			// Create a checkout session
			const session = await stripe.checkout.sessions.create({
			  payment_method_types: ['card'],
			  line_items,
			  mode: 'payment',
			  success_url: `${url}/my-profile`,
			  cancel_url: `${url}/`,
			});
		  
			return { session: session.id };
		  },
		  
	},
	Mutation: {
		addUser: async (_, { firstName, lastName, email, password }) => {
			try {
				const existingUser = await User.findOne({ email });
				if (existingUser) {
					throw new Error('User with this email already exists');
				}

				const user = await User.create({
					firstName,
					lastName,
					email,
					password,
				});
				const token = signToken(user);
				return {
						token,
						user,
				};
			} catch (err) {
				console.error('Detailed error:', err);
				if (err.code === 11000) {
					throw new Error('Email address is already in use');
				}
				throw new Error(err.message || 'Error creating user account');
			}
		},
		addOrder: async (parent, { freelancers }, context) => {
			if (context.user) {
				const order = new Order({ freelancers });

				await User.findByIdAndUpdate(context.user._id, {
					$push: { orders: order },
				});

				return order;
			}

			throw AuthenticationError;
		},
		updateUser: async (parent, args, context) => {
			if (context.user) {
				return await User.findByIdAndUpdate(context.user._id, args, {
					new: true,
				});
			}

			throw AuthenticationError;
		},
		updateFreelancer: async (parent, { _id, availability }) => {
			return await Freelancer.findByIdAndUpdate(
				_id,
				{ availability: availability === 'false' },
				{ new: true }
			);
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw AuthenticationError;
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw AuthenticationError;
			}

			const token = signToken(user);

			return { token, user };
		},
	},
};

module.exports = resolvers;
