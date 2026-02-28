# Authentication Pages Design

**Goal:** Create a cohesive Authentication flows (Login, Register, and Reset Password) utilizing a split-screen layout (Approach A) matching the established brand identity.

## Core Principles
- **Aesthetics:** Utilize Brand Identity tokens (`#f08c50` orange, `#0489a9` teal, `#1a1a1a` dark gray, `#f4f7f6` light beige).
- **Architecture:** Split screen. One half (left or right) dedicated to high-impact imagery with a brand color overlay, the other half containing the functional form centered vertically and horizontally.
- **Micro-interactions:** Input fields should have subtle border focus states (Orange). Buttons should have hover effects.

## Component Structure & Data Flow
Instead of duplicating the split-screen shell three times, we will create an `AuthLayout` wrapper component to maintain DRY principles.

1. **`app/components/AuthLayout.tsx`**: 
   - A wrapper component accepting `children` (the form), `title`, `description`, and an optional `imageSrc`. 
   - Renders a 100vh CSS Grid (1 column on mobile, 2 columns on `lg`).
   - Handles the image placement and the brand color overlays (Teal/Orange).

2. **`app/login/page.tsx`**: 
   - Implements the Login Form (Email, Password, "Forgot Password?" link).
   - "Don't have an account? Sign up" link.

3. **`app/register/page.tsx`**:
   - Implements the Registration Form (Full Name, Email, Password, Confirm Password).
   - Terms and Conditions checkbox.
   - "Already have an account? Login" link.

4. **`app/reset-password/page.tsx`**:
   - Implements a simple form (Email input) to trigger a password reset link.
   - "Back to Login" link.

## Expected Trade-offs
- Using a strict 100vh layout means the traditional Header and Footer will be hidden on these pages. This is intentional (App-like feel) but differs from the global layout.
- We'll use mock data and generic handlers `onSubmit={(e) => e.preventDefault()}` for the forms as there is no backend hooked up yet.
