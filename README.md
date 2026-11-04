# StudioSpace

### Peer-to-Peer Creative Workspace & Production Studio Sharing Platform

StudioSpace is a web-based platform that connects creative professionals with workspace owners. Users can explore, list, and book creative spaces such as photography studios, film stages, podcast rooms, music suites, and workshops.

The platform provides an easy way for studio owners to manage their listings and for creators to discover and book suitable workspaces.

## Live Demo

- **Frontend:** https://studio-space-one.vercel.app/
- **Backend:** https://studio-space-server-sooty.vercel.app/

## Key Features

### Authentication
- User registration and login with email and password.
- Better Auth integration.
- JWT-based authentication with HTTPOnly session cookies.
- Protected routes for authenticated users.
- Secure session management.

### Studio Discovery
- Explore available creative studios.
- Browse studios by category.
- View detailed studio information.
- View studio images, pricing, amenities, capacity, and location.
- Discover featured and recently added studios.

### Studio Management
- Add new studio listings.
- Edit existing studio information.
- Delete studio listings.
- Manage personal studio listings.
- Restrict studio management to the listing owner.

### Booking System
- Book available studios.
- Select booking dates and time slots.
- Automatic booking price calculation.
- Security deposit calculation.
- Prevent overlapping bookings.
- Prevent users from booking their own studios.
- View personal booking history.
- Cancel pending bookings.

### User Dashboard
- View dashboard statistics.
- Manage studio listings.
- Track bookings.
- Access account-related features.

### Additional Features
- Responsive design for desktop, tablet, and mobile.
- Light and dark mode.
- Loading states and empty states.
- Toast notifications using Sonner.
- Custom error and not-found pages.
- Modern and user-friendly interface.

## Technology Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- HeroUI
- Better Auth
- Next Themes
- Sonner
- Lucide React
- Swiper

### Backend
- Node.js
- Express.js
- MongoDB
- MongoDB Native Driver
- Better Auth JWT verification
- JOSE
- Cookie Parser
- CORS

### Authentication & Security
- Better Auth
- JWT
- HTTPOnly Cookies
- JSON Web Key Sets (JWKS)
- Protected API routes
- Server-side authentication verification

### Deployment
- Vercel (Frontend)
- Vercel (Backend)
- MongoDB Atlas

## Project Structure

```text
StudioSpace/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/
│   │   │   │   └── auth/
│   │   │   ├── about/
│   │   │   ├── add-studio/
│   │   │   ├── dashboard/
│   │   │   ├── my-bookings/
│   │   │   ├── my-listings/
│   │   │   ├── sign-in/
│   │   │   ├── sign-up/
│   │   │   └── studios/
│   │   │
│   │   ├── components/
│   │   └── lib/
│   │
│   ├── .env.local
│   ├── package.json
│   └── next.config.ts
│
├── studio-space-server/
│   ├── joss/
│   │   └── verifyToken.js
│   ├── index.js
│   ├── package.json
│   ├── vercel.json
│   └── .env
│
└── README.md
```

## Installation & Setup

### Prerequisites

Make sure you have installed:

- Node.js (LTS)
- npm
- MongoDB Atlas account
- Git

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd StudioSpace
```

### 2. Setup Frontend

Navigate to the frontend directory:

```bash
cd client
npm install
```

Create a `.env.local` file inside the `client` directory.

Add the following environment variables:

```env
MONGODB_URI=your_mongodb_connection_string

BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

BETTER_AUTH_SECRET=your_secure_secret

NEXT_PUBLIC_SERVER_BASE_URL=http://localhost:8000
```

Start the frontend development server:

```bash
npm run dev
```

Frontend will run at:

http://localhost:3000

### 3. Setup Backend

Open another terminal and navigate to the backend directory:

```bash
cd studio-space-server
npm install
```

Create a `.env` file inside the backend directory.

Add the following environment variables:

```env
PORT=8000

MONGODB_URI=your_mongodb_connection_string

AUTH_BASE_URL=http://localhost:3000
```

Start the backend development server:

```bash
npm run dev
```

If your backend package does not have a `dev` script, use its configured start script.

Backend will run at:

http://localhost:8000

## Environment Variables

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `BETTER_AUTH_URL` | Better Auth server URL |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | Frontend authentication URL |
| `BETTER_AUTH_SECRET` | Better Auth secret key |
| `NEXT_PUBLIC_SERVER_BASE_URL` | Backend API base URL |
| `AUTH_BASE_URL` | Better Auth URL used by backend JWT verification |
| `PORT` | Backend server port |

**Important:** Never commit `.env` or `.env.local` files to GitHub. Keep database credentials and authentication secrets private.

## API Endpoints

Base URL:

```text
http://localhost:8000
```

### Studio APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/studios` | Get all studios |
| GET | `/api/studios/featured` | Get featured studios |
| GET | `/api/studios/:id` | Get studio details |
| GET | `/api/studios/my-listings` | Get user's listings |
| POST | `/api/studios` | Create a studio |
| PUT | `/api/studios/:id` | Update a studio |
| DELETE | `/api/studios/:id` | Delete a studio |

### Booking APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/bookings` | Create a booking |
| GET | `/api/bookings/my-bookings` | Get user's bookings |
| PATCH | `/api/bookings/:id/cancel` | Cancel a pending booking |

### Authentication & Health

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check backend status |
| GET | `/api/protected` | Test authenticated access |

Protected endpoints require a valid authenticated session.

## Database Collections

The application uses MongoDB with the database name:

```text
studio-space
```

Main collections:

- `user` — User authentication records (managed by Better Auth).
- `session` — User session records (managed by Better Auth).
- `account` — Authentication account records (managed by Better Auth).
- `verification` — Better Auth verification records.
- `studios` — Studio listings and host information.
- `bookings` — Booking records and payment calculations.

The exact authentication collection names depend on the Better Auth MongoDB adapter configuration.

## Deployment

The project is deployed using Vercel.

### Frontend Deployment
https://studio-space-one.vercel.app/

### Backend Deployment
https://studio-space-server-sooty.vercel.app/

Configure the required environment variables in the Vercel project settings before deployment.

Ensure that both applications use the same MongoDB database and that production authentication URLs, cookie settings, and trusted origins are configured correctly.

## Security

- HTTPOnly authentication cookies.
- JWT signature verification using JWKS.
- Protected backend endpoints.
- Server-side user authentication.
- Studio ownership verification.
- Booking ownership verification.
- Server-side booking price calculation.
- MongoDB credentials stored in environment variables.

## Future Improvements

- Online payment integration.
- Booking invoice generation.
- Studio wishlist and favorites.
- Advanced search and filtering.
- Studio reviews and ratings.
- Email notifications.
- Booking management for studio owners.

## Author

**Mehedi Hasan**

Full Stack Web Developer

- GitHub: YOUR_GITHUB_PROFILE_URL
- Portfolio: YOUR_PORTFOLIO_URL

---

**StudioSpace — Find your space. Create your story.**
