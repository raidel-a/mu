export const BaseHtml = ({ children }: { children: string }) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>μ URL Shortener</title>
    <script src="https://unpkg.com/htmx.org@1.9.10"></script>
    <script src="https://unpkg.com/hyperscript.org@0.9.12"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        htmx.config.globalViewTransitions = true;
      });
      
      function copyText() {
        const url = document.getElementById('url').innerText;
        navigator.clipboard.writeText(url);
      }

      function validateAndPrepareUrl(form) {
        const urlInput = form.querySelector('input[name="url"]');
        let url = urlInput.value.trim();
        
        // If URL doesn't start with a protocol, add https://
        if (!/^https?:\/\//i.test(url)) {
          url = 'https://' + url;
        }
        
        try {
          new URL(url); // This will throw if invalid
          urlInput.value = url;
          return true;
        } catch (e) {
          urlInput.setCustomValidity('Please enter a valid URL');
          urlInput.reportValidity();
          return false;
        }
      }
    </script>
    <style>
      .gooey-wrapper {
        filter: url('#goo');
      }
      .gooey-animation {
        transition: all 0.3s ease;
      }
      .checkmark {
        width: 18px;
        height: 18px;
        stroke: white;
        stroke-width: 3;
        stroke-linecap: round;
        stroke-linejoin: round;
        transition: all 0.3s ease;
      }
    </style>
  </head>
  <body class="bg-slate-50 min-h-screen">
    <svg style="visibility: hidden; position: absolute;" width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
        </filter>
      </defs>
    </svg>
    <main class="container mx-auto px-4 py-8">
      ${children}
    </main>
  </body>
</html>
`;
