# D-kart: Ecommerce Website
---
## Table of Contents
1. [Project Overview](#project-overview)
2. [Video Demo](#video-demo)
3. [Features](#features)
4. [Technologies Used](#technologies-used)
5. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
6.  [Usage](#usage)
7. [Contributing](#contributing)


---

## Project Overview

D-kart is a full-featured ecommerce website where users can browse products, add items to their cart, and securely purchase them using Stripe for payment processing. The project focuses on delivering a smooth shopping experience with features like user authentication, real-time cart updates, and seamless payment integration.

---
## Video Demo

[![D-kart Demo](your_video_link)](your_video_link)

---

## Features
- **User Authentication**: Secure login and signup using cookies and JWT for session management.
- **Product Browsing**: Browse, search, and filter products without requiring login.
- **Cart Management**: Add products to cart, update quantities, and remove items as needed.
- **Secure Payments**: Integrated with Stripe to handle payments.
- **Responsive Design**: Optimized for both desktop and mobile users.

---

## Technologies Used

- **Frontend and Backend**: Next.js (Fullstack)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Payment Gateway**: Stripe
- **Styling**: Tailwind CSS , Shadcn ui
- **Deployment**: Vercel (both frontend and backend)

---

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

Before you begin, ensure you have met the following requirements:
- **Node.js** (version >= 14.x)
- **PostgreSQL** installed on your machine
- **Stripe Account** for payment gateway setup

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/d-kart.git
2. **Navigate to the project directory**:
   ```bash
   cd d-kart
3. **Install the dependencies for both frontend and backend**:
   ```bash
   npm install
4. **Set up the environment variables**:
- Create a .env file in the root directory.
- Add the following variables:
   ```bash
    DATABASE_URL=postgres://username:password@localhost:5432/d-kart
    STRIPE_SECRET_KEY=your_stripe_secret_key
    JWT_SECRET=your_jwt_secret
5. **Migrate the database**:
   ```bash
   npx prisma migrate dev --name init
6. **Start the project**:
   ```bash
   npm run dev
7. **Access the application**:
- Open your browser and navigate to http://localhost:3000.


---

### Usage

Once the app is running, you can perform the following actions:
- **Sign up** or **Log in** as a user.
- **Browse Products:** Explore the available products.
- **Add to Cart:** Add items to your shopping cart and adjust quantities.
- **Checkout**: Complete your order via Stripe's secure payment gateway.

---


### Contributing

Contributions are always welcome! Please feel free to submit a pull request or open an issue if you find any bugs or want to enhance the features.