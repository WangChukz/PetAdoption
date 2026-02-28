# Support Page Implementation Plan

**Goal:** Build the dynamic `app/support/page.tsx` displaying the donation and volunteer sections based on the accepted design.

**Tech Stack:** Next.js (App Router), Tailwind CSS.

---

### Task 1: Create Support Components
**Files:**
- Create: `app/components/support/DonationSection.tsx`
- Create: `app/components/support/VolunteerSection.tsx`

**Step 1:** Implement `DonationSection`.
- Uses `"use client"` directive.
- State for currently active tab (Financial vs. Food).
- Left-side image with the signature skewed brand color boxes behind it.
- Right-side simple form inputs and submit button.

**Step 2:** Implement `VolunteerSection`.
- Uses `"use client"` directive.
- Centered layout.
- Stacked inputs for Name, Email, Phone, Dropdown, File upload, and Textarea.
- Simple submit button.

### Task 2: Create the Support Route
**Files:**
- Create: `app/support/page.tsx`

**Step 1:** Assemble the page structure, incorporating `Header`, `DonationSection`, `VolunteerSection`, the existing `NewsletterSubscription`, and `Footer`.

### Task 3: Update Header Navigation
**Files:**
- Modify: `app/components/Header.tsx`

**Step 1:** Locate the "Support" link in the navigation menu.
**Step 2:** Update its `href` to `/support` and ensure it visually indicates the active state if possible (or just fix the routing).
