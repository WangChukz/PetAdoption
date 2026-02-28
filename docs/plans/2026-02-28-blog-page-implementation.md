# Blog Page Implementation Plan

**Goal:** Build the dynamic `app/blog/page.tsx` displaying various blog sections according to the design doc.

**Tech Stack:** Next.js (App Router), Tailwind CSS.

---

### Task 1: Create Blog Specific UI Components
**Files:**
- Create: `app/components/blog/BlogHeroFeatured.tsx`
- Create: `app/components/blog/BlogCategoryNav.tsx`
- Create: `app/components/blog/BlogGrid.tsx`
- Create: `app/components/blog/BlogTipsHero.tsx`
- Create: `app/components/blog/BlogRecentPosts.tsx`

**Steps:**
1. **`BlogHeroFeatured`:** Build the large full-width image container using `next/image` and absolute positioning for the dark text box.
2. **`BlogCategoryNav`:** A simple flex row with text links.
3. **`BlogGrid`:** Define an array of mock articles. Use CSS Grid (`grid-cols-1 md:grid-cols-3`) to map over the articles and render the black bottom-half cards. Add the "View all" button.
4. **`BlogTipsHero`:** Flex container (`flex-col md:flex-row`). Left image `.w-1/2`, right Teal div `.w-1/2`.
5. **`BlogRecentPosts`:** Render two wider horizontal cards.

### Task 2: Create the Blog Route
**Files:**
- Create: `app/blog/page.tsx`

**Steps:**
1. Import and stack the Header, the 5 newly created Blog UI components, the `NewsletterSubscription`, and the `Footer`.

### Task 3: Update Header Link
**Files:**
- Modify: `app/components/Header.tsx`

**Steps:**
1. Update `href` attribute on the "Blog" navigation link to `/blog`.
