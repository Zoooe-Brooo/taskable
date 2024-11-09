import { gql } from '@apollo/client';

export const ADD_USER = gql`
	mutation addUser(
		$firstName: String!
		$lastName: String!
		$email: String!
		$password: String!
	) {
		addUser(
			firstName: $firstName
			lastName: $lastName
			email: $email
			password: $password
		) {
			token
			user {
				_id
				firstName
				lastName
				email
			}
		}
	}
`;

export const LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				firstName
				lastName
				email
			}
		}
	}
`;

export const ADD_ORDER = gql`
	mutation addOrder($freelancers: [ID]!) {
		addOrder(freelancers: $freelancers) {
			purchaseDate
			freelancers {
				_id
				name
				service
				price
				availability
			}
		}
	}
`;

export const RESET_PASSWORD = gql`
	mutation resetPassword($email: String!) {
		resetPassword(email: $email) {
			success
			message
		}
	}
`;
