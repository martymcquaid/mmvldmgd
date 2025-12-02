# OpenCode Configuration

## Development Server

**CRITICAL**: The development server is already running and managed by Chipify.

- **Local Dev Server**: `http://127.0.0.1:5230`
- **Preview URL**: `https://api.chitterchat.co.uk/chipify/projects/5d92fbf4-6b93-4f0e-91d0-148cae20c272/preview`
- **Port**: `5230`

## Navigation & Routing

**CRITICAL**: Always use React Router's `Link` component for navigation, NOT regular `<a>` tags.

```tsx
import { Link } from 'react-router-dom'

// ✅ CORRECT - Use Link component
<Link to="/about">About</Link>

// ❌ WRONG - Don't use regular anchor tags
<a href="/about">About</a>
```

Using `Link` ensures client-side routing works correctly with the preview URL base path.

## Instructions for AI Agents

**DO NOT** attempt to start a development server. The server is:
- Already running when the project is created
- Managed by Chipify backend service
- Accessible via the preview URL above
- Automatically reloads on file changes (Vite HMR)

When working on this project:
1. **NEVER** run `npm run dev` - it's already running
2. **NEVER** start a new dev server process
3. **ALWAYS** use `<Link>` from react-router-dom for navigation, never `<a>` tags
4. Use the preview URL to view the application
5. File changes will automatically reload via Vite HMR
