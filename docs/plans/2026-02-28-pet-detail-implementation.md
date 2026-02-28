# Pet Detail Implementation Plan

**Goal:** Build out the dynamic `app/find-pet/[id]/page.tsx` displaying individual pet information, mimicking the provided Figma layout.

**Architecture:** Component-based UI using Tailwind CSS grid layouts, adhering to Brand Identity guidelines.

**Tech Stack:** Next.js (App Router), Tailwind CSS.

---

### Task 1: Create Shared Components
**Files:**
- Create: `app/components/pet-detail/PetProfileHero.tsx`
- Create: `app/components/pet-detail/PetFactsGrid.tsx`
- Create: `app/components/pet-detail/PetFeatureChecklist.tsx`
- Create: `app/components/pet-detail/PetStorySection.tsx`
- Create: `app/components/pet-detail/PetAdoptionBanner.tsx`

**Step 1:** Implement `PetProfileHero`. Uses Next/Image with stacking background color divs to replicate the tilted box aesthetics from the image.
**Step 2:** Implement `PetFactsGrid`. A 2-column or 3-column grid partitioned by thin vertical/horizontal border lines.
**Step 3:** Implement `PetFeatureChecklist`. Renders multiple text spans with checkmarks.
**Step 4:** Implement `PetStorySection` to render simple textual data.
**Step 5:** Implement `PetAdoptionBanner` rendering the white info-card within a teal wrapper.

### Task 2: Update FindPet Page Linking
**Files:**
- Modify: `app/find-pet/page.tsx`

**Step 1:** Wrap the Pet Cards in `Link` tags pointing to `/find-pet/${pet.id}`.

### Task 3: Combine in Dynamic Route
**Files:**
- Create: `app/find-pet/[id]/page.tsx`

**Step 1:** Create string interpolation/mock data for Emily the Husky, or map the `[id]` parameter if available.
**Step 2:** Assemble `Header`, the 5 custom components, the `NewsletterSubscription` from the previous step, and `Footer`.
