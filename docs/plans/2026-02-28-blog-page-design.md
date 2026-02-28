# Blog Page Design Document

**Goal:** Create a Blog page (`/blog`) that showcases featured articles, categorized pet care advice, practical tips, and recent posts based on the provided high-fidelity mockup.

## Architecture & Data Flow
- **Framework:** Next.js App Router.
- **Route:** `app/blog/page.tsx`.
- **Data:** For MVP, mock data will be used.

## Components Breakdown
To maintain a modular architecture and adhering to the Brand Identity (Teal `#0489a9`, Orange `#f08c50`, Nunito + Inter fonts), the UI is broken into these components (inside `app/components/blog/`):

1. **`BlogHeroFeatured.tsx`**
   - **Visual:** A full-width dynamic hero section.
   - **Image:** A large wide-aspect ratio image of dogs/cats taking up the top area.
   - **Content Box:** A dark overlay box positioned on the bottom-left of the image containing the title ("Basic to Brilliant tips: Training your pet tricks") in orange, and description text in gray.

2. **`BlogCategoryNav.tsx`**
   - A single horizontal row of navigation links (categories): "Pet Adoption", "Pet Care" (active state in Orange), "Resources", "Videos", "Podcast".

3. **`BlogGrid.tsx`**
   - A 3-column masonry/grid layout containing multiple article cards.
   - **Card Structure:** 
     - Top half: Image of a pet (Husky, Cat, Parrot, Fish).
     - Bottom half: Solid black `#000000` or very dark background block.
     - Text: Title text in Orange `#f08c50` centered vertically and horizontally within the dark block.
   - **Bottom CTA:** An orange button labeled "View all" underneath the grid.

4. **`BlogTipsHero.tsx`**
   - A full-width horizontal split-section.
   - **Left side:** Image of a dog tearing up paper/messing things up.
   - **Right side:** A solid teal `#0489a9` background.
   - **Content:** Title in Orange ("Tips to anti smell your feline"), and a large block of descriptive paragraph text in white. Includes a "Read More" text link.

5. **`BlogRecentPosts.tsx`**
   - **Header:** Title "Recent Post" in black/dark gray.
   - **Slider/List:** Horizontal list or CSS Grid of 2 wide cards.
   - **Card Structure (Split layout):** 
     - Left side: Square/Rectangle Image.
     - Right side: Solid black/dark background block containing Title (white), excerpt text (gray), and an orange "Read More" button.
   - **Slider Indicators:** Simple dot indicators (active dot black, inactive gray) centered below the cards.

## Design Aesthetic
- **Colors:** Primary Orange (`#f08c50`), Secondary Teal (`#0489a9`), Dark Backgrounds (`#1a1a1a` or `#000`), Background White.
- **Typography:** `font-heading` for Titles, `font-menu` for descriptions.
- **Spacing:** Generous padding (`py-12` or `py-20`) between distinct horizontal bands.

## Next Steps
Use the planning skill to flesh out the component implementations.
