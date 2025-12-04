## Fully Responsive Website — Overview & Learnings

### Overview
This project is a modern, fully responsive single‑page website built with React and Vite. It showcases a clean, product‑focused landing experience with a strong emphasis on usability, accessibility, and performance.

Key characteristics:
- Responsive layout that adapts from mobile to large desktop screens.
- Sticky, translucent navigation bar with smooth in‑page scrolling and active‑section highlighting (scroll‑spy).
- Accessible mobile menu with proper ARIA attributes, keyboard support (ESC to close), and a backdrop overlay.
- Polished visual details: gradient accents, focus-visible rings for keyboard users, subtle shadows, and motion‑safe transitions.
- Familiar landing sections (hero, features/benefits, stats, logos, testimonials, CTA, footer) suited for product or SaaS marketing.

Technologies used:
- React (Vite) for a fast development experience and modular UI.
- Tailwind CSS utility classes for rapid, consistent styling.
- Small, optimized assets (SVG/PNG) for crisp visuals.

### What I Learned
- Accessibility and semantics
  - How to use ARIA attributes (`aria-expanded`, `aria-controls`, `aria-current`) to make navigation understandable to assistive technologies.
  - Providing proper focus styles (focus-visible rings) and ensuring interactive targets meet comfortable tap sizes (≥44px).

- Navigation UX patterns
  - Implementing a sticky navbar that remains readable over content using translucency and backdrop blur.
  - Building an accessible mobile drawer menu with keyboard support and closing it via ESC or backdrop click.
  - Adding smooth scrolling to in‑page anchors and keeping the URL hash in sync for shareable, navigable sections.

- State and effects in React
  - Using `useState` to track active navigation items and menu open/close state.
  - Using `useEffect` for event listeners (keyboard/scroll) and to manage side effects like body scroll lock when the menu is open.
  - Applying `IntersectionObserver` to implement a lightweight scroll‑spy that updates the active link as sections enter the viewport.

- Responsive design with Tailwind CSS
  - Structuring layouts and spacing consistently using utilities rather than ad‑hoc CSS.
  - Employing motion‑safe transitions and adaptive spacing/typography for different breakpoints.

- Small performance touches
  - Async image decoding for the logo and minimizing layout shifts.
  - Avoiding unnecessary reflows by using observers and passive scroll listeners.

These practices resulted in navigation that feels smoother, looks more refined, and remains accessible across devices and input methods.
