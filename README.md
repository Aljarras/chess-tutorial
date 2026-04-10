
  # Chess Tutorial App Design

  This is a code bundle for Chess Tutorial App Design. The original project is available at https://www.figma.com/design/Frn4fGzUk05ZKSUESdCK93/Chess-Tutorial-App-Design.

## Running Locally in VS Code

1. **Install dependencies** (first time only):
   - Open the integrated terminal in VS Code (`Ctrl+Backtick`)
   - Run: `npm install`
   - Or use the VS Code task: `Terminal > Run Task > Install Dependencies`

2. **Start the dev server**:
   - Run: `npm run dev`
   - Or use the default task: `Terminal > Run Task > Dev Server (Vite)` or press `Ctrl+Shift+B`
   - Open the URL shown in the terminal (usually `http://localhost:5173`)

## Deploying to Static Hosting

1. **Build the app for production**:
   - Run: `npm run build`
   - Or use the task: `Terminal > Run Task > Build for Deployment`
   - This creates a `dist` folder with production-ready files

2. **Upload the `dist` folder** to your hosting provider:
   - Upload only the contents of the `dist` folder to your web host
   - Set the root domain to serve from `dist` (not the project root)
   - Example: If using GitHub Pages, upload `dist` contents; for other hosts, follow their deployment guide

3. **The app is ready for static hosting**:
   - Hash-based routing (`/#/route`) ensures all navigation works without server rewrites
   - Relative paths ensure assets load correctly on any domain
  