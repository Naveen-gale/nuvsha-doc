# Styling

## 1. Styling Overview

Nuvsha does not invent a new CSS language. Because Nuvsha embraces standard web technologies, if you know HTML and CSS, you already know how to style a Nuvsha application.

You can style your application using any standard CSS approach you prefer. The two most common approaches are:

1. **Normal CSS**: Writing standard `.css` files and using regular `class="..."` names on your HTML tags. Choose this if you prefer writing CSS by hand or want to keep your HTML clean.
2. **Tailwind CSS**: Using pre-defined utility classes directly in your HTML to build designs rapidly. Choose this if you want to build beautiful UIs extremely fast without constantly switching between files.

## 2. Normal CSS

If you prefer standard CSS, you simply create a `.css` file and import it into your main Vite entry point.

**Project Structure**:
```bash
src/
├── App.nuv
├── main.js
└── assets/
    └── main.css
```

- `App.nuv`: Your Nuvsha component.
- `main.js`: The application entry point where Vite bundles everything.
- `assets/main.css`: Your actual CSS file.

**`src/assets/main.css`**:
```css
.app-container {
  padding: 24px;
  background-color: #f0f0f0;
}

.title {
  font-size: 32px;
  color: #333;
}
```

To load this CSS in a Nuvsha/Vite project, simply import it at the top of your `main.js` file:

**`src/main.js`**:
```javascript
import './assets/main.css'
// ... rest of your Nuvsha initialization
```

## 3. Using CSS Classes in .nuv

Once your CSS is imported, you apply it to elements in your `.nuv` files exactly like standard HTML. 

**`src/App.nuv`**:
```html
<div class="app-container">
  <h1 class="title">
    Hello Nuvsha
  </h1>
</div>
```

The relationship is direct and simple:
`class="app-container"` in your Nuvsha file connects directly to `.app-container { ... }` in your CSS file.

## 4. Tailwind CSS

Tailwind CSS lets you style elements using "utility classes" directly in the `class` attribute, skipping the need to write custom CSS rules manually.

```html
<div class="p-6 rounded-xl bg-gray-100">
  <h1 class="text-2xl font-bold text-blue-600">
    Hello Nuvsha
  </h1>
</div>
```

**What these classes mean:**
- `p-6` → Adds padding inside the box.
- `rounded-xl` → Gives the box rounded corners.
- `bg-gray-100` → Sets a light gray background color.
- `text-2xl` → Makes the text larger.
- `font-bold` → Makes the text bold.
- `text-blue-600` → Changes the text color to blue.

## 5. Tailwind Setup

Nuvsha comes fully pre-configured to work with **Tailwind CSS v4** right out of the box when you use the `create-nuvsha` starter template. 

Because it uses modern Tailwind v4, there is no complicated `tailwind.config.js` required! It runs entirely through Vite.

**Step 1:** Tailwind v4 is already installed in `package.json` as `@tailwindcss/vite` and `tailwindcss`.

**Step 2:** It is already configured in your `vite.config.js` via the plugin:
```javascript
import tailwindcss from '@tailwindcss/vite'

export default {
  plugins: [
    tailwindcss(),
    // ... nuvsha plugin
  ]
}
```

**Step 3:** The Tailwind import and configuration are placed directly inside your main CSS file (`src/assets/main.css`):
```css
/* src/assets/main.css */
@import "tailwindcss";
@source "../**/*.nuv";
```
*Note: The `@source` directive tells Tailwind to scan all `.nuv` files for utility classes so it knows which CSS to generate.*

**Step 4:** You are ready! Simply start using Tailwind classes in any `.nuv` file.

## 6. Complete Tailwind Example

Here is a complete, beginner-friendly example combining Nuvsha reactivity with Tailwind styling.

```html
<script>
  count = 0
</script>

<div class="min-h-screen p-8 bg-slate-50 flex items-center justify-center">
  <div class="rounded-xl border border-slate-200 bg-white p-8 shadow-lg text-center">
    
    <h1 class="text-3xl font-bold text-slate-800">
      Nuvsha Dashboard
    </h1>

    <p class="mt-4 text-lg text-slate-600">
      You have clicked {count} times.
    </p>

    <button
      class="mt-6 rounded-lg bg-blue-600 px-6 py-2 text-white font-medium hover:bg-blue-700 transition-colors"
      onclick="count++"
    >
      Increment Counter
    </button>
    
  </div>
</div>
```

**What is happening?**
- **Nuvsha handles the logic:** `count = 0` (state), `{count}` (expression), and `onclick="count++"` (events).
- **Tailwind handles the styling:** `p-8` (spacing), `bg-white` (colors), `flex` (layout), `text-3xl` (typography), `rounded-xl` (borders), and `hover:bg-blue-700` (interactive styling).

This distinction makes it incredibly easy to manage both logic and appearance in a single file without confusion.

## 7. Responsive Design

Tailwind makes responsive design simple by using prefixes like `md:` (medium screens like tablets) or `lg:` (large screens like laptops).

```html
<div class="p-4 md:p-8 lg:p-12">
  <h1 class="text-xl md:text-3xl">Responsive Title</h1>
</div>
```

**How it works:**
- `p-4` → By default (mobile), use small padding.
- `md:p-8` → On medium screens and up, use medium padding.
- `lg:p-12` → On large screens and up, use large padding.

Nuvsha processes these classes perfectly, allowing your application to adapt to any device size.

## 8. Dark and Light UI

Dark mode is a built-in feature of Tailwind CSS, not a specific Nuvsha feature. You can use the `dark:` prefix to style elements specifically for dark mode.

```html
<div class="bg-white dark:bg-slate-900 text-black dark:text-white p-6 rounded-lg">
  <h2>Themed Card</h2>
  <p class="text-gray-600 dark:text-gray-400">This text adjusts automatically.</p>
</div>
```

If your user's operating system is set to dark mode, Tailwind automatically detects it and applies the `dark:bg-slate-900` class instead of `bg-white`.

## 9. Component Styling

Styling works seamlessly across Nuvsha components. Because Nuvsha allows you to pass standard HTML attributes as props, you can pass classes down to child components.

**`src/components/Card.nuv`**:
```html
<script>
  export let className = ""
</script>

<div class="bg-white rounded-xl shadow-md p-6 {className}">
  <slot />
</div>
```

**`src/App.nuv`**:
```html
<script>
  import { Card } from "./components/Card.nuv"
</script>

<!-- The Card has default styles, but we add 'border-blue-500' via the className prop -->
<Card className="border-2 border-blue-500">
  <h2>Important Information</h2>
</Card>
```

## 10. Styling + Reactivity

Because Nuvsha natively evaluates expressions inside `{}` braces, you can dynamically apply classes based on reactive state.

```html
<script>
  isActive = false
</script>

<button 
  class="px-4 py-2 rounded {isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}"
  onclick="isActive = !isActive"
>
  {isActive ? 'Active' : 'Inactive'}
</button>
```

When you click the button, `isActive` toggles. Nuvsha automatically re-evaluates the ternary expression inside the `class` attribute and instantly updates the button's color in the DOM!
