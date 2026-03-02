# -*- coding: utf-8 -*-
"""
V7-READABLE: Hacker aesthetics + maximum human readability
Design system:
  - CHROME  (decorators, labels, borders, icons) = green family  #00ff41, rgba(0,255,65,...)
  - HEADINGS (h2, h3, card titles)               = bright white  #f0f8f0
  - BODY TEXT (p, li, details)                   = warm off-white #d4ddd4  (no green tint)
  - SECONDARY (muted labels, meta)               = light grey    #8a9a8a
  - ACCENT    (links, highlights)                = cyan/green    #5fffb8
  - DANGER    = red #ff6b6b  WARN = amber #fbbf24
"""
import subprocess, os
BASE = "/Users/anshumaan.singh/Downloads/anshumaan-10.github.io"
css_path = os.path.join(BASE, "styles.css")

css = r"""

/* ═══════════════════════════════════════════════════════════
   HACKER-READABLE V8 — Best of both worlds
   Green chrome  +  Human-readable body text
   Design tokens:
     --r-head:   #eef5ee   (headings)
     --r-body:   #c9d5c9   (body paragraphs)
     --r-soft:   #8a9a8a   (secondary / muted)
     --r-accent: #5fffb8   (links / highlights)
     --r-green:  #00ff41   (chrome only)
     --r-bg:     #060e09   (slightly less pure-black, easier on eyes)
   ═══════════════════════════════════════════════════════════ */

/* ── ROOT READABLE TOKENS ── */
[data-theme='dark'] {
  --r-head:   #eef5ee;
  --r-body:   #c9d5c9;
  --r-soft:   #8a9a8a;
  --r-accent: #5fffb8;
  --r-green:  #00ff41;
  --r-bg:     #060e09;
  --r-surface: rgba(8,18,10,.85);
  --r-border:  rgba(0,200,50,.12);
  --r-border-hot: rgba(0,255,65,.35);
}

/* ── BODY: warmer dark background, not pure black (reduces eye strain) ── */
[data-theme='dark'] body {
  background: var(--r-bg) !important;
  color: var(--r-body) !important;
}

/* ── HEADINGS: bright near-white (not green) for fast scanning ── */
[data-theme='dark'] h1 { color: #ffffff !important; }
[data-theme='dark'] h2 { color: var(--r-head) !important; }
[data-theme='dark'] h3 { color: var(--r-head) !important; }
[data-theme='dark'] h4, [data-theme='dark'] h5 { color: #d0e8d0 !important; }

/* ── BODY TEXT: off-white, NOT green tinted, comfortable contrast ratio ── */
[data-theme='dark'] p {
  color: var(--r-body) !important;
  line-height: 1.78 !important;
}

/* ── LIST ITEMS: same readable off-white as paragraphs ── */
[data-theme='dark'] li {
  color: var(--r-body) !important;
  line-height: 1.72 !important;
}
[data-theme='dark'] .xp-block li {
  color: #b8cdb8 !important;
}
[data-theme='dark'] .xp-block li::before {
  content: '→' !important;
  color: rgba(0,255,65,.4) !important;
  margin-right: 8px !important;
}

/* ── MUTED / SECONDARY: grey, not green-grey, for meta info ── */
[data-theme='dark'] .muted,
[data-theme='dark'] p.muted,
[data-theme='dark'] .mono.muted {
  color: var(--r-soft) !important;
}

/* ── STRONG / BOLD inside paragraphs: white for emphasis ── */
[data-theme='dark'] strong {
  color: #eef5ee !important;
  font-weight: 600 !important;
}

/* ── CARD TITLES: white, readable, scannable ── */
[data-theme='dark'] .case-title,
[data-theme='dark'] .proj-title,
[data-theme='dark'] .pub-title,
[data-theme='dark'] .ach-title,
[data-theme='dark'] .phil-title,
[data-theme='dark'] .cert-name,
[data-theme='dark'] .edu-name,
[data-theme='dark'] .edu-name a,
[data-theme='dark'] .tl-role,
[data-theme='dark'] .xp-title,
[data-theme='dark'] .sg-title,
[data-theme='dark'] .cc-name,
[data-theme='dark'] .cc-handle,
[data-theme='dark'] .profile-name { color: var(--r-head) !important; }

/* ── CARD BODY TEXT: readable grey-white, NOT green ── */
[data-theme='dark'] .case-body,
[data-theme='dark'] .proj-body,
[data-theme='dark'] .pub-excerpt,
[data-theme='dark'] .ach-body,
[data-theme='dark'] .phil-body,
[data-theme='dark'] .faq-a,
[data-theme='dark'] .tl-scope p,
[data-theme='dark'] .edu-degree { color: var(--r-body) !important; }

/* ── SECONDARY META TEXT: grey for dates, roles, labels ── */
[data-theme='dark'] .tl-meta,
[data-theme='dark'] .pub-meta,
[data-theme='dark'] .cert-issuer,
[data-theme='dark'] .edu-meta,
[data-theme='dark'] .cc-platform,
[data-theme='dark'] .profile-role,
[data-theme='dark'] .profile-company { color: var(--r-soft) !important; }

/* ── COMPANY NAME: slightly elevated, soft teal-white ── */
[data-theme='dark'] .tl-company {
  color: #a8e6c8 !important;
  font-weight: 700 !important;
  text-shadow: none !important;
}

/* ── FAQ QUESTIONS: white for quick scanning ── */
[data-theme='dark'] .faq-q { color: var(--r-head) !important; }
[data-theme='dark'] .faq-a { color: var(--r-body) !important; font-size: .88rem !important; }

/* ── H2 PROMPT (cmd decorators stay green) ── */
[data-theme='dark'] .h2-prompt {
  color: rgba(0,255,65,.35) !important;
  font-size: .65rem !important;
}

/* ── PHILOSOPHY: nums green, body readable ── */
[data-theme='dark'] .phil-num {
  background: linear-gradient(135deg, #00ff41, #00cc35) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  background-clip: text !important;
}
[data-theme='dark'] .phil-title { color: var(--r-head) !important; font-weight: 600 !important; }
[data-theme='dark'] .phil-body  { color: var(--r-body) !important; font-size: .87rem !important; }

/* ── IMPACT BANNER: nums bright green, labels soft grey ── */
[data-theme='dark'] .impact-label {
  color: var(--r-soft) !important;
  font-size: .6rem !important;
  letter-spacing: .12em !important;
}
[data-theme='dark'] .impact-sub {
  color: #98b898 !important;
  font-size: .78rem !important;
}

/* ── KPI: values bright green, labels grey ── */
[data-theme='dark'] .kpi-label {
  color: var(--r-soft) !important;
  font-size: .6rem !important;
  letter-spacing: .1em !important;
}

/* ── SKILL TAGS: readable accent, not neon green ── */
[data-theme='dark'] .stag {
  color: #a8c8b0 !important;
  background: rgba(0,200,80,.06) !important;
  border-color: rgba(0,200,80,.15) !important;
}
[data-theme='dark'] .stag:hover {
  color: var(--r-head) !important;
  background: rgba(0,255,65,.1) !important;
}

/* ── SKILL BAR LABELS: readable ── */
[data-theme='dark'] .sb-label { color: var(--r-body) !important; font-size: .78rem !important; }
[data-theme='dark'] .sb-pct   { color: rgba(0,255,65,.7) !important; font-size: .72rem !important; }

/* ── NAV LINKS: dimmer green for unchecked, white for active ── */
[data-theme='dark'] .nav-link {
  color: rgba(160,200,160,.55) !important;
}
[data-theme='dark'] .nav-link::before { content: '' !important; } /* remove ./ prefix for cleaner nav */
[data-theme='dark'] .nav-link:hover { color: var(--r-head) !important; }
[data-theme='dark'] .nav-link.active { color: var(--r-green) !important; }

/* ── BRAND ── */
[data-theme='dark'] .brand-name { color: var(--r-head) !important; }
[data-theme='dark'] .brand-role { color: rgba(0,255,65,.4) !important; }

/* ── TOPBAR: very subtle dark, not solid black ── */
[data-theme='dark'] .topbar {
  background: rgba(6,14,9,.94) !important;
  border-bottom: 1px solid rgba(0,200,50,.12) !important;
}

/* ── SECTIONS: slightly less pure-black ── */
[data-theme='dark'] section.glass,
[data-theme='dark'] .glass {
  background: rgba(8,16,10,.62) !important;
  border: 1px solid rgba(0,200,50,.1) !important;
}

/* ── CARDS: give readable contrast ── */
[data-theme='dark'] .card,
[data-theme='dark'] .phil-card,
[data-theme='dark'] .case-card,
[data-theme='dark'] .cert-card,
[data-theme='dark'] .edu-card,
[data-theme='dark'] .edu-item,
[data-theme='dark'] .ach-card,
[data-theme='dark'] .pub-card,
[data-theme='dark'] .pub-card--wide,
[data-theme='dark'] .skill-group,
[data-theme='dark'] .connect-card,
[data-theme='dark'] .faq-item,
[data-theme='dark'] .timeline-item,
[data-theme='dark'] .xp-block {
  background: rgba(10,20,12,.78) !important;
  border: 1px solid rgba(0,200,50,.1) !important;
}

[data-theme='dark'] .card:hover,
[data-theme='dark'] .phil-card:hover,
[data-theme='dark'] .case-card:hover,
[data-theme='dark'] .cert-card:hover,
[data-theme='dark'] .skill-group:hover,
[data-theme='dark'] .connect-card:hover {
  border-color: rgba(0,255,65,.25) !important;
}

/* ── WHOAMI BLOCK: readable field/val ── */
[data-theme='dark'] .wb-field {
  color: rgba(0,255,65,.45) !important;  /* green for field labels (chrome) */
}
[data-theme='dark'] .wb-val {
  color: var(--r-body) !important;  /* off-white for values (content) */
}
[data-theme='dark'] .wb-ok { color: #00ff88 !important; }  /* green for status */

/* ── ABOUT MANIFESTO ── */
[data-theme='dark'] .about-manifesto {
  color: var(--r-body) !important;
  font-size: 1rem !important;
  line-height: 1.82 !important;
  border-left: 2px solid rgba(0,255,65,.2) !important;
  padding-left: 18px !important;
}

/* ── QUOTE BLOCK ── */
[data-theme='dark'] .quote-block,
[data-theme='dark'] .v7-quote {
  color: #98b898 !important;
  border-left-color: rgba(0,255,65,.25) !important;
}

/* ── EXPERIENCE BULLETS ── */
[data-theme='dark'] .xp-block li {
  color: #b8cdb8 !important;
  font-size: .855rem !important;
}

/* ── GITLOG entries ── */
[data-theme='dark'] .gl-msg { color: #a8bfa8 !important; }
[data-theme='dark'] .gl-cmd { color: rgba(0,255,65,.45) !important; }

/* ── LIVE FEED entries ── */
[data-theme='dark'] .ll-entry { color: #98b498 !important; }
[data-theme='dark'] .ll-entry.ll-ok  { color: #98bfa8 !important; }
[data-theme='dark'] .ll-entry.ll-warn { color: #c8a86a !important; }

/* ── TERMINAL lines ── */
[data-theme='dark'] .term-info {
  color: #98b898 !important;
}
[data-theme='dark'] .lt-line { color: #98b898 !important; }
[data-theme='dark'] .lt-out  { color: rgba(150,190,150,.65) !important; }

/* ── CASE STUDIES body ── */
[data-theme='dark'] .case-body { color: var(--r-body) !important; }

/* ── SECTION DIVIDER TEXT ── */
[data-theme='dark'] .sdc-text {
  color: rgba(0,255,65,.32) !important;
  font-size: .67rem !important;
}
[data-theme='dark'] .sdc-line {
  background: linear-gradient(90deg, transparent, rgba(0,255,65,.12), transparent) !important;
}

/* ── CMD-OUT blocks: same soft green ── */
[data-theme='dark'] .cmd-out {
  color: rgba(0,220,100,.5) !important;
  background: rgba(0,14,6,.7) !important;
  border-left-color: rgba(0,255,65,.28) !important;
}
[data-theme='dark'] .co-verified { color: rgba(0,220,100,.38) !important; }

/* ── ACCESS NODE: chrome, stays green ── */
[data-theme='dark'] .an-node { color: rgba(0,255,65,.5) !important; }
[data-theme='dark'] .an-status { color: #fbbf24 !important; }
[data-theme='dark'] .an-ok { color: #00ff41 !important; }

/* ── HERO QUOTE / typing ── */
[data-theme='dark'] .hero-lead {
  color: #b8ccb8 !important;
  font-size: 1.05rem !important;
  line-height: 1.75 !important;
}

/* ── HERO GREETING ── */
[data-theme='dark'] .hero-greeting {
  color: rgba(0,255,65,.7) !important;
  font-size: .82rem !important;
}

/* ── SCOPE BLOCK ── */
[data-theme='dark'] .tl-scope { color: var(--r-body) !important; }

/* ── CLEARANCE STRIP labels ── */
[data-theme='dark'] .cs-label { color: var(--r-soft) !important; }
[data-theme='dark'] .cs-b { color: #a8c8a8 !important; }
[data-theme='dark'] .cs-status { color: #00ff88 !important; }

/* ── CERT CARD body ── */
[data-theme='dark'] .cert-card p,
[data-theme='dark'] .cert-body { color: var(--r-body) !important; }
[data-theme='dark'] .cert-issuer { color: var(--r-soft) !important; }

/* ── FOOTER: readable ── */
[data-theme='dark'] .footer-legal { color: var(--r-soft) !important; }
[data-theme='dark'] .footer-inner { color: var(--r-soft) !important; }
[data-theme='dark'] .footer-inner::before { color: rgba(0,255,65,.45) !important; }

/* ── CONNECT CARD: platform label green-dim, handle white ── */
[data-theme='dark'] .cc-platform { color: rgba(0,255,65,.4) !important; }
[data-theme='dark'] .cc-name,
[data-theme='dark'] .cc-handle  { color: var(--r-head) !important; }

/* ── GENERAL LINKS (non-button): cyan-teal accent ── */
[data-theme='dark'] a:not(.btn):not(.nav-link):not(.brand):not(.mnav):not(.connect-card) {
  color: var(--r-accent) !important;
  text-decoration-color: rgba(95,255,184,.25) !important;
}
[data-theme='dark'] a:not(.btn):not(.nav-link):not(.brand):not(.mnav):not(.connect-card):hover {
  color: #90ffe0 !important;
}

/* ── CODE and KBD: readable ── */
[data-theme='dark'] code {
  color: #90d4b0 !important;
  background: rgba(0,200,80,.07) !important;
  border-color: rgba(0,200,80,.15) !important;
}
[data-theme='dark'] kbd {
  color: #a8bfa8 !important;
  background: rgba(0,200,80,.07) !important;
  border-color: rgba(0,200,80,.18) !important;
}

/* ── MOBILE DRAWER: dark bg, readable links ── */
[data-theme='dark'] .mnav {
  color: #98b898 !important;
}
[data-theme='dark'] .mnav::before { content: '' !important; }
[data-theme='dark'] .mnav:hover { color: var(--r-head) !important; }

/* ── DETAILS/SUMMARY: selectable ── */
[data-theme='dark'] details summary .xp-title { color: var(--r-head) !important; }

/* ── RISK ENGINE CARDS ── */
[data-theme='dark'] .risk-card p,
[data-theme='dark'] .risk-item p { color: var(--r-body) !important; }

/* ── WRITING STAT ── */
[data-theme='dark'] .whs-label { color: var(--r-soft) !important; }

/* ── FAQ: white question, grey answer ── */
[data-theme='dark'] details.faq-item summary { color: var(--r-head) !important; }
[data-theme='dark'] details.faq-item .faq-a  { color: var(--r-body) !important; }

/* ── MATRIX: even more subtle (don't compete with text) ── */
#matrix-bg { opacity: .025 !important; }

/* ── SCANLINES: barely there ── */
.scanlines {
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 3px,
    rgba(0,255,65,.008) 3px,
    rgba(0,255,65,.008) 4px
  ) !important;
}

/* ── TERMINAL-GRID: much softer ── */
.terminal-grid {
  background-image:
    linear-gradient(rgba(0,255,65,.014) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,255,65,.014) 1px, transparent 1px) !important;
  background-size: 64px 64px !important;
}

/* ── BG ORBS: softer, off-green tones ── */
[data-theme='dark'] .orb-1 { background: #004020 !important; opacity: .06 !important; }
[data-theme='dark'] .orb-2 { background: #003040 !important; opacity: .06 !important; }
[data-theme='dark'] .orb-3 { background: #200040 !important; opacity: .04 !important; }

/* ── SECTION NUMBERS: ghost ── */
[data-theme='dark'] .sec-num {
  -webkit-text-stroke: 1px rgba(0,255,65,.14) !important;
  color: transparent !important;
  font-size: .72rem !important;
}

/* ── CLEARANCE STRIP background ── */
[data-theme='dark'] .clearance-strip {
  background: rgba(0,14,6,.75) !important;
  border-color: rgba(0,200,50,.12) !important;
}

/* ── PROFILE CARD: subtle surface ── */
[data-theme='dark'] .profile-card {
  background: rgba(8,18,10,.88) !important;
}

/* ── SEC-RULE: very subtle ── */
[data-theme='dark'] .sec-rule {
  background: linear-gradient(90deg, rgba(0,255,65,.2), rgba(0,255,65,.04), transparent) !important;
}

/* ── PROJECT CARD link: readable ── */
[data-theme='dark'] .card-footer-link a { color: var(--r-accent) !important; }
[data-theme='dark'] .card-footer-link a:hover { color: #90ffe0 !important; }

/* ── Reading width: cap for comfort ── */
[data-theme='dark'] .about-text p,
[data-theme='dark'] .about-body p,
[data-theme='dark'] .hero-lead {
  max-width: 60ch;
}

/* ── LETTER SPACING for body: none (easier to read) ── */
[data-theme='dark'] p,
[data-theme='dark'] li {
  letter-spacing: 0 !important;
}

/* ── FONT SIZE comfort floor ── */
[data-theme='dark'] p  { font-size: clamp(.86rem, 1.5vw, .95rem) !important; }
[data-theme='dark'] li { font-size: clamp(.84rem, 1.5vw, .92rem) !important; }

/* ── DETAILS summary cursor ── */
[data-theme='dark'] details summary { cursor: pointer !important; }
[data-theme='dark'] details summary:hover .xp-title { color: #eef5ee !important; }

/* ── HERO NAME: white + green shimmer (not all-green) ── */
[data-theme='dark'] .name-gradient {
  background: linear-gradient(
    135deg,
    #ffffff  0%,
    #c8f8e8  22%,
    #00ff88  44%,
    #22d3ee  62%,
    #b0c8ff  80%,
    #ffffff  100%
  ) !important;
  background-size: 300% 300% !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  background-clip: text !important;
  animation: name-flow 8s ease-in-out infinite !important;
}

/* ── BADGE text: consistent readable ── */
[data-theme='dark'] .badge,
[data-theme='dark'] .tag,
[data-theme='dark'] .ptag,
[data-theme='dark'] .cert-pip {
  color: #a8c0a8 !important;
  font-size: .66rem !important;
}

/* ── PUB TAGS: same ── */
[data-theme='dark'] .pub-tag { color: #a0bca0 !important; }

/* ── IMPACT HEX NUMBERS: stay bright green ── */
[data-theme='dark'] .impact-num {
  background: linear-gradient(135deg, #00ff41, #00ff88) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  filter: drop-shadow(0 0 14px rgba(0,255,65,.35)) !important;
}

/* ── KPI VALUES: stay bright green ── */
[data-theme='dark'] .v7-val {
  background: linear-gradient(135deg, #00ff41, #00e880) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  filter: drop-shadow(0 0 8px rgba(0,255,65,.3)) !important;
}

/* ── SCROLLBAR: subtler ── */
::-webkit-scrollbar-thumb { background: rgba(0,200,60,.2) !important; }
::-webkit-scrollbar-thumb:hover { background: rgba(0,255,65,.4) !important; }

/* ── SELECTION: readable contrast ── */
::selection {
  background: rgba(0,255,65,.2) !important;
  color: #ffffff !important;
}

/* ── THREAT CARDS: readable body ── */
[data-theme='dark'] .card ul li { color: #b0c8b0 !important; }

/* ── TILT CARD: border reset ── */
[data-theme='dark'] .tilt-el { border-radius: 4px !important; }

/* ── MOBILE: increase font for readability ── */
@media (max-width: 640px) {
  [data-theme='dark'] p  { font-size: .9rem !important; }
  [data-theme='dark'] li { font-size: .87rem !important; }
  [data-theme='dark'] h2 { letter-spacing: -.02em !important; }
  [data-theme='dark'] .hero-lead { font-size: .95rem !important; }
}
"""

with open(css_path, "a", encoding="utf-8") as f:
    f.write(css)

lines = int(subprocess.check_output(["wc","-l",css_path]).split()[0])
print(f"styles.css -> {lines} lines")
print("Readability layer applied.")
