# Routing

## 1. Routing Overview

Nuvsha includes a built-in client-side router for Single Page Applications (SPAs).

When users move between internal pages, the browser does not perform a full page reload. Instead, the router intercepts the navigation, dynamically changes the URL, and displays the matching Nuvsha page instantly. This makes your application feel fast and native.

For example:
- `/` → Home page
- `/about` → About page
- `/users` → Users page

## 2. Project Structure

A typical Nuvsha routing setup organizes pages in a `pages/` directory and routing configuration in a `router/` directory:

```bash
src/
├── App.nuv             # The main application shell and Router component
├── main.js             # Application entry point
├── router/
│   └── routes.js       # Defines which URL maps to which page component
└── pages/
    ├── Home.nuv        # The homepage component
    ├── About.nuv       # The about page component
    └── Users.nuv       # The users page component
```

- **App.nuv**: Renders the global layout (like a Navbar) and contains the `<Router>` component.
- **routes.js**: Exports the route definitions.
- **pages/**: Contains the top-level `.nuv` components that represent full screens.

## 3. Create Pages

First, create the pages you want to route between.

**`src/pages/Home.nuv`**:
```html
<script>
  title = "Welcome to Nuvsha"
</script>

<div>
  <h1>{title}</h1>
  <p>This is the home page.</p>
</div>
```

**`src/pages/About.nuv`**:
```html
<div>
  <h1>About Us</h1>
  <p>Learn more about our mission.</p>
</div>
```

**`src/pages/Users.nuv`**:
```html
<div>
  <h1>Users List</h1>
  <ul>
    <li>Alice</li>
    <li>Bob</li>
  </ul>
</div>
```

## 4. Create Routes

Next, configure the route map. The Nuvsha router uses an object map where the key is the URL path and the value is the component to render.

**`src/router/routes.js`**:
```javascript
import { Home } from "../pages/Home.nuv"
import { About } from "../pages/About.nuv"
import { Users } from "../pages/Users.nuv"

export const routes = {
  "/": Home,
  "/about": About,
  "/users": Users
}
```

## 5. Using the Router

Finally, import your routes and pass them to the `<Router>` component inside your main application shell.

**`src/App.nuv`**:
```html
<script>
  import { Router } from "nuvsha"
  import { routes } from "./router/routes.js"
</script>

<div class="app-container">
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/users">Users</a>
  </nav>

  <main>
    <Router routes={routes} />
  </main>
</div>
```

- `routes`: The configuration map you exported.
- `<Router>`: A built-in Nuvsha component that automatically listens to URL changes and mounts the correct page component inside `<main>`.

## 6. Navigation

Nuvsha's router automatically intercepts standard HTML links `<a href="...">` for internal navigation. You do not need a special Link component.

```html
<a href="/">Home</a>
<a href="/about">About</a>
<a href="/users">Users</a>
```

When a user clicks one of these links, the URL updates and the page changes without a full browser refresh. External URLs (e.g., `<a href="https://google.com">`) are ignored by the router and behave normally.

## 7. Programmatic Navigation

If you need to navigate based on logic (such as after a successful login or form submission), use the `navigate()` function.

```html
<script>
  import { navigate } from "nuvsha"
  
  handleLogin = () => {
    // Perform login logic...
    navigate("/users")
  }
</script>

<button onclick="handleLogin()">Login</button>
```

When `handleLogin()` executes:
1. `navigate("/users")` is called.
2. The URL changes to `/users`.
3. The router matches the `/users` path.
4. The Users page appears instantly.

## 8. 404 Route

You can define a fallback route that renders when a user visits a URL that does not exist. Use the wildcard `"*"` key in your route map.

**`src/router/routes.js`**:
```javascript
import { Home } from "../pages/Home.nuv"
import { NotFound } from "../pages/NotFound.nuv"

export const routes = {
  "/": Home,
  "*": NotFound
}
```

If a user visits `/missing-page`, the `<Router>` will display `NotFound.nuv`.

## 9. Real Application Example

Here is a complete, minimal SPA architecture incorporating a dashboard and a 404 page.

**Project Structure**:
```bash
src/
├── App.nuv
├── pages/
│   ├── Dashboard.nuv
│   ├── Users.nuv
│   ├── Projects.nuv
│   ├── Settings.nuv
│   └── NotFound.nuv
└── router/
    └── routes.js
```

**`src/router/routes.js`**:
```javascript
import { Dashboard } from "../pages/Dashboard.nuv"
import { Users } from "../pages/Users.nuv"
import { Projects } from "../pages/Projects.nuv"
import { Settings } from "../pages/Settings.nuv"
import { NotFound } from "../pages/NotFound.nuv"

export const routes = {
  "/": Dashboard,
  "/users": Users,
  "/projects": Projects,
  "/settings": Settings,
  "*": NotFound
}
```

**`src/App.nuv`**:
```html
<script>
  import { Router } from "nuvsha"
  import { routes } from "./router/routes.js"
</script>

<div style="display: flex;">
  <aside style="width: 200px;">
    <nav>
      <a href="/">Dashboard</a>
      <a href="/users">Users</a>
      <a href="/projects">Projects</a>
      <a href="/settings">Settings</a>
    </nav>
  </aside>

  <main style="flex: 1;">
    <Router routes={routes} />
  </main>
</div>
```

## 10. How Routing Works

Here is a simple flow of what happens under the hood when a user clicks a link:

```text
User clicks link (<a href="/about">)
        ↓
Router intercepts internal navigation
        ↓
URL changes to "/about"
        ↓
Router finds matching route in routes.js
        ↓
Matching Nuvsha page (About.nuv) is rendered
```

## 11. Common Mistakes

- **Wrong route path**: Forgetting a leading slash (e.g., using `about` instead of `/about`).
- **Wrong component import**: Forgetting curly braces around the import (e.g., `import Home from ...` instead of `import { Home } from ...`) if the component is a named export.
- **Incorrect router setup**: Not passing the routes to the Router component (`<Router routes={routes} />`).
- **External links**: Attempting to use `navigate("https://google.com")`. Nuvsha's router handles internal paths; use `window.location.href` for external sites.

## 12. Production / Deployment Note

Nuvsha routing is **client-side**. This means there is actually only one physical HTML file (`index.html`).

When deploying a SPA to a host (like Netlify, Vercel, or Apache), you must configure the server to redirect all unknown requests back to `index.html`. Otherwise, if a user directly visits `yoursite.com/users`, the server will look for a physical `/users.html` file and return a 404 error before Nuvsha even loads.

For example, on Netlify, you typically add a `_redirects` file to your `public` directory:
```text
/*    /index.html   200
```

## 13. Syntax Reference

**Route Definition**
```javascript
export const routes = {
  "/path": ComponentName,
  "*": FallbackComponent
}
```

**Router Component**
```html
<script>
  import { Router } from "nuvsha"
</script>
<Router routes={routes} />
```

**Declarative Navigation**
```html
<a href="/path">Link Text</a>
```

**Programmatic Navigation**
```javascript
import { navigate } from "nuvsha"
navigate("/path")
```
