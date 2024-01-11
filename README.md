# NextForm - A Simple And Powerful Form Builder With Drag & Drop Features 

This project is a simple and powerful form builder with drag & drop features. You can create your own form and share to your friends or clients. It's a open source project and you can contribute to this project. Build with Next.js, TailwindCSS, Shadcn/ui and Beautiful DnD.

## Features

- Drag & Drop Form Builder
- Share Form With Your Friends Or Clients
- Beautiful Landing Page With TailwindCSS
- Dashboard to manage your forms
- Form Submission
- Collect Form Data
- Authentication with Google and Github

## Screenshots

| Screenshot | Description |
| --- | --- |
| ![Landing Page](https://i.ibb.co/QNZGX9L/next-form-landingpage.png) | Landing Page |
| ![Dashboard](https://i.ibb.co/SsTNxyH/next-form-dashboard.png) | Dashboard |
| ![DetailsForms](https://i.ibb.co/Hn0Lcbf/next-form-detail-form.png) | Details Forms |
| ![Form Submission](https://i.ibb.co/h2JgdvJ/next-form-form-submission.png) | Form Submission |
| ![Form Builder](https://i.ibb.co/mq06Npn/next-form-builder.png) | Form Builder |

## Demo Link

[https://next-form-kappa.vercel.app/](https://next-form-kappa.vercel.app/)

## Tech Stack

- Next.js - React Framework
- TypeScript - Programming Language
- TailwindCSS - CSS Framework
- Shadcn/ui - UI Components
- Beautiful DnD - Drag & Drop Library
- Prisma - ORM
- PostgreSQL - Database from Vercel
- Zustand - State Management
- Clerk - Authentication Service

## Getting Started

First, run the development server:

```bash
npm i # install dependencies

npm run dev # run development server

npm run build # build production

npm run start # run production server
```

setup .env file and add your own credentials example:

```bash
DATABASE_URL=""
POSTGRES_URL=""
POSTGRES_PRISMA_URL=""
POSTGRES_URL_NON_POOLING=""
POSTGRES_USER=""
POSTGRES_HOST=""
POSTGRES_PASSWORD=""
POSTGRES_DATABASE=""

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""

NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"
```