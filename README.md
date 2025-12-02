# mmvldmgd

This project is managed by Chipify AI Builder.

## Development Server

**IMPORTANT**: The development server is already running and managed by Chipify.

- **Dev Server URL**: `http://127.0.0.1:5230`
- **Preview URL**: `https://api.chitterchat.co.uk/chipify/projects/5d92fbf4-6b93-4f0e-91d0-148cae20c272/preview`
- **Port**: `5230`

**DO NOT** start a new dev server. The dev server is automatically started when the project is created and is accessible via the preview URL above.

## Project Structure

- `src/` - Source code
- `src/pages/` - Page components
- `src/components/` - Reusable components
- `package.json` - Dependencies and scripts

## Available Scripts

- `npm run dev` - Start dev server (already running, managed by Chipify)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Navigation & Routing

**CRITICAL**: Always use React Router's `Link` component for navigation, NOT regular `<a>` tags.

```tsx
import { Link } from 'react-router-dom'

// ✅ CORRECT - Use Link component
<Link to="/about">About</Link>

// ❌ WRONG - Don't use regular anchor tags
<a href="/about">About</a>
```

Using `Link` ensures:
- Client-side routing works correctly
- The preview URL base path is maintained
- No full page reloads
- Smooth navigation experience

## Notes for AI Assistants

When working on this project:
1. **DO NOT** run `npm run dev` - the dev server is already running
2. **DO NOT** start a new dev server process
3. **ALWAYS** use `<Link>` from react-router-dom for navigation, never `<a>` tags
4. The dev server is accessible at `http://127.0.0.1:5230`
5. Preview the application using the preview URL: `https://api.chitterchat.co.uk/chipify/projects/5d92fbf4-6b93-4f0e-91d0-148cae20c272/preview`
6. All file changes will automatically reload in the browser via Vite HMR
