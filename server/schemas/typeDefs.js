const typeDefs = `
  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    orders: [Order]
  }

  type Freelancer {
    _id: ID
    name: String!
    service: String!
    description: String
    image: String
    price: Float!
    rating: Float
    projectsCompleted: Int
    signedUpDuration: Int
    availability: Boolean
  }

  type Order {
    _id: ID
    purchaseDate: String
    freelancers: [Freelancer]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    freelancers: [Freelancer]
    freelancer(_id: ID!): Freelancer
    user: User
    order(_id: ID!): Order
    checkout(freelancers: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(freelancers: [ID]!): Order
    updateUser(userame: String, email: String, password: String): User
    updateFreelancer(_id: ID!, quantity: Int!): Freelancer
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;