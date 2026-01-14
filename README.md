<<<<<<< HEAD

# Nuxt 3 Dashboard App

A server-side rendered (SSR) Nuxt 3 web application featuring login, dashboard analytics, user management, and full state handling using Pinia. Users are loaded locally from a JSON file via custom API endpoints.

## 🔥 Features

### ✅ Authentication
- Static login system using `Pinia`.
- Login with any user from the local `users.json`.
- Unauthorized users are redirected to `/login`.

### ✅ Navbar
- Responsive navbar with sidebar on mobile.
- Contains links to:
  - Home (`/`)
  - Users list (`/users`)
  - Logout button

### ✅ Dashboard Page (`/dashboard`)
Accessible by any logged-in user:
- Total number of users.
- Percentage of Admins vs Viewers.
- Average age of users.
- Top 5 countries by user count (with percentage).

### ✅ Users Page (`/users`)
Accessible only by `admin` users:
- Paginated table (10 users/page) showing user details (excluding passwords).
- Search bar to filter by name or email.
- Country filter dropdown:
  - Sorted by most frequent countries.

### ✅ Styling & Responsiveness
- Styled with Tailwind CSS.
- Fully responsive layout.
- Accessible forms and components.

---
=======
# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
>>>>>>> 71ece3b (Initial commit)


Home Page .
![image](https://github.com/user-attachments/assets/9bf2ff1c-37e7-4d54-a4bf-aee7baa51567)



Login Page  .
![image](https://github.com/user-attachments/assets/39fee88f-8cba-4004-bbb9-42f6e13b1dea)



Dashboard
![image](https://github.com/user-attachments/assets/304f905c-6070-4259-af13-aa6212197a07)



Users

![image](https://github.com/user-attachments/assets/b8519e09-5fac-4b51-8630-3b6274471010)



