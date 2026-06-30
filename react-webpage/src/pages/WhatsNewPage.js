import React, { useRef, useState } from 'react';
import {
  Bubble,
  BubbleHeader,
  Toc,
  TocItem,
  TocList,
  TocSections,
  TocSection,
  ViewStack,
  View,
} from '@carbon-labs/react-whats-new';
import { Theme } from '@carbon/react';

// ─── Feature data for the ViewStack carousel ────────────────────────────────
const WHATS_NEW_FEATURES = [
  {
    tag: 'New in Carbon Labs',
    title: 'UIShell',
    description:
      'A complete IBM platform shell with Header, SideNav, Profile popover, TrialCountdown, HeaderDivider, HeaderOverflowPanel, and more — all built on Carbon design tokens and fully accessible.',
    badge: 'v0.103',
    color: '#78a9ff',
  },
  {
    tag: 'New in Carbon Labs',
    title: 'Animated Header',
    description:
      'Motion-driven page headers powered by CSS custom properties and Carbon motion tokens. Supports light, dark, and g90 themes out of the box with smooth entrance animations.',
    badge: 'v0.54',
    color: '#42be65',
  },
  {
    tag: 'New in Carbon Labs',
    title: 'Resizer',
    description:
      'An accessible drag handle that lets users resize adjacent panels horizontally or vertically. Supports keyboard arrow-key control, min/max constraints, and multiple handle styles.',
    badge: 'v0.25',
    color: '#be95ff',
  },
  {
    tag: 'New in Carbon Labs',
    title: 'Processing',
    description:
      'A lightweight SVG animation component that communicates loading and processing states. Adapts stroke colour to the active Carbon theme automatically via CSS custom properties.',
    badge: 'v0.21',
    color: '#f1c21b',
  },
];

// ─── Table-of-contents sections ─────────────────────────────────────────────
const TOC_SECTIONS = [
  { id: 0, label: "What's New", description: 'Overview and intro' },
  { id: 1, label: 'Bubble', description: 'Contextual tooltip' },
  { id: 2, label: 'Table of Contents', description: 'Toc component family' },
  { id: 3, label: 'ViewStack', description: 'Carousel pattern' },
];

function WhatsNewPage({ theme = 'g100' }) {
  const viewStackRef = useRef(null);
  const [currentView, setCurrentView] = useState(0);

  // Bubble demo state — one bubble per feature card
  const [openBubble, setOpenBubble] = useState(null);
  const bubbleTargetRefs = useRef({});

  const handleViewChange = ({ currentIndex }) => {
    setCurrentView(currentIndex);
  };

  const isLight = theme === 'white' || theme === 'g10';

  return (
    <Theme theme={theme}>
      <div className={`wnp-root${isLight ? ' wnp-root--light' : ''}`}>
        <Toc>
          {/* ── Two-column layout: TOC sidebar + scrollable sections ── */}
          <div className="wnp-layout">
            {/* Left: sticky table of contents */}
            <aside className="wnp-toc-sidebar">
              <p className="wnp-toc-label">On this page</p>
              <TocList>
                {TOC_SECTIONS.map((s) => (
                  <TocItem key={s.id} index={s.id}>
                    <span className="wnp-toc-item-name">{s.label}</span>
                    <span className="wnp-toc-item-desc">{s.description}</span>
                  </TocItem>
                ))}
              </TocList>
            </aside>

            {/* Right: scrollable content sections  */}
            {/* height = viewport minus top-tabs (3rem) — gives TocSections a scroll root */}
            <TocSections className="wnp-sections" style={{ height: 'calc(100vh - 3rem)', overflowY: 'auto' }}>
              {/* ── Section 0: Hero ── */}
              <TocSection index={0} className="wnp-section">
                <p className="wnp-eyebrow">Carbon Labs · What's Next</p>
                <h1 className="wnp-hero-title">What's New in Carbon Labs</h1>
                <p className="wnp-hero-body">
                  Carbon Labs is the incubator for experimental Carbon Design System
                  components. The patterns below — <strong>Bubble</strong>,{' '}
                  <strong>Table of Contents</strong>, <strong>ViewStack</strong>, and{' '}
                  <strong>What's New</strong> — are all part of the{' '}
                  <code>@carbon-labs/react-whats-new</code> package.
                </p>
              </TocSection>

              {/* ── Section 1: Bubble ── */}
              <TocSection index={1} className="wnp-section">
                <h2 className="wnp-section-heading">Bubble — Contextual Tooltip</h2>
                <p className="wnp-body">
                  The <code>Bubble</code> component is a floating contextual tooltip built on{' '}
                  <a href="https://floating-ui.com/" className="wnp-link">
                    Floating UI
                  </a>{' '}
                  and styled with Carbon design tokens. It anchors to a target element and
                  supports top, bottom, left, and right alignments with auto-flip on overflow.
                  Click any feature badge below to see it in action.
                </p>

                {/* Feature cards with Bubble anchors */}
                <div className="wnp-bubble-grid">
                  {WHATS_NEW_FEATURES.map((feat, idx) => (
                    <div key={idx} className="wnp-feat-card">
                      <button
                        id={`bubble-target-${idx}`}
                        ref={(el) => {
                          if (el) bubbleTargetRefs.current[idx] = el;
                        }}
                        className="wnp-feat-badge"
                        style={{ '--badge-color': feat.color }}
                        onClick={() =>
                          setOpenBubble(openBubble === idx ? null : idx)
                        }
                        aria-expanded={openBubble === idx}
                        aria-label={`Show details for ${feat.title}`}
                      >
                        {feat.title}
                        <span className="wnp-feat-version">{feat.badge}</span>
                      </button>

                      {/* Bubble anchored to the button above */}
                      <Bubble
                        open={openBubble === idx}
                        target={bubbleTargetRefs.current[idx]}
                        align="bottom"
                      >
                        <BubbleHeader>
                          <span className="wnp-bubble-tag">{feat.tag}</span>
                          <strong className="wnp-bubble-title">{feat.title}</strong>
                        </BubbleHeader>
                        <p className="wnp-bubble-body">{feat.description}</p>
                        <button
                          className="wnp-bubble-close"
                          onClick={() => setOpenBubble(null)}
                          aria-label="Close"
                        >
                          ✕ Dismiss
                        </button>
                      </Bubble>
                    </div>
                  ))}
                </div>
              </TocSection>

              {/* ── Section 2: Toc ── */}
              <TocSection index={2} className="wnp-section">
                <h2 className="wnp-section-heading">Table of Contents (Toc)</h2>
                <p className="wnp-body">
                  The <code>Toc</code> + <code>TocList</code> + <code>TocSections</code>{' '}
                  + <code>TocSection</code> + <code>TocItem</code> component family tracks
                  scroll position using an{' '}
                  <code>IntersectionObserver</code> and highlights the active section in
                  the sidebar navigation. This very page uses it — the{' '}
                  <strong>"On this page"</strong> panel on the left is a live{' '}
                  <code>TocList</code> wired to these sections.
                </p>
                <div className="wnp-toc-anatomy">
                  {[
                    ['Toc', 'Context provider. Owns active-section state and scroll dispatcher.'],
                    ['TocList', 'Renders a <nav> with keyboard-navigable list items.'],
                    ['TocItem', 'A single navigation entry. Highlights when its section is in view.'],
                    ['TocSections', 'Scrollable container. Wires an IntersectionObserver to child sections.'],
                    ['TocSection', 'A semantic content section that registers itself with TocSections.'],
                  ].map(([name, desc]) => (
                    <div key={name} className="wnp-anatomy-row">
                      <code className="wnp-anatomy-name">{name}</code>
                      <span className="wnp-anatomy-desc">{desc}</span>
                    </div>
                  ))}
                </div>
              </TocSection>

              {/* ── Section 3: ViewStack ── */}
              <TocSection index={3} className="wnp-section">
                <h2 className="wnp-section-heading">ViewStack — Carousel Pattern</h2>
                <p className="wnp-body">
                  <code>ViewStack</code> + <code>View</code> compose a slide-in carousel
                  pattern. The imperative ref API exposes <code>next()</code>,{' '}
                  <code>back()</code>, <code>home()</code>, and{' '}
                  <code>pushViewIndex(n)</code> for programmatic navigation.
                </p>

                {/* Dot indicators */}
                <div className="wnp-vs-dots" role="tablist" aria-label="Feature slides">
                  {WHATS_NEW_FEATURES.map((feat, idx) => (
                    <button
                      key={idx}
                      role="tab"
                      aria-selected={currentView === idx}
                      aria-label={`Go to slide ${idx + 1}: ${feat.title}`}
                      className={`wnp-vs-dot${currentView === idx ? ' wnp-vs-dot--active' : ''}`}
                      onClick={() => viewStackRef.current?.pushViewIndex(idx)}
                    />
                  ))}
                </div>

                <div className="wnp-vs-frame">
                  <ViewStack
                    ref={viewStackRef}
                    ariaLabel="Carbon Labs feature carousel"
                    onViewChangeEnd={handleViewChange}
                  >
                    {WHATS_NEW_FEATURES.map((feat, idx) => (
                      <View key={idx} index={idx} title={feat.title}>
                        <div
                          className="wnp-vs-card"
                          style={{ '--card-accent': feat.color }}
                        >
                          <span className="wnp-vs-tag">{feat.tag}</span>
                          <h3 className="wnp-vs-title">{feat.title}</h3>
                          <p className="wnp-vs-body">{feat.description}</p>
                          <span
                            className="wnp-vs-version"
                            style={{ color: feat.color }}
                          >
                            {feat.badge}
                          </span>
                        </div>
                      </View>
                    ))}
                  </ViewStack>
                </div>

                {/* Prev / Next controls */}
                <div className="wnp-vs-controls">
                  <button
                    className="wnp-vs-btn"
                    onClick={() => viewStackRef.current?.back()}
                    disabled={currentView === 0}
                    aria-label="Previous feature"
                  >
                    ← Back
                  </button>
                  <span className="wnp-vs-counter">
                    {currentView + 1} / {WHATS_NEW_FEATURES.length}
                  </span>
                  <button
                    className="wnp-vs-btn"
                    onClick={() => viewStackRef.current?.next()}
                    disabled={currentView === WHATS_NEW_FEATURES.length - 1}
                    aria-label="Next feature"
                  >
                    Next →
                  </button>
                </div>
              </TocSection>
            </TocSections>
          </div>
        </Toc>
      </div>
    </Theme>
  );
}

export default WhatsNewPage;

// Made with Bob
