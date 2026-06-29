# Deploying to GitHub Pages

This project is set up to be easily deployed to GitHub Pages using GitHub Actions.

## Step 1: Prepare your Repository

1. Push your code to a GitHub repository.
2. In your repository on GitHub, go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.

## Step 2: Configure `vite.config.ts` (Important)

If your site is going to be hosted at `https://<username>.github.io/<repository-name>/`, you **must** update the `base` property in `vite.config.ts`.

Example for a repository named `my-cool-app`:

```typescript
// vite.config.ts
export default defineConfig({
  base: '/my-cool-app/', // Add this line!
  plugins: [react(), tailwindcss(), viteSingleFile()],
  // ... rest of config
})
```

*Note: If you are using a custom domain or hosting at `https://<username>.github.io/` (a User/Organization site), you can keep `base` as `'/'` (or omit it).*

## Step 3: Trigger Deployment

The GitHub Action is already configured in `.github/workflows/deploy.yml`. It will automatically trigger every time you push to the `main` branch.

You can also manually trigger it:
1. Go to the **Actions** tab in your GitHub repository.
2. Select the **Deploy to GitHub Pages** workflow.
3. Click **Run workflow**.

## Manual Deployment (Alternative)

If you prefer to deploy manually using the `gh-pages` package:

1. Install the package: `npm install -D gh-pages`
2. Add these scripts to your `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run `npm run deploy`.
