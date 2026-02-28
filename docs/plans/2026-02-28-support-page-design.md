# Support Page Design Document

**Goal:** Create a Support page (`/support`) encompassing both Donation functionality and a Volunteer registration form, adhering to the brand identity.

## Architecture & Data Flow
- **Framework:** Next.js App Router.
- **Route:** `app/support/page.tsx`.
- **Interactivity:** Forms require "use client" for client-side state management (even if submission is not implemented to a backend yet).

## Components Breakdown
We will place the modular components in `app/components/support/`.

1. **`DonationSection`**
   - **Tabs:** "Financial Donation" (Active, background `#f08c50`, text White) and "Animal Food Donation" (Inactive, background transparent, text Black, border Gray).
   - **Subtitle:** "Your donations are highly appreciated!"
   - **Layout:** Flex container (column on mobile, row on tablet/desktop).
   - **Left Image Area:** Uses the rotated background boxes (`#f08c50` and `#0489a9`) with a donation-related image overlay on top in a white box.
   - **Right Form Area:** Input fields for Name, Email Id, Date of birth. Button "Confirm Donation" using the primary orange color.

2. **`VolunteerSection`**
   - **Header:** Centered title "Volunteer" with a short description text below it.
   - **Form Container:** Centered wrapper (`max-w-2xl` or similar) to prevent inputs from stretching too wide on large screens.
   - **Fields:**
     - Name (Full Name)
     - Email Address
     - Phone Number
     - Area Of focus (Dropdown/Select with options like "Administration", "Animal Care", etc. For now, just a placeholder or basic options)
     - Your CV (Input type file)
     - Tell us about yourself? (Textarea)
   - **Submit Button:** Centered "Submit" button in orange.

## Design Aesthetic
- **Brand Colors:** Orange `#f08c50`, Teal `#0489a9`.
- **Typography:** `font-heading` for titles, `font-menu` for input labels and descriptions.
- **Forms:** Light/transparent inputs with bottom borders (as seen in the design mockup) or full light bordered boxes. The design shows minimal borders mostly on the bottom or very light all around. We will use a standard light gray border for clarity.
- **Images:** Sourced from Unsplash or generic placeholders for the donation box.

## Next Steps
Proceed to the implementation plan document.
