# HTMX-Notes

HTMX-Notes is a small study project that shows practical HTMX patterns with a simple Express server and static HTML pages.

## What this repository contains

The app serves a set of examples that demonstrate how HTMX can be used to update parts of a page without writing much custom JavaScript. The backend is built with Express and returns HTML snippets that HTMX swaps directly into the page.

## Main examples

- **Basic request with `hx-get`**: fetches random users and renders them in a table.
- **Form submission with `hx-post`**: sends a temperature value and returns the converted result.
- **Loading indicators with `hx-indicator`**: shows a spinner while a request is in progress.
- **Confirmation flows with `hx-confirm`**: asks the user to confirm before a request runs.
- **Custom values with `hx-vals`**: sends extra request data such as a delay value.
- **Search with live updates**: filters contacts from an API while the user types.
- **Swap behavior**: shows how returned HTML can replace content in the page.

## Project structure

- `/server/server.js` - Express server and demo endpoints
- `/server/public` - static HTML example pages
- `/server/public/sources` - assets used by the demos

## Endpoints used by the demos

- `GET /users` - returns a table with random users
- `GET /users-delay` - returns the same table after a delay
- `POST /convert` - converts Celsius to Fahrenheit
- `GET /news` - returns a news table from NewsAPI
- `POST /search/api` - returns contact search results

## How to run

1. Go to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the example pages from the `public` directory in your browser through the local server.

## Notes

- The project is focused on learning and experimentation rather than production structure.
- The `/news` example depends on a NewsAPI key and the placeholder value in the repository must be replaced before it can work.