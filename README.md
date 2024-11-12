# Taskable

Taskable is a comprehensive platform for connecting clients with skilled freelancers and developers for a wide range of tasks. This application enables users to browse, interact, and hire developers or freelancers, manage tasks, and complete secure transactions using Stripe integration.

## Introduction

Taskable aims to create a streamlined and interactive experience for clients seeking development assistance. Registered users can browse freelancers by category, view profiles, and add services to their cart. With real-time updates, seamless user authentication, and a secure checkout, Taskable offers an intuitive interface for efficient collaboration.

## :ledger: Index

-   [About](#beginner-about)
    -   [Build](#hammer-build)
    -   [Deployment](#rocket-deployment)
-   [Community](#cherry_blossom-community)
    -   [Contribution](#fire-contribution)
-   [Resources](#page_facing_up-resources)
-   [Gallery](#camera-gallery)
-   [Credit/Acknowledgment](#star2-creditacknowledgment)
-   [License](#lock-license)

## :beginner: About

Taskable is a full-stack MERN application, bringing clients and developers together. Clients can register, search for freelancers, view detailed profiles, and securely complete transactions. The platform integrates authentication, responsive design, and checkout capabilities, delivering a polished user experience.

### Features include:

-   **User Authentication**: Secure sign-up and login using JWT, with role-based access and session handling.
-   **Dynamic Freelancer Profiles**: Clients can view freelancer details and services, add them to a cart, and initiate secure payments.
-   **Cart Management**: Users can add or remove freelancers from the cart and view the total before checkout.
-   **Stripe Payment Integration**: Taskable features a seamless checkout with Stripe, redirecting users to confirm payments securely.
-   **Responsive and Accessible UI**: Built with Chakra UI for consistent, responsive, and accessible design across all devices.
-   **Database Management**: MongoDB, managed via Mongoose, stores user, freelancer, and transaction data securely.
-   **Redux State Management**: React-Redux for centralized state management, improving responsiveness and interaction handling across components.

## :hammer: Build

**MERN Structure**

-   Models: MongoDB collections for users, freelancers, and orders, managed with Mongoose.
-   GraphQL API: Implements queries and mutations for CRUD operations on freelancer data and user profiles.
-   Client-Side UI: Developed using React, styled with Chakra UI for a responsive and consistent user experience.
-   State Management: Utilizes Redux for handling user and freelancer states efficiently.

**Authentication**

-   JWT: User authentication and role-based access are managed with JSON Web Tokens.
-   express-session: Manages sessions for consistent user experience.
-   bcrypt: Secures user passwords through hashing.
    Payment Integration
-   Stripe: Integrated for secure payment processing on the checkout page.

**Code Quality**

-   Comments: Extensive in-line comments explaining complex logic for easier maintenance.
-   Best Practices: The codebase follows best practices for structure, naming, and indentation to ensure readability.

**Environment Setup**

-   dotenv: Manages environment variables securely, including database URLs and API keys.
-   Concurrently: Runs the client and server concurrently for a seamless development experience.

## :rocket: Deployment

Taskable is deployed using Netlify (for frontend) and Render (for backend) for full functionality. Visit the site here: https://taskable.onrender.com/

## :fire: Contribution

Your contributions are always welcome and greatly appreciated. Here are some ways you can contribute to the project:

1.  **Report a bug** <br>
    If you think you have encountered a bug, and I should know about it, feel free to report it here [here](https://github.com/Zoooe-Brooo/taskable/issues). I will look into it and take the necessary steps.

2.  **Request a feature** <br>
    If you have a feature idea that you think would enhance the project, you can request it [here](hhttps://github.com/Zoooe-Brooo/taskable/issues), If the feature is deemed viable, it will be considered for development.

3.  **Create a pull request** <br>
    The best way to contribute is by creating a pull request. The community will appreciate your efforts. You can start by picking up any open issues from [here](https://github.com/Zoooe-Brooo/taskable/pulls)and submitting a pull request.

## :page_facing_up: Resources

**Development Tools:**

-   VS Code - A powerful code editor for writing and managing code across various programming languages.
-   Git Bash - A command-line interface for Git, providing Unix-like shell commands for version control and repository management.

**Libraries and APIs:**

-   Express: Server framework for API development.
-   Mongoose: MongoDB ORM for managing database interactions.
-   Stripe: Used for secure payment processing.
-   Chakra UI: Responsive UI framework for consistent styling.
-   Redux: State management for efficient client-side data handling.
-   jsonwebtoken: JWT for secure authentication.
-   dotenv: Manages sensitive information.
-   bcrypt: Hashes passwords for secure storage.

**Testing Tools:**

-   Jest: For unit and integration tests.

## :camera: Gallery

Below is a preview photo of the website.

Click here to view preview photos: (TBA)

## :star2: Credit/Acknowledgment

Team Book Hive!

-   [Leon Tran](https://github.com/leontran44)
-   [Zoe (Wenli Zhong)](https://github.com/Zoooe-Brooo)
-   [Christopher](https://github.com/chrispychips12)

## :lock: License

This project is licensed under the [MIT](https://opensource.org/license/mit) License.
