import { gql } from '@apollo/client';

export const QUERY_FREELANCERS = gql`
  {
    freelancers {
      _id
      name
      service
      description
      image
      price
      rating
      projectsCompleted
      signedUpDuration
      availability
      skills
    }
  }
`;

export const QUERY_FREELANCER = gql`
  query freelancer($id: ID!) {
    freelancer(_id: $id) {
      _id
      name
      service
      description
      image
      price
      rating
      projectsCompleted
      signedUpDuration
      availability
      skills
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      username
      email
      orders {
        _id
        purchaseDate
        freelancers {
          _id
          name
          service
          price
          availability
          skills
        }
      }
    }
  }
`;

export const QUERY_ORDER = gql`
  query order($id: ID!) {
    order(_id: $id) {
      _id
      purchaseDate
      freelancers {
        _id
          name
          service
          price
          availability
          skills
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($freelancers: [ID]!) {
    checkout(freelancers: $freelancers) {
      session
    }
  }
`;