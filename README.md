# Portfolio Website

A modern portfolio website built with React, TypeScript, Vite, and Tailwind CSS.

## GitHub Instructions

To push this repository to GitHub:

1. Create a new repository on GitHub named "portfolio-vs" at https://github.com/new
2. Connect your local repository to GitHub (replace `YOUR_USERNAME` with your GitHub username):

```bash
git remote add origin https://github.com/YOUR_USERNAME/portfolio-vs.git
git branch -M main
git push -u origin main
```

## Deployment Instructions

### Option 1: Deploy to Netlify

1. Sign up or log in to [Netlify](https://www.netlify.com/)
2. Click "Add new site" > "Import an existing project"
3. Connect to your GitHub account and select the "portfolio-vs" repository
4. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"

### Option 2: Deploy to Vercel

1. Sign up or log in to [Vercel](https://vercel.com/)
2. Click "Add New" > "Project"
3. Connect to your GitHub account and select the "portfolio-vs" repository
4. Configure the build settings:
   - Framework Preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
5. Click "Deploy"

### Option 3: Deploy to GitHub Pages

1. Install the GitHub Pages dependency:
```bash
npm install gh-pages --save-dev
```

2. Add these scripts to your package.json:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Add a base path to your vite.config.ts file:
```typescript
export default defineConfig({
  plugins: [react()],
  base: "/portfolio-vs/"
})
```

4. Deploy to GitHub Pages:
```bash
npm run deploy
```

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview the production build:
```bash
npm run preview
```
