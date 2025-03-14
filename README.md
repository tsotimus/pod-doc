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
2. Run `cp .env.example .env.local`
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

## Task Tradeoffs

I'll discuss the tradeoffs I made in this project

### 1 Model or 2 Models?

I went with using 1 model just to decrease boilerplate and keep it simpler, however this isn't scalable due to Mongo's Document Size limit of 16MB. So we won't be able to handle a large number of Widgets. Mainly did this to lower complexity and dev time.

### SSR vs CSR

- I went with SSR for the individual Pods page `/pods/[id]` just to keep the initial load time down, better UX (loading.tsx), and to decrease dev time (no need for an extra endpoint to fetch the singular pod data).
- I went for a Mix on the `/pods` home route due to the fact that we can initially load all the pods, and then we pass this into SWR so its cached on the client, so when theres a new pod created the user doesn't have to reload the page and we can just bust the cache.

### When do we save the Pod?

The requirement was to save when:
> When a user is done typing, the text from that widget should be sent to the backend to be stored

Thing is, its quite difficult to tell when to save - how many seconds should you wait until a user is not using the keyboard? What if they are moving the Widgets around instead?

In order not to risk sending too many requests to the backend I decided to employ a few different strategies:

- Only save when the user clicks away from the Widget (onBlur)
- After 60 seconds we save (Polling)
- On demand save via a hotkey and a button

I could have gone via the debounce strategy, but I thought this was a good compromise between UX, performance and dev time.

Also I implemented **hashing** of the widgets to check if they have changed, so we only save if they have changed.

### Things I'd work on after this

- Implement a debounce strategy, probably to remove the polling (if we can get away with it)
- Having 2 models, one for the Pod and one for the Widgets - this gives us more flexibility (we can add more widgets in the future) and we will be able to support larger Pods
- Better Styling and Better UX
- End to end testing for Creating a Pod and then creating a Text Widget inside it using Playwright
- Limit the area that the user can move widgets around (currently theres no limit, which isn't good)
- Silent saving (no need for a toast notification every time we save... maybe)

## Testing

My philosophy:

- Avoid testing 3rd party libraries
- Extract business logic into testable functions (not much of this in this project)
- Use Integration Testing for the UI functionality. (which I consider the core "business logic" of the app)
- And ideally we would also have a few E2E tests for the main flows of the app. (Creating a Pod, Adding a Text Widget, Moving a Widget, Resizing a Widget, Deleting a Widget)

### Unit Testing via Vitest

Run `pnpm test:unit` to run the unit tests.

- Mainly testing the widgetOperations.ts file (this is the core business logic of the app)
- Also testing the hashWidgets.ts file (To ensure the hash is consistent and working)
- Also testing our ApiResponse util functions to ensure our API responses will always be the same shape

### Integration Testing via Storybook

The idea here was to test the Canvas Components core functionality.
Run `pnpm storybook` to view the stories and run the tests.

- Create a Widget
- Add Text to a Widget
- Move a Widget around
- Resize a Widget
- Delete a Widget