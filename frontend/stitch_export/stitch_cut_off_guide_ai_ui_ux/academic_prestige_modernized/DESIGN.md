---
name: Academic Prestige Modernized
colors:
  surface: '#faf9f6'
  surface-dim: '#dbdad7'
  surface-bright: '#faf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f0'
  surface-container: '#efeeeb'
  surface-container-high: '#e9e8e5'
  surface-container-highest: '#e3e2df'
  on-surface: '#1a1c1a'
  on-surface-variant: '#5a4136'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f2f1ee'
  outline: '#8e7164'
  outline-variant: '#e2bfb0'
  surface-tint: '#a04100'
  primary: '#a04100'
  on-primary: '#ffffff'
  primary-container: '#ff6b00'
  on-primary-container: '#572000'
  inverse-primary: '#ffb693'
  secondary: '#9e4300'
  on-secondary: '#ffffff'
  secondary-container: '#ff7518'
  on-secondary-container: '#5c2400'
  tertiary: '#525e7d'
  on-tertiary: '#ffffff'
  tertiary-container: '#8c99bb'
  on-tertiary-container: '#24314e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcc'
  primary-fixed-dim: '#ffb693'
  on-primary-fixed: '#351000'
  on-primary-fixed-variant: '#7a3000'
  secondary-fixed: '#ffdbcb'
  secondary-fixed-dim: '#ffb691'
  on-secondary-fixed: '#341100'
  on-secondary-fixed-variant: '#783100'
  tertiary-fixed: '#d9e2ff'
  tertiary-fixed-dim: '#b9c6ea'
  on-tertiary-fixed: '#0d1b36'
  on-tertiary-fixed-variant: '#3a4664'
  background: '#faf9f6'
  on-background: '#1a1c1a'
  surface-variant: '#e3e2df'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  section-padding: 80px
  stack-gap: 16px
---

## Brand & Style

This design system bridges the gap between the established authority of elite higher education and the cutting-edge efficiency of artificial intelligence. The aesthetic is **Modern Minimalist** with a **Premium Academic** lean—prioritizing clarity, high-end white space, and a sense of calm reliability.

The target audience consists of ambitious students and parents seeking clarity in high-stakes environments. The UI should evoke a sense of "Organized Intelligence"—where every pixel feels intentional and data feels accessible rather than overwhelming. We avoid cluttered "dashboard" tropes in favor of a clean, editorial layout that mimics high-quality academic journals reimagined for a digital-first era.

## Colors

The palette is anchored by a vibrant "Intellectual Orange" that commands attention without feeling aggressive. The background uses a soft cream (#F8F7F4) to reduce eye strain and provide a "paper-like" premium feel compared to sterile pure white.

- **Primary & Secondary:** Used for high-priority actions, predictive highlights, and critical success states.
- **Deep Navy (#14213D):** Reserved for primary text and navigation headers to ensure maximum contrast and an authoritative tone.
- **Accents:** The Light Lavender (#F1EDFF) is used exclusively for AI-driven features and "prediction" backgrounds, distinguishing machine-learning insights from static data.

## Typography

We use **Hanken Grotesk** for headlines to provide a sharp, contemporary "startup" feel that maintains professional weight. **Inter** handles all body and functional text for its industry-leading legibility and neutral tone.

Maintain a strict vertical rhythm. Large display sizes should use tighter letter spacing to feel more cohesive. All labels and overlines should use the `label-sm` style with increased tracking to create a sophisticated, curated look.

## Layout & Spacing

The design system employs a **Fluid Grid** with generous margins to enforce the "Spacious" brand pillar. On desktop, we utilize a 12-column grid with a 1280px max-width container. 

- **Vertical Rhythm:** Use increments of 8px for all internal component spacing.
- **Sectioning:** Large sections are separated by 80px or more to allow the content to "breathe."
- **Mobile:** Transition to a 4-column grid with 16px margins. Horizontal scrolling is preferred for "College Cards" on mobile to keep the vertical scan clear for information hierarchy.

## Elevation & Depth

We utilize **Ambient Shadows** to create a soft, tactile hierarchy. Shadows should never be pure black; instead, use the Deep Navy (#14213D) at very low opacities (2-5%) to ensure the shadows feel integrated with the background.

- **Low Elevation:** Used for standard cards. 4px Y-offset, 12px Blur, 3% Opacity.
- **High Elevation:** Used for AI Assistant bubbles and floating action buttons. 12px Y-offset, 24px Blur, 6% Opacity.
- **Glassmorphism:** Apply a subtle `backdrop-filter: blur(10px)` to the Top Navbar when scrolling to maintain context of the underlying content while emphasizing the fixed navigation.

## Shapes

The design system uses a **Rounded** language. 
- Standard UI elements (Buttons, Inputs) use `0.5rem`.
- Large Cards (College & Prediction cards) use `rounded-xl` (`1.5rem`) to create a friendlier, modern profile.
- AI Assistant bubbles utilize an asymmetrical radius (e.g., three corners at `1.5rem` and the bottom-left at `0.25rem`) to distinguish human-to-AI interaction.

## Components

### Navigation
- **Navbar:** Sticky, white surface with a thin `1px` border bottom in cream (#F1EDFF). Use high-contrast navy for links.
- **Sidebar:** For authenticated "Student Portals," use a clean sidebar with active states indicated by a thick 4px left-border in Primary Orange.

### Cards
- **College Card:** White surface, `rounded-xl`, with a subtle Navy shadow. Include a top-right "Match" percentage chip using the Lavender accent.
- **Stat Card:** Background-less with a 1px solid Navy-10% border. Focus on a single large display-font number.

### Forms
- **Search:** Oversized (height: 56px) with a prominent search icon. Use the cream background (#F8F7F4) for the input field to make it feel integrated.
- **OTP/Inputs:** Individual boxes for OTP should use a 2px bottom-border focus state in Primary Orange.

### Buttons
- **Primary:** Solid Primary Orange (#FF6B00) with white text. High-contrast, no gradient.
- **Ghost/Outline:** 1px border of Navy-20% with Navy text. On hover, transition to a very light Cream (#FFF3E8) background.

### AI Assistant & Charts
- **Charts:** Use a refined "Monotone Plus" approach. Primary Orange for data lines, with Lavender for "Projected" or "AI Predicted" zones.
- **Bubbles:** AI responses are housed in Lavender (#F1EDFF) bubbles with a small "Sparkle" icon to denote machine generation.