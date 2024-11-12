# Taskable

Taskable is a comprehensive platform for connecting clients with skilled freelancers and developers for a wide range of tasks. This application enables users to browse, interact, and hire developers or freelancers, manage tasks, and complete secure transactions using Stripe integration.

## Introduction

Taskable aims to create a streamlined and interactive experience for clients seeking development assistance. Registered users can browse freelancers by category, view profiles, and add services to their cart. With real-time updates, seamless user authentication, and a secure checkout, Taskable offers an intuitive interface for efficient collaboration.

## :ledger: Index

- [About](#about)
  - [Key Features](#key-features)
  - [Technical Stack](#technical-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
- [Features](#features)
  - [User Interface](#user-interface)
  - [Authentication](#authentication)
  - [Freelancer Discovery](#freelancer-discovery)
  - [Shopping Cart](#shopping-cart)
  - [Checkout System](#checkout-system)
- [Development](#development)
  - [Project Structure](#project-structure)
  - [Build Process](#build-process)
  - [Testing](#testing)
- [Deployment](#deployment)
  - [Frontend (Netlify)](#frontend-netlify)
  - [Backend (Render)](#backend-render)
- [Contributing](#contributing)
  - [Code of Conduct](#code-of-conduct)
  - [Pull Request Process](#pull-request-process)
- [Resources](#resources)
  - [Documentation](#documentation)
  - [Tools Used](#tools-used)
- [Team](#team)
  - [Developers](#developers)
  - [Contributors](#contributors)
- [License](#license)

## About

Taskable is a full-stack MERN application, bringing clients and developers together. Clients can register, search for freelancers, view detailed profiles, and securely complete transactions. The platform integrates authentication, responsive design, and checkout capabilities, delivering a polished user experience.

### Key Features

- **Interactive User Interface**: Animated welcome text with wave effects for engaging first impressions, Dynamic hero section with professional illustrations, Conditional navigation based on authentication status, Seamless modal transitions for login/signup, Responsive design adapting to all screen sizes, Glassmorphism effects for modern aesthetics.
- **Freelancer Discovery**: Advanced search and filtering system, Real-time results updating, Price range slider for budget filtering, Category-based filtering, Responsive card layout with hover animations, Detailed freelancer profiles with service descriptions, Dynamic pricing display with hourly rates.
- **Shopping Cart & Checkout**: Real-time cart management with Redux, Secure Stripe payment integration, Persistent cart data using IndexedDB, Responsive cart layout with mobile optimization, Quick item removal functionality, Clear pricing breakdown, Quantity management for service hours.
- **Authentication & Security**: JWT-based authentication system, Secure session management, Protected routes and API endpoints, Role-based access control, Automatic session timeout handling, Secure password hashing with bcrypt.
- **Technical Stack**: MongoDB for data persistence, Express.js for API routing, React for frontend interface, Node.js for backend operations, Redux for state management, GraphQL for efficient data fetching, Chakra UI for component styling.

### Technical Stack

- MongoDB for data persistence
- Express.js for API routing
- React for frontend interface
- Node.js for backend operations
- Redux for state management
- GraphQL for efficient data fetching
- Chakra UI for component styling

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Stripe API keys

### Installation

1. Clone the repository
2. Install dependencies using `npm install`
3. Set up environment variables

### Environment Setup

- dotenv: Manages environment variables securely, including database URLs and API keys.
- Concurrently: Runs the client and server concurrently for a seamless development experience.

## Features

### User Interface

- Animated welcome text with wave effects for engaging first impressions
- Dynamic hero section with professional illustrations
- Conditional navigation based on authentication status
- Seamless modal transitions for login/signup
- Responsive design adapting to all screen sizes
- Glassmorphism effects for modern aesthetics

### Authentication

- JWT-based authentication system
- Secure session management
- Protected routes and API endpoints
- Role-based access control
- Automatic session timeout handling
- Secure password hashing with bcrypt

### Freelancer Discovery

- Advanced search and filtering system
- Real-time results updating
- Price range slider for budget filtering
- Category-based filtering
- Responsive card layout with hover animations
- Detailed freelancer profiles with service descriptions
- Dynamic pricing display with hourly rates

### Shopping Cart

- Real-time cart management with Redux
- Secure Stripe payment integration
- Persistent cart data using IndexedDB
- Responsive cart layout with mobile optimization
- Quick item removal functionality
- Clear pricing breakdown
- Quantity management for service hours

### Checkout System

- Secure Stripe payment integration
- Persistent cart data using IndexedDB
- Responsive cart layout with mobile optimization
- Quick item removal functionality
- Clear pricing breakdown
- Quantity management for service hours

## Development

### Project Structure

- Models: MongoDB collections for users, freelancers, and orders, managed with Mongoose.
- GraphQL API: Implements queries and mutations for CRUD operations on freelancer data and user profiles.
- Client-Side UI: Developed using React, styled with Chakra UI for a responsive and consistent user experience.
- State Management: Utilizes Redux for handling user and freelancer states efficiently.

### Build Process

- Authentication: JWT: User authentication and role-based access are managed with JSON Web Tokens.
- express-session: Manages sessions for consistent user experience.
- bcrypt: Secures user passwords through hashing.
- Payment Integration: Stripe: Integrated for secure payment processing on the checkout page.

### Testing

- Jest: For unit and integration tests.

## Deployment

Taskable is deployed using Netlify (for frontend) and Render (for backend) for full functionality. Visit the site here: https://taskable.onrender.com/

## Contributing

Your contributions are always welcome and greatly appreciated. Here are some ways you can contribute to the project:

1. **Report a bug** <br>
    If you think you have encountered a bug, and I should know about it, feel free to report it here [here](https://github.com/Zoooe-Brooo/taskable/issues). I will look into it and take the necessary steps.

2. **Request a feature** <br>
    If you have a feature idea that you think would enhance the project, you can request it [here](hhttps://github.com/Zoooe-Brooo/taskable/issues), If the feature is deemed viable, it will be considered for development.

3. **Create a pull request** <br>
    The best way to contribute is by creating a pull request. The community will appreciate your efforts. You can start by picking up any open issues from [here](https://github.com/Zoooe-Brooo/taskable/pulls)and submitting a pull request.

## Resources

### Documentation

- VS Code - A powerful code editor for writing and managing code across various programming languages.
- Git Bash - A command-line interface for Git, providing Unix-like shell commands for version control and repository management.

### Tools Used

- Express: Server framework for API development.
- Mongoose: MongoDB ORM for managing database interactions.
- Stripe: Used for secure payment processing.
- Chakra UI: Responsive UI framework for consistent styling.
- Redux: State management for efficient client-side data handling.
- jsonwebtoken: JWT for secure authentication.
- dotenv: Manages sensitive information.
- bcrypt: Hashes passwords for secure storage.

### Testing Tools

- Jest: For unit and integration tests.

## Team

### Developers

- [Leon Tran](https://github.com/leontran44) - Backend Development
- [Zoe (Wenli Zhong)](https://github.com/Zoooe-Brooo) - Frontend Development
- [Christopher](https://github.com/chrispychips12) - Full Stack Development

### Contributors

- [Contributor Name](https://github.com/contributor-username) - Contribution Description

## License

This project is licensed under the [MIT](https://opensource.org/license/mit) License.
