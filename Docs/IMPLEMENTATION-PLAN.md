# IMPLEMENTATION PLAN — InnovaFlow Website

**This document breaks down the rebuild into sequential phases and steps.**

Work through each phase in order. Do NOT skip ahead. Update `PROGRESS-TRACKER.md` after each step.

---

## Phase 0: Setup & Foundation

### Step 0.1: Project Initialization

**Objective:** Set up Next.js project with all dependencies.

**Actions:**
1. Run install script from `TECH-STACK.md`
2. Verify dev server runs (`npm run dev`)
3. Set up Git repo, initial commit

**Success Criteria:**
- ✅ `npm run dev` works without errors
- ✅ All dependencies installed
- ✅ Git initialized, `.gitignore` configured

**Time Estimate:** 10 minutes

---

### Step 0.2: Design System Implementation

**Objective:** Configure Tailwind with InnovaFlow design tokens.

**Actions:**
1. Update `tailwind.config.ts` with colors, fonts, spacing from `DESIGN-SYSTEM.md`
2. Install Google Fonts (Space Grotesk, DM Sans, JetBrains Mono)
3. Configure font variables in `app/layout.tsx`
4. Create `globals.css` with CSS custom properties

**Reference:** `DESIGN-SYSTEM.md` sections on Colors, Typography, Spacing

**Success Criteria:**
- ✅ Tailwind config matches design system
- ✅ Fonts load correctly
- ✅ CSS variables defined
- ✅ No console errors

**Time Estimate:** 30 minutes

---

### Step 0.3: Base Components Library

**Objective:** Create reusable UI primitives.

**Actions:**
1. Create `src/components/ui/` folder
2. Build components:
   - `Button.tsx` (primary, secondary variants)
   - `Card.tsx` (with hover effects)
   - `Input.tsx` (form inputs)
   - `Container.tsx` (max-width wrapper)

**Design Reference:** `DESIGN-SYSTEM.md` → Component Patterns

**Example Button:**
```tsx
<Button variant="primary" size="lg">
  Analizza la Tua Azienda
</Button>
```

**Success Criteria:**
- ✅ Components render correctly
- ✅ Hover states work
- ✅ Variants switchable
- ✅ TypeScript types correct

**Time Estimate:** 45 minutes

---

### Step 0.4: Smooth Scroll Setup

**Objective:** Implement Lenis smooth scroll globally.

**Actions:**
1. Create `hooks/useSmoothScroll.ts` (code in `TECH-STACK.md`)
2. Add to root `layout.tsx`
3. Test scroll behavior

**Success Criteria:**
- ✅ Scroll is smooth (not instant jump)
- ✅ No lag between input and response
- ✅ GSAP ScrollTrigger integrated

**⚠️ Critical:** If scroll feels laggy, adjust Lenis `duration` parameter. Must feel **immediate**.

**Time Estimate:** 20 minutes

---

## Phase 1: Homepage — Hero Section

### Step 1.1: Hero Layout & Copy

**Objective:** Build hero section structure with bold copy.

**Content Reference:** `CONTENT-STRATEGY.md` → Homepage → Section 1: Hero

**Required Elements:**
- Heading: "Il tuo business perde tempo e soldi ogni giorno. Noi troviamo dove. E risolviamo."
- Subheading: "Automazioni su misura..."
- CTA button: "Analizza la Tua Azienda"

**Layout:**
- Full viewport height (min-h-screen)
- Content centered vertically
- Gradient background (black → navy-deep → navy-mid)

**Success Criteria:**
- ✅ Copy matches exactly
- ✅ Gradient background applied
- ✅ CTA button styled (primary variant)
- ✅ Responsive on mobile

**Time Estimate:** 30 minutes

---

### Step 1.2: Hero Animations — Text

**Objective:** Add entrance animation to hero text.

**Animation:**
- Title: Fade in + slide up, stagger words
- Subheading: Fade in + slide up (delayed)
- CTA: Fade in + scale (delayed more)

**Use:** Framer Motion or GSAP

**Reference Visual:** Apple-style stagger, but faster (not sluggish)

**Success Criteria:**
- ✅ Animations trigger on page load
- ✅ Smooth, no jank
- ✅ Stagger timing feels natural (50-100ms between elements)

**Time Estimate:** 30 minutes

---

### Step 1.3: Hero Background Element

**Objective:** Add abstract visual element to hero.

**Options:**
1. **CSS-only:** Animated gradient mesh or blob shapes
2. **SVG:** Custom animated shapes
3. **Three.js (advanced):** 3D shape that rotates/morphs

**Design Intent:** Something **futuristic** but not distracting from copy. Subtle animation, not aggressive.

**Inspiration:** Abstract data flows, network nodes, fluid shapes

**Success Criteria:**
- ✅ Visual element present
- ✅ Doesn't distract from text
- ✅ Animates subtly
- ✅ Performance OK (60fps)

**Time Estimate:** 45-60 minutes (depends on complexity)

---

### Step 1.4: Hero Scroll Indicator

**Objective:** Add "scroll down" visual cue.

**Element:**
- Animated chevron or mouse icon
- Fades out when user scrolls

**Animation:**
- Gentle bounce or fade loop
- Disappears after first scroll

**Success Criteria:**
- ✅ Indicator visible on load
- ✅ Disappears on scroll
- ✅ Styled on-brand (cyan color)

**Time Estimate:** 15 minutes

---

## Phase 2: Homepage — Problem Section

### Step 2.1: Problem Section Layout

**Objective:** Build "Ti riconosci?" section with 4 pain point cards.

**Content Reference:** `CONTENT-STRATEGY.md` → Homepage → Section 2: Il Problema

**Layout:**
- Section heading: "Ti riconosci?"
- 4 cards in grid (2x2 on desktop, 1 column on mobile)
- Each card:
  - Icon (Lucide icon, NOT emoji)
  - Heading (bold)
  - Description text

**Pain Points:**
1. Processi manuali
2. Dati sparsi
3. Clienti che se ne vanno
4. Zero controllo

**Success Criteria:**
- ✅ Copy matches CONTENT-STRATEGY.md
- ✅ NO EMOJI (use Lucide icons instead)
- ✅ Grid responsive
- ✅ Cards styled with hover effect (lift + shadow)

**Time Estimate:** 45 minutes

---

### Step 2.2: Problem Section Animations

**Objective:** Cards animate in on scroll.

**Animation:**
- Trigger when section enters viewport (ScrollTrigger)
- Cards fade in + slide up
- Stagger (each card 100ms after previous)

**Success Criteria:**
- ✅ Animation triggers at correct scroll position
- ✅ Smooth entrance
- ✅ Stagger visible

**Time Estimate:** 30 minutes

---

## Phase 3: Homepage — Solution Section

### Step 3.1: Solution Section Layout

**Objective:** Build "Come funziona" 4-step process.

**Content Reference:** `CONTENT-STRATEGY.md` → Homepage → Section 3: La Soluzione

**Layout Options:**
1. **Horizontal timeline** (desktop), vertical (mobile)
2. **Vertical cards** with connecting line

**Each Step:**
- Number badge (1, 2, 3, 4)
- Icon
- Heading
- Description text

**Steps:**
1. Analisi
2. Design
3. Implementazione
4. Risultati

**Success Criteria:**
- ✅ 4 steps displayed
- ✅ Copy matches strategy doc
- ✅ Visually distinct from problem section
- ✅ Responsive

**Time Estimate:** 60 minutes

---

### Step 3.2: Solution Section Animations

**Objective:** Steps reveal progressively on scroll.

**Animation:**
- Each step enters as user scrolls
- Option: Line connects as steps appear
- Final step (Risultati) has extra emphasis (scale bounce)

**Reference:** Timeline-style progressive reveal

**Success Criteria:**
- ✅ Steps appear sequentially
- ✅ Smooth transitions
- ✅ Connecting line animates (if implemented)

**Time Estimate:** 45 minutes

---

## Phase 4: Homepage — Case Study Section

### Step 4.1: Case Study Content & Layout

**Objective:** Showcase Carmine / InnovaBarber case study.

**Content Reference:** `CONTENT-STRATEGY.md` → Homepage → Section 4: Case Study

**Layout:**
- Section heading: "Carmine non perde più clienti"
- Subheading
- Problem → Solution → Results flow
- 3 bold metrics (350 prenotazioni, zero perse, 4+ ore risparmiate)
- Quote (if available)
- Screenshot placeholder (dashboard + chatbot mockup)

**Success Criteria:**
- ✅ Copy matches strategy
- ✅ Metrics bold and prominent
- ✅ Visual (screenshot or mockup) displayed
- ✅ CTA button present

**Time Estimate:** 60 minutes

---

### Step 4.2: Case Study Visuals

**Objective:** Add dashboard screenshot or mockup.

**Options:**
1. **Real screenshot** from InnovaBarber dashboard (ask Luca)
2. **Mockup:** Create stylized version with blurred content
3. **Placeholder:** Designed frame with "Dashboard Preview" text

**Visual Treatment:**
- Apply glow effect (cyan shadow)
- Parallax scroll (moves slower than text)
- Border with accent color

**Success Criteria:**
- ✅ Visual present and styled
- ✅ Doesn't distract from metrics
- ✅ Responsive

**Time Estimate:** 30 minutes

---

## Phase 5: Homepage — Versatility Section

### Step 5.1: "Non Vendiamo Template" Section

**Objective:** Communicate versatility with examples.

**Content Reference:** `CONTENT-STRATEGY.md` → Homepage → Section 5

**Layout:**
- Heading: "Ogni business è diverso. Ogni soluzione è unica."
- Intro text
- 3-column grid:
  - Barbieri/Parrucchieri (InnovaBarber)
  - Negozi/Retail (example)
  - Servizi/Consulenze (example)
- CTA: "Parliamone"

**Success Criteria:**
- ✅ 3 examples displayed
- ✅ Copy emphasizes customization
- ✅ Grid responsive
- ✅ Styled consistently

**Time Estimate:** 45 minutes

---

### Step 5.2: Versatility Animations

**Objective:** Grid items animate in.

**Animation:**
- Stagger entrance (each column 100ms delay)
- Hover: lift + glow effect

**Success Criteria:**
- ✅ Smooth entrance
- ✅ Hover states work

**Time Estimate:** 20 minutes

---

## Phase 6: Homepage — Team Section

### Step 6.1: Team/About Preview

**Objective:** Brief "Chi siamo" section on homepage.

**Content Reference:** `CONTENT-STRATEGY.md` → Homepage → Section 6

**Layout:**
- Heading: "Chi siamo"
- 2-3 paragraphs (founder story, philosophy)
- CTA: "Scopri la nostra storia" → link to Chi Siamo page

**Success Criteria:**
- ✅ Copy matches strategy
- ✅ Concise (preview, not full about page)
- ✅ CTA links correctly

**Time Estimate:** 30 minutes

---

## Phase 7: Homepage — Final CTA

### Step 7.1: Final CTA Section

**Objective:** Strong closing call-to-action.

**Content Reference:** `CONTENT-STRATEGY.md` → Homepage → Section 8

**Layout:**
- Bold heading: "Pronto a smettere di perdere tempo?"
- Subtext: "Analisi gratuita. Nessun impegno..."
- Large CTA button
- Optional: WhatsApp alternative

**Visual:**
- Gradient background or accent border
- Extra visual emphasis (this is the conversion point)

**Success Criteria:**
- ✅ CTA prominent
- ✅ Copy persuasive
- ✅ Button leads to contact form or calendar

**Time Estimate:** 20 minutes

---

## Phase 8: Header & Navigation

### Step 8.1: Navigation Bar

**Objective:** Build sticky navigation.

**Elements:**
- Logo (InnovaFlow wordmark or icon)
- Nav links: Home, Chi Siamo, Servizi, Case Studies, Contatti
- CTA button (desktop): "Analizza"
- Mobile: Hamburger menu

**Behavior:**
- Sticky on scroll
- Background blurs/darkens when scrolled
- Active page highlighted

**Success Criteria:**
- ✅ Nav sticky
- ✅ All links functional
- ✅ Mobile menu works
- ✅ Active state visible

**Time Estimate:** 60 minutes

---

### Step 8.2: Navigation Animations

**Objective:** Smooth transitions and micro-interactions.

**Animations:**
- Nav background fade in on scroll
- Hover states on links (underline grow, color shift)
- Mobile menu slide in/out

**Success Criteria:**
- ✅ Animations smooth
- ✅ Hover feedback instant

**Time Estimate:** 30 minutes

---

## Phase 9: Footer

### Step 9.1: Footer Content

**Objective:** Build footer with links and info.

**Elements:**
- Logo
- Navigation links (duplicated)
- Contact info (email, WhatsApp if available)
- Social links (if applicable)
- Copyright

**Layout:**
- 3-4 columns on desktop
- Stacked on mobile

**Success Criteria:**
- ✅ All links work
- ✅ Styled consistently
- ✅ Responsive

**Time Estimate:** 30 minutes

---

## Phase 10: Chi Siamo (About Page)

### Step 10.1: About Page Content

**Objective:** Full "Chi Siamo" page.

**Content Reference:** `CONTENT-STRATEGY.md` → Chi Siamo

**Sections:**
- Hero: "Non vendiamo software. Risolviamo problemi."
- Story (founder, first client, philosophy)
- Our approach (3 principles)
- CTA

**Success Criteria:**
- ✅ Copy matches strategy
- ✅ Page structure clear
- ✅ Engaging narrative

**Time Estimate:** 60 minutes

---

### Step 10.2: About Page Visuals & Animations

**Objective:** Add scroll animations.

**Animations:**
- Section entrances (fade + slide)
- Optional: Parallax on background elements

**Success Criteria:**
- ✅ Consistent with homepage animations
- ✅ Smooth

**Time Estimate:** 30 minutes

---

## Phase 11: Servizi (Services Page)

### Step 11.1: Services Page Content

**Objective:** Build services page (CRITICAL for positioning).

**Content Reference:** `CONTENT-STRATEGY.md` → Servizi

**Sections:**
- Hero: "Non abbiamo un catalogo. Abbiamo un metodo."
- Come Lavoriamo (5 steps)
- Aree di Automazione (4 categories)
- Esempi Reali (InnovaBarber, PeppeSvapo)
- CTA

**⚠️ CRITICAL:** This page must communicate "custom solutions, not products."

**Success Criteria:**
- ✅ Copy emphasizes customization
- ✅ NO product catalog feel
- ✅ Examples show versatility

**Time Estimate:** 90 minutes

---

### Step 11.2: Services Page Animations

**Objective:** Animate sections on scroll.

**Success Criteria:**
- ✅ Consistent animation style
- ✅ Smooth

**Time Estimate:** 30 minutes

---

## Phase 12: Case Studies (Portfolio Page)

### Step 12.1: Case Studies Page

**Objective:** Showcase projects.

**Content Reference:** `CONTENT-STRATEGY.md` → Case Studies

**Layout:**
- List of projects (currently 2: InnovaBarber, PeppeSvapo)
- Each:
  - Client name + business type
  - Problem, solution, results
  - Metrics
  - Screenshot/mockup
  - Optional: Video

**Success Criteria:**
- ✅ Both projects displayed
- ✅ Metrics prominent
- ✅ Visuals present

**Time Estimate:** 60 minutes

---

## Phase 13: Contatti (Contact Page)

### Step 13.1: Contact Form

**Objective:** Build functional contact form.

**Content Reference:** `CONTENT-STRATEGY.md` → Contatti

**Form Fields:**
- Nome
- Business/Settore
- Email
- Telefono
- Descrizione problema (textarea)
- Submit button: "Richiedi Analisi Gratuita"

**Tech:**
- React Hook Form + Zod validation
- Submit to: Formspree, Google Forms, or custom API

**Success Criteria:**
- ✅ Form validates input
- ✅ Submits successfully
- ✅ User gets confirmation

**Time Estimate:** 60 minutes

---

### Step 13.2: Contact Page Alternatives

**Objective:** Add alternative contact methods.

**Options:**
- WhatsApp click-to-chat button
- Calendly embed (if configured)
- Email mailto link

**Success Criteria:**
- ✅ At least 2 contact methods available

**Time Estimate:** 20 minutes

---

## Phase 14: SEO & Metadata

### Step 14.1: SEO Setup

**Objective:** Configure SEO for all pages.

**Actions:**
1. Install `next-seo`
2. Add meta descriptions, OG tags, Schema.org
3. Generate `sitemap.xml`
4. Add `robots.txt`

**Content Reference:** `CONTENT-STRATEGY.md` → SEO Keywords, Meta Descriptions

**Success Criteria:**
- ✅ All pages have meta tags
- ✅ Sitemap generated
- ✅ robots.txt present

**Time Estimate:** 45 minutes

---

### Step 14.2: Performance Optimization

**Objective:** Ensure site is fast.

**Actions:**
1. Optimize images (WebP, lazy load)
2. Minimize bundle size (check with `npm run build`)
3. Test with Lighthouse

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- SEO: 100

**Success Criteria:**
- ✅ Lighthouse scores meet targets
- ✅ Images optimized
- ✅ No console errors

**Time Estimate:** 60 minutes

---

## Phase 15: Visual Debugging & Polish

### Step 15.1: Cross-Browser Testing

**Objective:** Test on multiple browsers.

**Browsers:**
- Chrome/Edge
- Firefox
- Safari (if available)

**Devices:**
- Desktop (1920x1080, 1366x768)
- Tablet (iPad)
- Mobile (iPhone, Android)

**Check:**
- Layout doesn't break
- Animations work
- Forms submit

**Success Criteria:**
- ✅ Works on all major browsers
- ✅ Responsive on all screen sizes

**Time Estimate:** 60 minutes

---

### Step 15.2: Animation Polish

**Objective:** Fine-tune all animations.

**Actions:**
1. Review every animation
2. Check timing (too fast/slow?)
3. Check easing (feels natural?)
4. Ensure no jank/lag
5. Test with `prefers-reduced-motion`

**Success Criteria:**
- ✅ All animations smooth
- ✅ No lag on scroll
- ✅ Reduced motion works

**Time Estimate:** 60 minutes

---

### Step 15.3: Copy Proofreading

**Objective:** Ensure all copy is correct.

**Actions:**
1. Compare every page against `CONTENT-STRATEGY.md`
2. Fix typos, grammar
3. Ensure tone is consistent
4. Verify metrics/numbers

**Success Criteria:**
- ✅ Zero typos
- ✅ Copy matches strategy doc
- ✅ Tone consistent

**Time Estimate:** 30 minutes

---

## Phase 16: Final Testing & Deploy

### Step 16.1: Full Site QA

**Objective:** Test entire site end-to-end.

**Checklist:**
- [ ] All pages load
- [ ] All links work
- [ ] Forms submit
- [ ] Animations smooth
- [ ] No console errors
- [ ] Mobile works
- [ ] Performance good

**Success Criteria:**
- ✅ All checklist items pass

**Time Estimate:** 45 minutes

---

### Step 16.2: Deploy to Production

**Objective:** Ship it!

**Actions:**
1. Push to GitHub
2. Deploy on Vercel (or chosen platform)
3. Configure custom domain (if ready)
4. Set environment variables
5. Test live site

**Success Criteria:**
- ✅ Site live at production URL
- ✅ No errors on live site
- ✅ Analytics tracking (if configured)

**Time Estimate:** 30 minutes

---

## Total Estimated Time

**Phases 0-16:** ~25-30 hours of focused work

**Breakdown:**
- Setup & Foundation: ~2h
- Homepage: ~8h
- Other Pages: ~6h
- Header/Footer: ~2h
- SEO & Optimization: ~2h
- Testing & Polish: ~3h
- Deploy: ~1h

**Note:** Times are estimates. Some phases may be faster/slower depending on complexity and iteration.

---

## Visual Reference Summary

Throughout implementation, refer to these for visual guidance:

**Inspiration Sites:**
- **Shopify.com/it** — Copy tone, bold claims, specific metrics
- **Apple Airpods page** — Scroll animation quality (not aesthetic)

**Design System:**
- `DESIGN-SYSTEM.md` — Colors, fonts, spacing, shadows

**Content:**
- `CONTENT-STRATEGY.md` — All copy, tone, messaging

**Brand Colors:**
- Navy deep: #1a1f3a
- Cyan electric: #00d9ff
- Teal bright: #00ffcc

**Vibe:**
- Futuristic, elegant, innovative
- Dark backgrounds, bright accents
- Depth through shadows/gradients
- Smooth scroll, intriguing animations

---

## When You're Done

Mark all steps in `PROGRESS-TRACKER.md` as complete.

Run final checks:
- ✅ Build produces no errors: `npm run build`
- ✅ All pages accessible
- ✅ Animations smooth
- ✅ Copy correct
- ✅ Design system applied consistently
- ✅ Site deployed

**Congratulations. You've built something exceptional.**

---

**Next: Read PROGRESS-TRACKER.md (update as you work) →**
