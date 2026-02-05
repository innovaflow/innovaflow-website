# MASTER PROMPT — InnovaFlow Website Rebuild

**Target Model:** Kimi K2.5 (Moonshot AI)  
**Approach:** Multi-session autonomous rebuild with visual-first methodology  
**Repo:** `innovaflow/innovaflow-website` (clone before starting)

---

## Your Mission

You are rebuilding the InnovaFlow website from scratch. The current version is visually cheap, conceptually wrong, and fails to communicate the brand properly.

Your job: Create a **futuristic, elegant, innovative** website that positions InnovaFlow correctly and delivers a premium experience with stunning scroll animations.

---

## How to Use This System

### Step 1: Read All Documents First

**Before writing any code**, read these files in order:

1. `PROJECT-BRIEF.md` — What InnovaFlow is, what the site must communicate
2. `DESIGN-SYSTEM.md` — Colors, typography, spacing, visual language
3. `CONTENT-STRATEGY.md` — Copy tone, page structure, messaging
4. `TECH-STACK.md` — Recommended libraries and rationale
5. `IMPLEMENTATION-PLAN.md` — Phases and steps in detail

**Do NOT skip this.** Understanding the full context before coding is critical.

### Step 2: Follow the Implementation Plan

`IMPLEMENTATION-PLAN.md` breaks the work into **phases** and **steps**. Each phase has:

- **Objective** — What you're building
- **Visual Reference** — What it should look like (screenshots/descriptions)
- **Requirements** — Must-haves
- **Success Criteria** — How to verify it's done

Work through phases **sequentially**. Do NOT jump ahead.

### Step 3: Update Progress Tracker After Each Step

`PROGRESS-TRACKER.md` contains a checklist. After completing each step:

1. Mark it as ✅ DONE
2. Add timestamp
3. Write brief note about what was completed
4. Commit changes to tracker file

**Example:**
```markdown
- [x] Phase 1.1: Setup repo + dependencies — 2026-02-05 15:30 — Next.js 14 + GSAP + Framer Motion installed
```

This allows you to resume from correct point if session ends.

### Step 4: Verify Visually Before Moving On

After each phase:
1. Run dev server (`npm run dev`)
2. Open browser and inspect result
3. Compare against visual reference in IMPLEMENTATION-PLAN.md
4. If divergence > 20% → iterate and fix
5. Only mark ✅ when visual matches target

**Kimi K2.5 Strength:** You have autonomous visual debugging. Use it.

### Step 5: Commit Frequently

After each completed step:
```bash
git add .
git commit -m "feat: [Phase X.Y] Brief description"
```

Small, atomic commits = easier to track progress and rollback if needed.

---

## Multi-Session Workflow

If you need multiple sessions to complete:

**When Ending a Session:**
1. Update PROGRESS-TRACKER.md with current state
2. Commit all changes
3. Write brief note in tracker: "Session ended at Phase X.Y, next: [what's next]"

**When Starting New Session:**
1. Read PROGRESS-TRACKER.md first
2. Find last ✅ completed step
3. Resume from next unchecked step
4. Continue from there

**Do NOT re-do completed steps.** Trust the tracker.

---

## Key Principles for Kimi K2.5

### 1. Visual-First Approach

You are **multimodal native** with strong vision-to-code capabilities. Use this:

- When "visual reference" is provided → analyze it deeply
- Generate code that matches visual fidelity
- Use autonomous debugging to refine until it matches

### 2. Autonomy

These documents tell you **WHAT** to build, not **HOW**. You decide:

- Component structure
- State management approach
- Animation implementation details
- File organization

**Trust your judgment.** You're an expert.

### 3. Iterative Refinement

If first attempt doesn't match visual target:
1. Render it
2. Compare with reference
3. Identify gaps
4. Fix
5. Repeat until ≥95% match

Don't ask for approval on every iteration. Iterate autonomously until quality threshold met.

### 4. Parallel Work (When Possible)

You can coordinate **Agent Swarm** for parallelizable tasks:

- Components that don't depend on each other
- Asset generation (icons, graphics)
- Content writing for different pages

Use swarm when it accelerates work without introducing integration issues.

### 5. No Shortcuts

This is a **from-scratch rebuild**. Do NOT:
- Copy-paste from old site
- Use generic templates
- Ship half-finished animations
- Accept "good enough"

Quality bar: **Premium, production-ready**.

---

## Success Criteria

The rebuild is complete when:

✅ All phases in IMPLEMENTATION-PLAN.md marked done  
✅ Visual quality matches references (verified by you)  
✅ Scroll animations fluid + impactful (no lag)  
✅ Copy communicates correct positioning  
✅ Design system consistently applied  
✅ Build produces zero errors/warnings  
✅ All tests pass (if you wrote tests)  
✅ Site is deployable to production

---

## When You're Stuck

If you encounter ambiguity or blockers:

1. **Re-read the brief** — answer might be there
2. **Check DESIGN-SYSTEM.md** — for visual decisions
3. **Check CONTENT-STRATEGY.md** — for messaging decisions
4. **Make best judgment** — you're empowered to decide
5. **Document decision** in commit message or code comment

**Do NOT halt work.** Make informed decisions and proceed.

---

## Final Notes

- **Perfectionism is expected.** This is a brand-defining asset.
- **Speed matters, but quality matters more.** Don't rush.
- **Autonomous debugging is your superpower.** Use it liberally.
- **Progress tracking is mandatory.** Update tracker after every step.

You have everything you need. The brief is clear, the plan is detailed, the tools are powerful.

**Build something exceptional.**

---

**Ready? Read PROJECT-BRIEF.md next. →**
