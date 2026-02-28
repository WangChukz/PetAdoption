# Authentication Pages Implementation Plan

**Goal:** Build responsive Login, Register, and Reset Password pages using a unified Split-Screen layout.

**Architecture:** Create an `AuthLayout` component to handle the UI shell (Image half + Form container half). Then build three separate page routes (`/login`, `/register`, `/reset-password`) that utilize this shell.

**Tech Stack:** Next.js (App Router), Tailwind CSS, Lucide React (for icons), HTML5 Forms.

---

### Task 1: Create the AuthLayout Wrapper Component

**Files:**
- Create: `c:\Users\Admin\Desktop\PetAdoption\pet-adoption-web\app\components\AuthLayout.tsx`

**Step 1: Write minimal implementation**
Build a `min-h-screen flex` layout. 
**Left Side (Hidden on Mobile, 50% width on Desktop):** Contains a Next.js `<Image>` with `object-cover` and a semi-transparent Teal/Orange overlay mix-blend.
**Right Side (100% Mobile, 50% Desktop):** Flexbox centered container displaying the `children` prop (the actual forms). Include a "Back to Home" minimal button in the corner.

**Step 2: Commit**
```bash
git add app/components/AuthLayout.tsx
git commit -m "feat(auth): create AuthLayout split-screen shell component"
```

---

### Task 2: Build the Login Page

**Files:**
- Create: `c:\Users\Admin\Desktop\PetAdoption\pet-adoption-web\app\login\page.tsx`

**Step 1: Write minimal implementation**
Import `AuthLayout`. Define the form structure: Email input, Password input, Checkbox ("Remember me"), Link to `/reset-password`, Primary Submit Button. Include a "Create an account" link routing to `/register`. Use Brand typography (`font-heading`, `font-menu`).

**Step 2: Commit**
```bash
git add app/login/page.tsx
git commit -m "feat(auth): create Login page route"
```

---

### Task 3: Build the Register Page

**Files:**
- Create: `c:\Users\Admin\Desktop\PetAdoption\pet-adoption-web\app\register\page.tsx`

**Step 1: Write minimal implementation**
Import `AuthLayout`. Use a different background image for variety. Define the form structure: Full Name, Email, Password, Confirm Password inputs. Include a "Terms of Service" checkbox. Add a "Sign in instead" link pointing to `/login`.

**Step 2: Commit**
```bash
git add app/register/page.tsx
git commit -m "feat(auth): create Register page route"
```

---

### Task 4: Build the Reset Password Page

**Files:**
- Create: `c:\Users\Admin\Desktop\PetAdoption\pet-adoption-web\app\reset-password\page.tsx`

**Step 1: Write minimal implementation**
Import `AuthLayout`. Define a simplified form asking only for the Email address. Add descriptive text explaining that a reset link will be sent. Add a "Wait, I remember my password" link pointing back to `/login`.

**Step 2: Commit**
```bash
git add app/reset-password/page.tsx
git commit -m "feat(auth): create Reset Password page route"
```
