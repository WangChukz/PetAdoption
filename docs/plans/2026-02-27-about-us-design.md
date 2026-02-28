# About Us Page Design

**Goal:** Create an "About Us" page for PetJam that incorporates a comprehensive layout including a Hero section, Team members grid, Featured logos, Services list, FAQ accordion, and a Contact form, adhering strictly to the brand identity established on the landing page.

## Core Principles
- **Aesthetics:** Utilize Brand Identity tokens (`#f08c50` orange, `#0489a9` teal, `#1a1a1a` dark gray).
- **Architecture:** Modular component-based development (React functional components).
- **Responsive:** Mobile-first approach for all grids and flexbox layouts.

## Sections Breakdown
1. **Header & Footer:** Extracted from the Home page (`app/page.tsx`) into shared components (`<Header />`, `<Footer />`) to ensure consistencies across all routes.
2. **Hero Section:** Repurposes the "offset squares" design idiom for images, paired with descriptive text about PetJam.
3. **Meet the Team (`<TeamGrid />`):** A 4-column (desktop) grid displaying team member photos. It features a dark gradient overlay at the bottom of each image containing the name and role in White/Orange text.
4. **As Featured In (`<FeaturedLogos />`):** Reuses the brand trust logos. Will be converted to a shared component.
5. **Our Services (`<ServicesGrid />`):** A 50/50 layout. Left side: Heading and descriptive text with a CTA button. Right side: A 2x2 grid of teal colored feature cards.
6. **FAQ & Contact Form (`<FAQAccordion />` & Page Form):** A 50/50 layout. Left side: An interactive functional Accordion containing FAQs, using React `useState`. Right side: A minimal contact form for sending messages.

## Data Management
- Static mock data arrays will be defined inside components (e.g., `const teamMembers = [...]`) to keep the UI decoupled and renderable immediately as MVP.

## Expected Trade-offs
- Extracting Header/Footer requires touching `app/page.tsx` again, but this is a necessary technical debt payment to achieve a multi-page app architecture.
