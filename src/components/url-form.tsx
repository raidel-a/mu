export const UrlForm = () => `
  <form 
    class="max-w-2xl mx-auto space-y-8"
    hx-post="/shorten"
    hx-target="#results"
    hx-swap="innerHTML"
    onsubmit="return validateAndPrepareUrl(this)"
  >
    <div class="relative">
      <input
        type="text"
        name="url"
        placeholder="Enter your URL (e.g., example.com)"
        required
        class="w-full px-4 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        oninput="this.setCustomValidity('')"
      />
      <button
        type="submit"
        class="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
      >
        Shorten
      </button>
    </div>
    <div class="text-sm text-slate-500 text-center">
      Enter a URL with or without http(s)://. We'll handle the rest!
    </div>
  </form>
  <div id="results" class="mt-8"></div>
`;
