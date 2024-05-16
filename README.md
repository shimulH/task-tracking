# Project Name

## Task Tracker

**demo** [https://task-tracking-3l9f1jqo4-shimul-hassans-projects-6154cca6.vercel.app/](https://task-tracking-theta.vercel.app/)

## Important

- **You will find some commented codes in the code base, Those are some incopmplete features that I could not finish for the time. \***I am doin this project when there is realese in my current company**\*, So i found very little time to contribute, **but I think it has all the neccessary thigs you need to gett an idea of my work**\*.I learned a lot from this project, I planed and build in a way that it can be scaled in any time.**
- **The Projectt is created in a way this can be a full real trello like app with all the fuctionality. It has Database tables for users, board, column, tasks, categories, card label and board label categories, card and board label board maeber table. It has simple and small state maneger Zustand, Next-14 for future proof which has all the necessary things for fast, performant and scalable app**

## Overview

This is a Task management web app, You can say a trello like app. This is an **full-stack** app exclusively in **TypeScript**. The drag and drop feature is implemented usign HTML5 drag and drop, the app can do column and task label drag n drop.

This projects uses all the latest technologies like react server component, **Nextjs-14** app router, server client comunication, tailwindCSS, shadcn, zustand, Neon.dev for porstgres DB, Drizzle postgress Client nextjs as server and route, react-hook-form.

##Structure

```
└───src
    ├───app
    │   ├───(protected)
    │   │   └───boards
    │   ├───actions
    │   ├───api
    │   │   └───webhooks
    │   ├───db
    │   ├───sign-in
    │   │   └───[[...sign-in]]
    │   └───sign-up
    │       └───[[...sign-up]]
    ├───components
    │   ├───icons
    │   ├───providers
    │   └───ui
    ├───lib
    ├───store
    └───types
```

## Features

- Task Drag and Drop (Used performant way to calculate and filter out the dragged component)
- Column Drag and Drop (Used performant way to calculate and filter out the dragged component)
- Task Create, Delete, Update
- Column Create, Delete, Update
- Board Create, Delete, Update
- User Specific Board
- Track Interaction in card and board label.
- Due date reminder
- Card label history
- board label history
- Change Category

## Frontend Technologies Used

- React: Used for building the user interface due to its component-based architecture and efficient rendering.
- Next.js: Utilized for server-side rendering, routing, and other optimizations it provides out of the box.
- Next.js Server Components (next-14): Leveraged for server-side rendering with improved performance and developer experience.
- Tailwind CSS: Used for styling components with utility-first CSS approach.
- Shadcn: Additional CSS library for adding shadows and depth to UI elements.

## Backend Technologies Used

- Postgres: Chosen for the relational database management system to store and manage application data efficiently.
- Neon.dev Drizzle: Utilized for simplified interaction with Postgres database, providing a convenient interface for queries and data manipulation.
- Clerk: Integrated for user authentication and management, providing secure login and registration functionalities.

## Deployment with Vercel

Vercel was chosen for deployment due to its seamless integration with Next.js projects, providing automatic deployments, instant serverless functions, and global CDN for optimized performance. The platform also offers easy scalability and a simple workflow for continuous deployment.

## Getting Started

First, run the development server:
Used pnpm for faster development experience.

```bash

pnpm dev

```

For db migration:

```bash
npx drizzle-kit push

```

For schema generate and seed:

```bash
pnpm db:generate
pnpm drizzle:seed

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
