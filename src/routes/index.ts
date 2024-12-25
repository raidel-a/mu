import { Elysia, t } from "elysia";
import { nanoid } from "nanoid";
import { BaseHtml } from "../components/base";
import { UrlForm } from "../components/url-form";
import { createShortUrl, getUrlById, incrementClicks } from "../db";

// Validation helper
const validateUrl = (url: string): string => {
  try {
    // If URL doesn't have a protocol, add https://
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }
    new URL(url); // This will throw if invalid
    return url;
  } catch (e) {
    throw new Error("Invalid URL format");
  }
};

// Response components
const renderError = (message: string) => `
  <div class="text-red-500 text-center p-4 rounded-lg bg-red-50 border border-red-100">
    ${message}
  </div>
`;

const renderShortenedUrl = (urlId: string) => `
  <section id="results"
    class="gooey-wrapper"
    x-data="{ show: false, copied: false }" 
    x-init="setTimeout(() => show = true, 50)"
    x-show="show"
    style="display: none;">
    <div class="flex w-full border-slate-200 overflow-hidden border pl-2 rounded-full items-center justify-between bg-white shadow-sm gooey-animation">
      <p id="url" class="py-3 px-4 truncate">https://muurl.fly.dev/${urlId}</p>
      <button 
        data-copy
        class="ripple bg-slate-200 py-3 px-6 cursor-pointer hover:bg-slate-300 transition-all duration-300 active:scale-95 flex items-center gap-2"
        @click="copied = true; setTimeout(() => copied = false, 2000); copyText()"
        :class="{ 'bg-emerald-500 text-white': copied }">
        <span x-text="copied ? 'Copied!' : 'Copy'"></span>
        <template x-if="copied">
          <svg class="checkmark" viewBox="0 0 24 24">
            <path fill="none" d="M4 12l6 6L20 6"/>
          </svg>
        </template>
      </button>
    </div>
  </section>
`;

// Route handlers
export const routes = new Elysia()
  // Home page
  .get("/", () => {
    return BaseHtml({
      children: `
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-slate-900 mb-2">μ URL</h1>
          <p class="text-slate-600">Simple, fast URL shortener</p>
        </div>
        ${UrlForm()}
      `,
    });
  })
  // URL shortening endpoint
  .post(
    "/shorten",
    async ({ body: { url }, set }) => {
      try {
        if (!url?.trim()) {
          set.status = 400;
          return renderError("URL is required");
        }

        const validUrl = validateUrl(url);
        const urlId = nanoid(7);
        await createShortUrl(validUrl, urlId);

        return renderShortenedUrl(urlId);
      } catch (error) {
        set.status = 400;
        return renderError(
          error instanceof Error ? error.message : "Invalid URL"
        );
      }
    },
    {
      body: t.Object({
        url: t.String(),
      }),
    }
  )
  // URL redirection endpoint
  .get("/:id", async ({ params: { id }, set }) => {
    try {
      const url = await getUrlById(id);

      if (!url) {
        set.status = 404;
        throw new Error("URL not found");
      }

      await incrementClicks(id);
      set.status = 302;
      set.headers = { Location: url.url };
      return null;
    } catch (error) {
      set.status =
        error instanceof Error && error.message === "URL not found" ? 404 : 500;
      throw error;
    }
  });
