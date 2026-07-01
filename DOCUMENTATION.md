# Mimo's Collective & Official Website - Comprehensive Documentation

This document provides an exhaustive overview of the architecture, design, and functionality of Movsum Mirzazada's official website and "Mimo's Collective" e-commerce platform.

---

## 1. COMPLETE SITE STRUCTURE & ROUTING

The application uses React Router (`v6.16.0`) for navigation. The routing tree is defined in `src/App.jsx`.

### Public Routes
- `/` - `HomePage` (Main portfolio and landing)
- `/auth` - `AuthPage` (Sign in / Sign up)
- `/about` - `AboutPage` (Biography, timeline, skills)
- `/media` - `MediaPage` (Filmography, gallery, press kit)
- `/contact` - `ContactPage` (Contact forms, directories, FAQ)
- `/chat` - `ChatPage` (AI Concierge interface)
- `/product/:id` - `ProductDetailPage` (E-commerce product view)
- `/checkout-success` - `CheckoutSuccessPage` (Post-purchase confirmation)
- `/mimo-collective` - `MimoCollectivePage` (Hub for collective services)
- `/mimo-collective/shop` - `ShopPage` (Merchandise)
- `/mimo-collective/general-services` - `GeneralServicesPage`
- `/mimo-collective/partners-services` - `PartnersServicesPage`
- `/mimo-collective/brands` - `BrandsPage`
- `/mimo-collective/collaborations` - `CollaborationsPage`
- `/mimo-collective/offers` - `OffersPage`
- `/mimo-collective/legal-complaint-service` - `LegalComplaintServicePage` (Landing for legal service)
- `/legal-complaint-what-you-receive` - `WhatYouWillReceivePage`
- `/sample-case-structure` - `SampleCaseStructure`
- `/terms-and-conditions` - `TermsAndConditionsPage`
- `/payment-terms` - `PaymentTermsPage`

### Protected Routes (Require Authentication)
Wrapped in `<ProtectedRoute>`:
- `/legal-complaint-intake` - `LegalComplaintIntakeForm` (Multi-step form)
- `/legal-complaint-dashboard` - `LegalComplaintClientDashboard` (Client view of cases)
- `/client-messaging` - `ClientMessagingPage` (Inbox)
- `/client-messaging/:conversationId` - `ClientMessagingPage` (Specific thread)
- `/case-deliverable/:intakeId` - `LegalComplaintCaseDeliverable` (View/Download final case)
- `/admin` - `AdminPage` (Super Admin dashboard)
- `/admin/case-deliverables` - `AdminPage`

---

## 2. PAGE-BY-PAGE BREAKDOWN

### 2.1 HomePage (`/`)
- **Purpose:** Primary landing page for the actor's portfolio.
- **Sections:**
  - `Hero`: Split layout (Mobile stacked, Desktop side-by-side) featuring the Actor persona (left) and Collective brand (right).
  - `EditorialSection`, `HighlightsSection`, `DualCTA`, `OfficialLinks`, `PressLogos`.
- **SEO:** Structured data (`Person` schema) for Movsum Mirzazada.

### 2.2 AboutPage (`/about`)
- **Purpose:** Detailed biography and professional resume.
- **Sections:**
  - Hero with parallax scroll effects.
  - Biography text with expandable "Read Full" section.
  - Video Introduction column.
  - Competencies (Languages, Corporate & Tech, Leadership).
  - Professional Career (Timeline of corporate roles).
  - Education & Certifications.
  - Awards & Recognition grid.
  - Career Milestones (Interactive vertical timeline).
  - Key Collaborations.

### 2.3 ContactPage (`/contact`)
- **Purpose:** Routing inquiries to the correct departments.
- **Sections:**
  - Trust Badges (Response rates, followers).
  - Location Cards (UAE and Azerbaijan offices with WhatsApp/Call integration).
  - Email Directory (Categorized emails for Personal, General, Legal, Finance).
  - Contact Form (Name, Email, Reason dropdown, Message).
  - FAQ Section (Expandable accordions).

### 2.4 MediaPage (`/media`)
- **Purpose:** Central hub for visual and press assets.
- **Sections (Tabs):**
  - Filmography: Filterable grid of `SmartFilmCard` components.
  - Gallery: `PhotoGallery` integration.
  - Press Kit: Downloadable assets via `PressKitTab`.
  - Interviews & Press: External links to media coverage.

### 2.5 MimoCollectivePage (`/mimo-collective`)
- **Purpose:** Gateway to the e-commerce and services ecosystem.
- **Sections:**
  - Hero introduction.
  - Featured Service banner (Legal Complaint Structuring).
  - Category Grid (Shop, General, Partners, Brands, Collabs, Offers).
  - Featured Highlights grid.

### 2.6 Legal Complaint Flow
- **`/mimo-collective/legal-complaint-service`**: Marketing landing page explaining the non-lawyer case structuring service, pricing tiers, and disclaimers.
- **`/legal-complaint-intake`**: A 5-step protected form collecting user details, incident description, evidence uploads, and legal agreements.
- **`/legal-complaint-dashboard`**: Client-facing portal tracking the status of submitted cases and providing download links for finalized PDFs.

### 2.7 E-commerce Pages
- **`ShopPage`**: Displays `ProductsList` fetching data via `EcommerceApi.js`.
- **`ProductDetailPage`**: Image gallery, variant selector, quantity controls, and Add to Cart functionality. Manages inventory limits.
- **`CheckoutSuccessPage`**: Post-purchase redirect page.

### 2.8 AuthPage (`/auth`)
- **Purpose:** Handles user sign-up and sign-in via Supabase.
- **Features:** Password strength indicator, toggle between login/register, error handling.

---

## 3. COMPONENT INVENTORY

### Core UI Components
- **`Header`**: Sticky navigation, mobile slide-out menu, auth state toggles, cart trigger.
- **`Footer`**: Brand links, social links, legal policies.
- **`Layout`**: Wraps routes, injects `Header`, `Footer`, `ShoppingCart`, and floating widgets (AI Chat, Audio Call).

### E-commerce Components
- **`ShoppingCart`**: Slide-out drawer managing cart state, quantities, and triggering `initializeCheckout`.
- **`ProductsList` & `ProductCard`**: Grid display of inventory fetching from Hostinger Ecommerce API.

### Interactive/Data Components
- **`TimelineSlider`**: Used in MediaPage to filter films by year.
- **`FilterBar`**: Category/theme filtering for filmography.
- **`CheckoutModal`**: Custom modal for purchasing digital services (handles Stripe/PayPal/Crypto routing).
- **`InquiryForm`**: Modal for requesting information on specific brands/services.

### Shadcn UI (Base)
- Utilizes `Button`, `Input`, `Textarea`, `Select`, `Checkbox`, `Tabs`, `Dialog`, `Toast` for consistent, accessible form controls.

---

## 4. DESIGN SYSTEM

### Color Palette (from `index.css`)
- **Backgrounds:**
  - Forest Dark: `#0A1612` (Primary app background)
  - Forest Medium: `#13251E` (Card/Surface background)
  - Forest Light: `#1D362C` (Hover states)
- **Accents:**
  - Rose Gold: `#E0A995` (Primary brand color, buttons, highlights)
  - Rose Gold Dim: `#9E7465` (Muted borders/accents)
- **Text:**
  - Cream: `#EBE8E3` (Primary headings/body)
  - Cream Muted: `#A8B3AF` (Secondary text, descriptions)

### Typography
- **Headings (`h1`-`h6`)**: `Playfair Display` (Serif, elegant, cinematic)
- **Body (`p`, `span`, etc.)**: `Inter` (Sans-serif, highly legible for UI)

### Effects
- Heavy use of `backdrop-blur` for glassmorphism.
- Custom selections: `selection:bg-[#E0A995] selection:text-[#0A1612]`.
- Subtle gradients (`bg-gradient-to-r from-[#E0A995] to-[#D49A89]`) used sparingly on key headings.

---

## 5. FEATURES & FUNCTIONALITY

1. **Authentication (`SupabaseAuthContext`)**: Handles Email/Password auth, session management, and role-based access control (`admin` vs `customer`).
2. **E-Commerce API**: Read-only integration (`EcommerceApi.js`) handling product fetching, variant selection, inventory management, and checkout session initialization.
3. **Cart Management (`useCart`)**: React Context managing local storage cart state, quantities, and totals.
4. **Legal Complaint System**: A full SaaS flow allowing users to submit evidence, track case progress, communicate with admins, and receive generated PDF deliverables.
5. **AI Concierge (`ChatPage`)**: Integrates with a backend edge function to provide a conversational interface about the actor's life and services.
6. **Multi-Currency/Translation**: `CurrencyContext` and `TranslationContext` wrapping the app for localization.

---

## 6. DATA SOURCES & INTEGRATIONS

### Supabase Database Tables (Public Schema)
- `users` (Auth schema)
- `conversations` & `messages`: Client-admin chat system.
- `legal_complaint_intakes`: Stores user submitted case data.
- `case_deliverables`: Stores admin-generated case files and schemas.
- `brands`, `services`, `offers`, `partners`: Content management for Mimo's Collective.
- `orders`, `order_items`: Transaction tracking.
- `films`: Filmography data management.

### Storage Buckets
- `message-attachments`: User/Admin chat uploads.
- `case-deliverables`: Final PDF outputs for the legal service.

### External APIs
- **Hostinger E-commerce API**: Product catalog and checkout.
- **Stripe/PayPal**: Handled via Supabase Edge Functions (`create-stripe-checkout`, etc.).

---

## 7. INFORMATION ARCHITECTURE

- **SEO Context**: Every page utilizes `react-helmet-async` to inject localized `<title>`, `<meta name="description">`, and OpenGraph tags.
- **JSON-LD**: The `HomePage` injects `Person` schema. The `MediaPage` injects a list of `Movie` schemas.
- **Link Management**: A centralized `officialLinks.js` utility manages external URLs to ensure consistency across the site.

---

## 8. TECHNICAL STACK

- **Framework**: React 18.2.0
- **Build Tool**: Vite 4.4.5
- **Routing**: React Router DOM 6.16.0
- **Styling**: Tailwind CSS 3.3.3
- **Components**: Radix UI primitives wrapped by shadcn/ui.
- **Icons**: Lucide React 0.292.0
- **Animations**: Framer Motion 10.16.4
- **Backend/BaaS**: Supabase (PostgreSQL, Auth, Storage, Realtime, Edge Functions)

---

## 9. USER FLOWS

### 9.1 Legal Intake Flow
1. User lands on `/mimo-collective/legal-complaint-service`.
2. Clicks "Start Your Case" -> Prompts login if unauthenticated.
3. Enters `/legal-complaint-intake` (5 steps: Basic, Overview, Details, Evidence, Plan).
4. Submits -> Uploads files to storage -> Creates DB record -> Triggers Email.
5. Redirected to success page / dashboard.

### 9.2 E-commerce Checkout Flow
1. User browses `/mimo-collective/shop`.
2. Views product on `/product/:id`.
3. Selects variant, adds to cart (`useCart` context updates).
4. Opens `ShoppingCart` drawer.
5. Clicks Checkout -> Calls `initializeCheckout` -> Redirects to external payment gateway.
6. Returns to `/checkout-success` upon completion.

---

## 10. RESPONSIVE DESIGN

The site utilizes Tailwind's mobile-first breakpoint system:
- **Default (Mobile)**: Stacked layouts, hidden desktop nav, hamburger menu, simplified grids (1 column).
- **`md` (Tablet, >=768px)**: 2-column grids, introduction of side-by-side hero sections, visible bottom widgets.
- **`lg` (Desktop, >=1024px)**: 3/4-column grids, full top navigation, advanced hover states.
- **`xl` (Large Desktop, >=1280px)**: Max-width containers (`max-w-7xl`) ensure content doesn't stretch infinitely. 

All interactive elements (buttons, inputs) maintain a minimum touch target size (h-10 or 40px) for mobile accessibility.