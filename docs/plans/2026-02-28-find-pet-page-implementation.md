# Find Pet Page Implementation Plan

**Goal:** Implement the "Find Pet" page as per the provided visual design, featuring a search hero section, pet gallery, educational adoption tips, and a newsletter subscription block.

**Architecture:** Use Next.js App Router to create a new route `/find-pet`. We will extract and reuse the new Pet Card style from `app/page.tsx`. The page will be composed of functional and semantic sections aligned with the overarching Brand Identity (using the Teal `#0489a9` and Orange `#f08c50` brand colors).

**Tech Stack:** Next.js (React), Tailwind CSS.

---

### Task 1: Create Reusable Components

**Files:**
- Create: `app/components/NewsletterSubscription.tsx`
- Create: `app/components/AdoptionTips.tsx`

**Step 1: Write NewsletterSubscription component**
This component will feature a high-contrast black background with a white input field and an orange submit button.

**Step 2: Write AdoptionTips component**
This component will iterate through 10 tips, displaying them in a two-column layout with teal numbered circles connecting them.

### Task 2: Create the Find Pet Page Route

**Files:**
- Create: `app/find-pet/page.tsx`

**Step 1: Implement Page Layout**
Import `Header`, `Footer`, `NewsletterSubscription`, and `AdoptionTips`.

**Step 2: Implement Search Hero Section**
Create a full-width teal hero section featuring pet silhouettes (using SVG/Image or mock blocks) and an inline search form containing Select elements for "Location", "Category", "Animals", "Dogs", and a "Search" button.

**Step 3: Implement Pet Grid Section**
Create the "Adopt a pet" section containing:
- Tab links (`All`, `Cat`, `Dog`, `Parrots`, `Fishes`).
- The 6-item Pet Grid. We will use the exact hover-card style currently showcased on the landing page (a dark UI card with an image background and a text overlay at the bottom).

### Task 3: Assemble and Review
Verify visual fidelity matches the reference image and brand guidelines, particularly ensuring correct font usages (`font-heading`, `font-menu`) and brand colors (`#0489a9`, `#f08c50`).
