# μ URL - Modern URL Shortener

A lightning-fast URL shortener built with modern web technologies. Features a beautiful, responsive UI with smooth animations and real-time feedback.

![Tech Stack](https://skillicons.dev/icons?i=ts,bun,tailwind)

## 🚀 Tech Stack

- **Runtime & Server**: [Bun](https://bun.sh/) - Ultra-fast JavaScript runtime and toolkit
- **Framework**: [Elysia](https://elysiajs.com/) - TypeScript web framework for Bun
- **Database**: [Turso](https://turso.tech/) - Distributed SQLite database
- **ORM**: [Drizzle](https://orm.drizzle.team/) - TypeScript ORM
- **Frontend**:
  - [HTMX](https://htmx.org/) - High power tools for HTML
  - [Alpine.js](https://alpinejs.dev/) - Minimal JavaScript framework
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
  - [DaisyUI](https://daisyui.com/) - Tailwind CSS component library

## ✨ Features

- 🚄 Lightning-fast URL shortening
- 🎯 Click tracking for shortened URLs
- 🎨 Beautiful, responsive UI
- ✨ Smooth animations and transitions
- 📱 Mobile-friendly design
- 🔄 Real-time feedback
- 📋 One-click copy to clipboard
- 🛡️ Input validation and error handling

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mu.git
   cd mu
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Update the following variables in `.env`:
   - `TURSO_CONNECTION_URL`: Your Turso database URL
   - `TURSO_AUTH_TOKEN`: Your Turso authentication token

4. Initialize the database:
   ```bash
   bunx drizzle-kit push
   ```

5. Start the development server:
   ```bash
   bun dev
   ```

## 📁 Project Structure

```
mu/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── base.tsx   # Base HTML template
│   │   └── url-form.tsx
│   ├── db/            # Database configuration
│   │   ├── index.ts   # Database client setup
│   │   └── schema.ts  # Database schema
│   ├── routes/        # Route handlers
│   │   └── index.ts   # Main routes
│   ├── index.html     # Main HTML template
│   └── index.ts       # Application entry point
├── .env               # Environment variables
├── drizzle.config.ts  # Drizzle ORM configuration
├── package.json
└── tsconfig.json
```

## 🔧 Development

- **Start development server**:
  ```bash
  bun dev
  ```

- **Format code**:
  ```bash
  bun format
  ```

- **Type checking**:
  ```bash
  bun type-check
  ```

## 🚀 Deployment

1. Build the application:
   ```bash
   bun run build
   ```

2. Deploy to your preferred platform. Example for [Fly.io](https://fly.io):
   ```bash
   fly deploy
   ```

## 📝 API Endpoints

- `GET /` - Home page
- `POST /shorten` - Shorten a URL
  - Body: `{ "url": "https://example.com" }`
  - Returns: Shortened URL HTML component
- `GET /:id` - Redirect to original URL

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Bun](https://bun.sh/) for the amazing runtime
- [Elysia](https://elysiajs.com/) for the elegant web framework
- [Turso](https://turso.tech/) for the distributed database
- [HTMX](https://htmx.org/) for the powerful HTML extensions
- [Alpine.js](https://alpinejs.dev/) for the lightweight interactivity
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first styling