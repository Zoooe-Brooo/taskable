const db = require('./connection');
const { User, Freelancer } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Freelancer', 'freelancers');
  await cleanDB('User', 'users');

  const freelancers = await Freelancer.insertMany([
    {
      name: 'Amy Smith',
      service: 'Full Stack Developer',
      description:
      'A versatile developer skilled in both front-end and back-end technologies, capable of building and maintaining complex web applications.',
      image: 'freelancer-image.png',
      price: 60,
      rating: 4.5,
		  projectsCompleted: 120,
		  signedUpDuration: 3,
      availability: true,
      skills: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'React', 'MongoDB']
    },
    {
      name: 'John Doe',
      service: 'Front-End Developer',
      description:
      'A front-end developer specializing in building and maintaining responsive websites and web applications.',
      image: 'freelancer-image.png',
      price: 40,
      rating: 4.2,
		  projectsCompleted: 90,
		  signedUpDuration: 2,
      availability: true,
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap']
    },
    {
      name: 'Brianna Johnson',
      service: 'Back-End Developer',
      description:
      'A back-end developer specializing in building and maintaining server-side logic and databases for web applications.',
      image: 'freelancer-image.png',
      price: 50,
      rating: 4.8,
		  projectsCompleted: 100,
		  signedUpDuration: 2,
      availability: true,
      skills: ['Node.js', 'Express', 'MongoDB', 'SQL', 'REST APIs', 'GraphQL']
    },
    {
      name: 'Mike Williams',
      service: 'UI/UX Designer',
      description:
      'A UI/UX designer specializing in creating user-friendly interfaces and experiences for web and mobile applications.',
      image: 'freelancer-image.png',
      price: 45,
      rating: 4.6,
	  	projectsCompleted: 80,
  		signedUpDuration: 1,
      availability: true,
      skills: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'User Research', 'Wireframing']
    },
    {
      name: 'Jessica Brown',
      service: 'Baby Sitter',
      description:
      'A responsible and caring baby sitter with experience caring for children of all ages.',
      image: 'freelancer-image.png',
      price: 35,
      rating: 4.9,
	  	projectsCompleted: 70,
  		signedUpDuration: 1,
      availability: true,
      skills: ['Childcare', 'First Aid', 'CPR', 'Cooking', 'Cleaning']
    },
    {
      name: 'David Wilson',
      service: 'Gardener',
      description:
      'A skilled gardener with experience maintaining lawns, gardens, and landscapes.',
      image: 'freelancer-image.png',
      price: 45,
      rating: 4.7,
	  	projectsCompleted: 60,
  		signedUpDuration: 1,
      availability: true,
      skills: ['Lawn Care', 'Planting', 'Pruning', 'Weeding', 'Mulching']
    },
    {
      name: 'Sarah Martinez',
      service: 'House Cleaner',
      description:
      'A thorough and detail-oriented house cleaner with experience cleaning homes, apartments, and offices.',
      image: 'freelancer-image.png',
      price: 30,
      rating: 4.8,
	  	projectsCompleted: 50,
	  	signedUpDuration: 1,
      availability: true,
      skills: ['Cleaning', 'Dusting', 'Vacuuming', 'Mopping', 'Laundry']
    },
    {
      name: 'Daniel Thompson',
      service: 'Dog Walker',
      description:
      'A reliable and trustworthy dog walker with experience walking dogs of all breeds and sizes.',
      image: 'freelancer-image.png',
      price: 20,
      rating: 4.9,
		  projectsCompleted: 40,
	  	signedUpDuration: 1,
      availability: true,
      skills: ['Dog Walking', 'Pet Sitting', 'Feeding', 'Watering', 'Exercise']
    },
    {
      name: 'Olivia Garcia',
      service: 'Tutor',
      description:
      'An experienced tutor with expertise in a variety of subjects, capable of helping students of all ages.',
      image: 'freelancer-image.png',
      price: 40,
      rating: 4.7,
		  projectsCompleted: 30,
	    signedUpDuration: 1,
      availability: true,
      skills: ['Math', 'Science', 'English', 'History', 'Foreign Language']
    },
    {
      name: 'William Lee',
      service: 'Personal Trainer',
      description:
      'A certified personal trainer with experience creating custom workout plans and providing fitness coaching.',
      image: 'freelancer-image.png',
      price: 40,
      rating: 4.6,
		  projectsCompleted: 20,
  		signedUpDuration: 1,
      availability: true,
      skills: ['Fitness Training', 'Strength Training', 'Cardio', 'Nutrition', 'Weight Loss']
    }
  ]);

  console.log('freelancers seeded');

  await User.create({
    username: 'Pamela Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        freelancers: [freelancers[0]._id, freelancers[1]._id]
      }
    ]
  });

  await User.create({
    username: 'Elijah Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
