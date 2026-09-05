// docsMapping.js
// We use Vite's import.meta.glob to import the raw markdown content of all .md files in the docs folder.
const rawDocs = import.meta.glob('../../docs/**/*.md', { query: '?raw', import: 'default', eager: true });

// Extract paths relative to the docs folder for easier lookup
const docsContent = {};
for (const path in rawDocs) {
  // Convert path like '../../docs/getting-started/installation.md' to 'getting-started/installation'
  const normalizedPath = path.replace('../../docs/', '').replace('.md', '');
  docsContent[normalizedPath] = rawDocs[path];
}

// Sidebar Structure Mapping based on the recommended structure
export const sidebarStructure = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", path: "introduction/what-is-nuvsha" },
      { title: "Installation", path: "getting-started/installation" },
      { title: "Create your first project", path: "getting-started/create-project" },
      { title: "Project structure", path: "getting-started/project-structure" },
      { title: "Run the development server", path: "getting-started/first-app" }
    ]
  },
  {
    title: "Architecture",
    items: [
      { title: "Architecture Guide", path: "architecture/architecture-guide" }
    ]
  },
  {
    title: "Language Basics",
    items: [
      { title: "HTML", path: "ui/html" },
      { title: "Variables", path: "language/variables" },
      { title: "Expressions", path: "language/expressions" },
      { title: "Events", path: "language/events" },
      { title: "Loops", path: "logic/loops" },
      { title: "Conditions", path: "logic/conditions" }
    ]
  },
  {
    title: "Reactivity",
    items: [
      { title: "Reactive state", path: "reactivity/state" }
    ]
  },
  {
    title: "Components",
    items: [
      { title: "Components", path: "ui/components" },
      { title: "Props", path: "ui/props" },
      { title: "Children", path: "ui/children" },
      { title: "Component events", path: "ui/events" }
    ]
  },
  {
    title: "Forms",
    items: [
      { title: "Forms", path: "forms/form" },
      { title: "Form binding", path: "forms/binding" }
    ]
  },
  {
    title: "Routing",
    items: [
      { title: "Routing Guide", path: "routing/routing-guide" }
    ]
  },
  {
    title: "Data/API",
    items: [
      { title: "Async", path: "logic/async" },
      { title: "Data and API", path: "logic/api-data" }
    ]
  },
  {
    title: "Styling",
    items: [
      { title: "Styling (CSS & Tailwind)", path: "styling/styling-guide" }
    ]
  },
  {
    title: "Editor Tools",
    items: [
      { title: "VS Code Snippets", path: "snippid/snippide" }
    ]
  },
  {
    title: "Advanced",
    items: [
      { title: "Testing Nuvsha", path: "testing/overview" },
      { title: "Master test application", path: "testing/master-test" }
    ]
  },
  {
    title: "Reference",
    items: [
      { title: "Nuvsha syntax", path: "language/overview" }
    ]
  }
];

export const getDocContent = (path) => {
  return docsContent[path] || `# Page Not Found\n\nThe documentation for \`${path}\` could not be found.`;
};

// Flatten routes for easier mapping in react-router
export const flatRoutes = sidebarStructure.flatMap(section => 
  section.items.map(item => ({
    ...item,
    section: section.title
  }))
);
