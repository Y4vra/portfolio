# What is this

This is a simple way for me to showcase to the internet my previous projects, as well as a primary introduction to Astro web pages.

## About the project

This portfolio is built using [Astro](https://astro.build/), a modern static site builder that allows you to create fast and optimized websites using your favorite frameworks and tools. The goal is to have a clean, minimalistic place to display my work and provide some context about who I am and what I do.

## Features

- ⚡ Fast performance with Astro
- 🌐 Deployable on free static servers
- 🧩 Easy to modify and update
- 📄 Project pages with descriptions and links
- 📬 Contact section

## Running locally

Requires Node.js 22.23.4 or newer (Astro 7).

```sh
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:4321/portfolio
npm run build    # build the static site into dist/
npm run preview  # preview the production build
```

Projects are Markdown files in `src/projects/`. Set `display: true` in a project's frontmatter to show it in the featured carousel.
