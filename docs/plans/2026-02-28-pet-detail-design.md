# Pet Detail Page Design (Brainstorming)

**Goal:** Create a detailed profile page for individual pets (Dynamic route `/find-pet/[id]`), matching the provided high-fidelity mockup.

## Architecture & Data Flow
- **Framework:** Next.js App Router.
- **Route:** `app/find-pet/[id]/page.tsx`.
- **Data Fetching:** For MVP, we will use mock data passed directly into the components or fetched locally based on the `[id]` parameter.

## Components Breakdown
To keep the codebase modular, testable, and maintainable, we will break the UI down into the following functional components (placed in `app/components/pet-detail/`):

1. **`PetProfileHero`**
   - Headings: "My name is [Pet Name]".
   - Left visual: Pet Image masked/overlaying two tilted rectangle blocks (Orange `#f08c50` and Teal `#0489a9`), identical to the "About Us" section's aesthetic.
   - Right info column: 
     - "I'm being cared for by" details.
     - "Adoption Process" checklist.
     - Adoption Fee and main CTA Button ("Apply for adoption").

2. **`PetFactsGrid`**
   - A grid layout separated by horizontal dividing lines.
   - Outputs key-value pairs representing "Facts about me" (Breed, Color, Age, Size, Weight, Sex, Pet Id).

3. **`PetFeatureChecklist`**
   - "My Info".
   - A multi-column list using checkmark SVG icons for boolean features (e.g., "Good with kids", "Shots Current", "Housebroken").

4. **`PetStorySection`**
   - "Why I need a new home" (Short paragraph / sentence).
   - "My Story" (Long-form text content detailing the pet's personality).

5. **`PetAdoptionBanner`**
   - A deep Teal (`#0489a9`) call-to-action block.
   - Contains a white card ("About Private adoptions").
   - A secondary "Apply to adopt" button.

## Design Aesthetic
- **Colors:** Primary Orange (`#f08c50`), Secondary / Banner Teal (`#0489a9`), Background White, Text Dark/Gray.
- **Typography:** `font-heading` (Nunito) for Titles, `font-menu` (Inter) for descriptions and lists.
- **Micro-interactions:** Interactive hover states on primary buttons to elevate or darken backgrounds.

## Implementation Strategy (Component-based)
Instead of generating one massive monolith `page.tsx`, we will implement each component individually and assemble them in `page.tsx`. This aligns with the Brand Identity directives (Tailwind UI component structuring).
