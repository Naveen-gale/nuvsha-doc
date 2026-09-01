# Architecture Overview

As your Nuvsha application grows, placing all your logic and HTML inside `App.nuv` becomes unmanageable.

A well-architected Nuvsha application separates concerns into specific folders, matching the default structure provided by the `create-nuvsha` starter.

## 1. Why Project Architecture Matters

When you first start a Nuvsha project, a single file might look like enough:

```bash
src/
└── App.nuv
```

But as you add a Navbar, a Sidebar, 10 different screens, API calls, and styling, putting everything inside `App.nuv` makes it extremely difficult to maintain, read, or test.

To solve this, we use **separation of concerns**:
- **App**: The global shell connecting everything.
- **Pages**: Full application screens.
- **Components**: Small, reusable UI pieces (like buttons).
- **Router**: URL mapping rules.
- **Data**: API fetching and business logic.
- **Assets/Styles**: Global images and CSS.

By giving every piece of code a predictable home, your project remains easy to navigate no matter how large it gets.

## 2. Default Nuvsha Project Structure

When you run `npx create-nuvsha`, it generates the standard recommended structure. 

Here is what it looks like:

```bash
my-app/
├── package.json        # Dependencies (like Nuvsha, Tailwind)
├── vite.config.js      # Build configuration
├── index.html          # The single HTML file your browser loads
└── src/
    ├── main.js         # Starts the Nuvsha framework
    ├── App.nuv         # The main application shell
    ├── components/     # Reusable UI elements
    ├── pages/          # Full application screens
    ├── router/         # URL routing logic
    ├── data/           # API and business logic
    └── assets/         # Global CSS and images
```

## 3. Explain Every Important File

### `src/App.nuv`
**What it is:** The main application entry UI.
**Why it exists:** To act as the global "shell" or layout for your app.
**What goes inside:** Global layouts like `<Navbar />`, `<Sidebar />`, and the `<Router />`.
**What should NOT go inside:** Specific page content or massive data fetching blocks.

### `src/components/`
**What it is:** A folder for reusable UI components.
**Why it exists:** To prevent duplicating HTML and logic across your app.
**What goes inside:** `Button.nuv`, `Card.nuv`, `Navbar.nuv`.
**What should NOT go inside:** Complete screens or route definitions.

### `src/pages/`
**What it is:** A folder for your application screens.
**Why it exists:** To organize the major views your users navigate between.
**What goes inside:** `Home.nuv`, `Settings.nuv`, `Dashboard.nuv`.
**What should NOT go inside:** Small reusable pieces (put those in components).

### `src/router/`
**What it is:** A folder for URL configuration.
**Why it exists:** To map what URL shows what Page.
**What goes inside:** `routes.js`.
**What should NOT go inside:** HTML UI. 

### `src/data/`
**What it is:** A folder for non-UI logic and APIs.
**Why it exists:** To separate complex data fetching from your UI layer.
**What goes inside:** API fetching logic, data formatting, business rules.
**What should NOT go inside:** Nuvsha `.nuv` UI files.

### `src/assets/`
**What it is:** A folder for static files.
**Why it exists:** To hold files that aren't code.
**What goes inside:** `main.css`, logos, background images.
**What should NOT go inside:** Component code.

## 4. App.nuv

The `App.nuv` file should be kept as simple as possible. It is the "frame" of your application.

```html
<script>
  import { Router } from "nuvsha"
  import { routes } from "./router/routes.js"
  import { Navbar } from "./components/Navbar.nuv"
</script>

<div class="app-layout">
  <Navbar />
  
  <main>
    <Router routes={routes} />
  </main>
</div>
```

**Rule:** Avoid turning `App.nuv` into a giant file. Let the components and router handle the heavy lifting.

## 5. Components

Components are reusable UI pieces. If you find yourself writing the same button styling twice, you should make a Component.

**`src/components/Button.nuv`**:
```html
<script>
  export let text = "Click Me"
</script>

<button class="bg-blue-500 text-white px-4 py-2 rounded">
  {text}
</button>
```

You can then easily reuse it in a page:
```html
<script>
  import { Button } from "../components/Button.nuv"
</script>

<Button text="Save Changes" />
<Button text="Cancel" />
```

## 6. Pages

It is important to understand the difference between a Component and a Page.

- **Component (`Card.nuv`)**: Small, reusable, doesn't know where it is in the app.
- **Page (`Users.nuv`)**: A complete application screen composed of many components.

**`src/pages/Users.nuv`**:
```html
<script>
  import { Card } from "../components/Card.nuv"
</script>

<div class="users-page">
  <h1>User Directory</h1>
  <Card title="Alice" />
  <Card title="Bob" />
</div>
```

## 7. Router

The router maps URLs to your Pages. This logic belongs entirely in the `router/` directory using an object map.

**`src/router/routes.js`**:
```javascript
import { Home } from "../pages/Home.nuv"
import { Users } from "../pages/Users.nuv"

export const routes = {
  "/": Home,
  "/users": Users
}
```

By keeping this in a separate file, you can see all the screens in your application at a single glance.

> [Read the full Routing Guide](/docs/routing/routing-guide)

## 8. Data / API

Instead of mixing API calls into every `.nuv` file, you should extract complex logic into standard `.js` files in the `data/` folder.

Nuvsha natively supports a `data()` block that can securely run asynchronous logic and return state to your UI.

**`src/data/api.js`**:
```javascript
export async function fetchUser() {
  const response = await fetch("https://api.example.com/user");
  return response.json();
}
```

**`src/pages/Profile.nuv`**:
```html
<script>
  import { fetchUser } from "../data/api.js"
  
  user = null

  data() {
    user = fetchUser()
  }
</script>

<p>Hello, {user.name}!</p>
```

> [Read the full Data and API Guide](/docs/logic/api-data)

## 9. Styling

Global styling setup belongs in the `assets/` folder. Nuvsha perfectly supports Tailwind CSS v4 out of the box via Vite plugins.

**`src/assets/main.css`**:
```css
@import "tailwindcss";
@source "../**/*.nuv";
```

Once set up, you simply apply CSS classes directly inside your `.nuv` files.

> [Read the full Styling Guide](/docs/styling/styling-guide)

## 10. Real Application Structure

Here is a realistic example of a complete Nuvsha dashboard architecture:

```bash
my-dashboard/
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── main.js
    ├── App.nuv
    ├── components/
    │   ├── Navbar.nuv
    │   ├── Sidebar.nuv
    │   ├── Card.nuv
    │   └── Button.nuv
    ├── pages/
    │   ├── Home.nuv
    │   ├── Users.nuv
    │   └── Settings.nuv
    ├── router/
    │   └── routes.js
    ├── data/
    │   └── users.js
    └── assets/
        └── main.css
```

## 11. How Files Connect

Here is how data and UI flow through a well-architected Nuvsha app:

```text
main.js        (Starts the app and loads global CSS)
   ↓
App.nuv        (Renders the global Layout like Navbars)
   ↓
Router         (Checks the URL to see what page to show)
   ↓
Pages          (The specific screen being shown)
   ↓
Components     (The smaller UI pieces that build the page)
   ↓
Data / API     (The logic powering the components)
   ↓
UI             (What the user finally sees on their screen)
```

**Note:** Not every application needs every folder. If you aren't fetching data, you don't need a `data/` folder!

## 12. Small Project vs Large Project

You do not need a complicated architecture for a tiny application.

**Small Project:**
If you are building a simple calculator, this is perfectly fine:
```bash
src/
├── App.nuv
└── main.js
```

**Growing Project:**
Once you add multiple screens and APIs, introduce the additional folders to keep your sanity:
```bash
src/
├── App.nuv
├── components/
├── pages/
├── router/
├── data/
└── assets/
```

Introduce complexity only when you actually need it.

## 13. Beginner Rules

When wondering **"Where should I put this code?"**, follow these rules of thumb:

- **UI reused in multiple places** → `components/`
- **Complete screen** → `pages/`
- **URL navigation** → `router/`
- **API/data logic** → `data/`
- **Global CSS/assets** → `assets/`
- **Application-level composition** → `App.nuv`

## 14. Common Architecture Mistakes

Here are anti-patterns to avoid:

- **Putting the entire application in App.nuv**: This makes the file thousands of lines long and impossible to debug.
- **Duplicating the same UI instead of creating a component**: If you copy and paste a button's HTML 5 times, make a `Button.nuv` instead.
- **Mixing route configuration with page UI**: Don't define routes directly inside a component. Always keep them in `router/routes.js`.
- **Putting unrelated API logic everywhere**: If a function fetches weather data, put it in `data/weather.js` so multiple pages can import it safely.
- **Creating unnecessary folders**: Don't create a folder if it only holds one file that never grows.
- **Creating huge components**: If a component exceeds 300 lines, consider breaking it into smaller child components.

## 15. Architecture + create-nuvsha

The easiest way to guarantee a perfect architecture is to use the official starter. It builds the folders for you!

**Step 1:** Create the project
```bash
npx create-nuvsha my-app
```

**Step 2:** Enter the folder
```bash
cd my-app
```

**Step 3:** Install dependencies
```bash
npm install
```

**Step 4:** Start developing
```bash
npm run dev
```
