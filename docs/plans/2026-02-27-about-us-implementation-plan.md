# About Us Page Implementation Plan

**Goal:** Build a fully responsive, modular "About Us" page featuring team grids, services, and an interactive FAQ accordion, matching the exact brand identity guidelines.

**Architecture:** We will adopt a Modular Components approach. To support routing, the existing Header and Footer will be extracted from `app/page.tsx` into reusable components. Complex sections of the About page will be built as discrete component files in `app/components/`.

**Tech Stack:** Next.js (App Router), Tailwind CSS, React (`useState` for accordions), `lucide-react` (for icons).

---

### Task 1: Extract Global Layout Components (Header & Footer)

**Files:**
- Create: `c:\Users\Admin\Desktop\PetAdoption\pet-adoption-web\app\components\Header.tsx`
- Create: `c:\Users\Admin\Desktop\PetAdoption\pet-adoption-web\app\components\Footer.tsx`
- Modify: `c:\Users\Admin\Desktop\PetAdoption\pet-adoption-web\app\page.tsx:1-50` (approximate header location)
- Modify: `c:\Users\Admin\Desktop\PetAdoption\pet-adoption-web\app\page.tsx:600-690` (approximate footer location)

**Step 1: Write minimal implementation**
Extract the Header `<nav>` and the entire `<footer id="footer-system">` into discrete components.
Update `app/page.tsx` to import and use `<Header />` and `<Footer />`.

**Step 2: Commit**
```bash
git add app/components/Header.tsx app/components/Footer.tsx app/page.tsx
git commit -m "refactor(ui): extract Header and Footer into global components"
```

---

### Task 2: Build Meet the Team Component

**Files:**
- Create: `c:\Users\Admin\Desktop\PetAdoption\pet-adoption-web\app\components\TeamGrid.tsx`

**Step 1: Write minimal implementation**
Create a component rendering an array of 8 team members. Display them in a CSS Grid (CSS `grid-cols-2 md:grid-cols-4`). Use Next.js `<Image />` with a linear-gradient overlay for the text (Name in orange, role in gray).

**Step 2: Commit**
```bash
git add app/components/TeamGrid.tsx
git commit -m "feat(about): create TeamGrid component"
```

---

### Task 3: Build Services Component

**Files:**
- Create: `c:\Users\Admin\Desktop\PetAdoption\pet-adoption-web\app\components\ServicesGrid.tsx`

**Step 1: Write minimal implementation**
Render a `display: grid` or `flex` wrapper. Left column holds plain text and a button. Right column holds a 2x2 grid of Teal (`#0489a9`) cards with white text detailing services.

**Step 2: Commit**
```bash
git add app/components/ServicesGrid.tsx
git commit -m "feat(about): create ServicesGrid component"
```

---

### Task 4: Build Interactive FAQ Accordion Component

**Files:**
- Create: `c:\Users\Admin\Desktop\PetAdoption\pet-adoption-web\app\components\FAQAccordion.tsx`

**Step 1: Write minimal implementation**
This must be a `"use client"` component. Define an array of FAQs. Maintain `const [openIndex, setOpenIndex] = useState(null)`. Render a list of items; clicking toggles the index. Use brand Orange for bullet points/icons.

**Step 2: Commit**
```bash
git add app/components/FAQAccordion.tsx
git commit -m "feat(about): create interactive FAQAccordion component"
```

---

### Task 5: Assemble `about-us` Page Route

**Files:**
- Create: `c:\Users\Admin\Desktop\PetAdoption\pet-adoption-web\app\about-us\page.tsx`

**Step 1: Write minimal implementation**
Import `<Header />`, `<Footer />`, `<TeamGrid />`, `<ServicesGrid />`, and `<FAQAccordion />`.
Implement the Hero Section directly in the file (offset squares).
Implement the Contact Form section next to the FAQ component.

**Step 2: Commit**
```bash
git add app/about-us/page.tsx
git commit -m "feat(about): assemble full About Us page route"
```
