import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { routes } from "./routes";

// Error response components
const renderErrorPage = (status: number, message: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Error ${status} - μ URL</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 min-h-screen flex items-center justify-center">
  <div class="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
    <h1 class="text-4xl font-bold text-slate-900 mb-4">Error ${status}</h1>
    <p class="text-slate-600">${message}</p>
    <a href="/" class="mt-6 inline-block text-blue-500 hover:text-blue-600">← Back to home</a>
  </div>
</body>
</html>
`;

// Application setup
const app = new Elysia()
  // Middleware
  .use(html())
  .use(routes)
  // Error handling
  .onError(({ code, error, set }) => {
    set.headers["Content-Type"] = "text/html";

    switch (code) {
      case "NOT_FOUND":
        set.status = 404;
        return renderErrorPage(
          404,
          "The page you're looking for doesn't exist."
        );

      case "VALIDATION":
        set.status = 400;
        return renderErrorPage(
          400,
          "Invalid request. Please check your input."
        );

      default:
        console.error(`[Error] ${error.message}`);
        set.status = 500;
        return renderErrorPage(
          500,
          "Something went wrong. Please try again later."
        );
    }
  })
  // Start server
  .listen(3000, ({ hostname, port }) => {
    console.log(`🦊 Elysia is running at ${hostname}:${port}`);
  });
