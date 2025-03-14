# Next-Quick

A boilerplate for Next.js with a quick start.

Included:

- Next.js App directory
- MongoDB via Mongoose
- Tailwind
- Shadcn
- [Nuqs](https://nuqs.47ng.com/)
- [Sonner](https://sonner.emilkowal.ski/)


## Getting Started

1. `pnpm install`
2. Create your `.env.local` file following the `.env.example` file
3. `docker compose up -d`
4. `pnpm dev`
5. (Recommended) Use [MongoDB Compass](https://www.mongodb.com/products/tools/compass) when developing locally


## Structure

- `components/` - Re-usable React components
- `features/` - Feature components
- `app/` - Next.js app directory
- `lib/` - Libraries to connect with 3rd parties (e.g S3, MongoDB)
- `models/` - Mongoose models
- `types/` - Typescript types
- `utils/` - Utility functions, split between server and client
- `styles/` - Global styles

### Adding new env variables

- Add the variable to `.env.example`
- Add the variable to `env.d.ts`
- Add the variable to `.env.local`