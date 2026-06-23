import React, { useRef, useState } from 'react';
import { Resizer } from '@carbon-labs/react-resizer';

/* ─── Shared placeholder content helpers ─────────────────────────────────── */

function PanelContent({ title, body, listItems }) {
  return (
    <>
      <h3 className="rp-panel__heading">{title}</h3>
      {body && <p className="rp-panel__body">{body}</p>}
      {listItems && (
        <ul className="rp-panel__list">
          {listItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
    </>
  );
}

function SectionHeader({ label, title, description }) {
  return (
    <div className="rp-section-header">
      <p className="demo-label">{label}</p>
      <h2 className="rp-section-header__title">{title}</h2>
      <p className="rp-section-header__desc">{description}</p>
    </div>
  );
}

/* ─── 1. Single Panel — no boundaries ────────────────────────────────────── */

function SinglePanelNoBoundaries() {
  return (
    <section className="page-panel">
      <SectionHeader
        label="Single Panel"
        title="No Boundaries"
        description="A single resizable panel with no min/max constraints. Drag the handle to resize freely."
      />
      <div className="rp-row" style={{ height: 260 }}>
        <div className="rp-panel rp-panel--blue" style={{ width: '55%' }}>
          <PanelContent
            title="Resizable Panel"
            body="This panel has no size boundaries. Drag the handle to expand or shrink it as far as the container allows. Content wraps and reflows automatically as the panel grows or shrinks."
            listItems={['No minimum width enforced', 'No maximum width enforced', 'Content reflows on resize']}
          />
        </div>
        <Resizer orientation="vertical" className="rp-handle" thickness={6} />
        <div className="rp-panel rp-panel--dim" style={{ flex: 1 }}>
          <PanelContent
            title="Adjacent Panel"
            body="This panel fills the remaining space. Both panels shrink or expand in concert with the drag handle between them."
          />
        </div>
      </div>
    </section>
  );
}

/* ─── 2. Single Panel — bounded ──────────────────────────────────────────── */

function SinglePanelBounded() {
  const panelRef = useRef(null);

  const handleResize = (_event, delta) => {
    if (!panelRef.current) return;
    const current = panelRef.current.getBoundingClientRect().width;
    const next = Math.min(Math.max(current + delta, 180), 560);
    panelRef.current.style.width = `${next}px`;
    // Manually update the sibling — skip Resizer's default because we provide onResize
    const sibling = panelRef.current.nextElementSibling?.nextElementSibling;
    if (sibling) {
      const parentW = panelRef.current.parentElement.getBoundingClientRect().width;
      sibling.style.width = `${parentW - next - 6}px`;
    }
  };

  return (
    <section className="page-panel">
      <SectionHeader
        label="Single Panel — Bounded"
        title="Min &amp; Max Constraints"
        description="The left panel is constrained between 180 px and 560 px. Dragging past these limits has no effect."
      />
      <div className="rp-row" style={{ height: 260 }}>
        <div ref={panelRef} className="rp-panel rp-panel--blue" style={{ width: 300 }}>
          <PanelContent
            title="Bounded Panel"
            body="Min width: 180 px — Max width: 560 px. Try dragging the handle all the way to either edge to see the constraint in action."
            listItems={['Min: 180 px', 'Max: 560 px', 'Keyboard accessible']}
          />
        </div>
        <Resizer
          orientation="vertical"
          className="rp-handle"
          thickness={6}
          onResize={handleResize}
        />
        <div className="rp-panel rp-panel--dim" style={{ flex: 1 }}>
          <PanelContent
            title="Secondary Panel"
            body="This panel takes the remaining space. Text wraps naturally as the panel changes size."
          />
        </div>
      </div>
    </section>
  );
}

/* ─── 3. Single Panel — overlay ──────────────────────────────────────────── */

function SinglePanelOverlay() {
  const [overlayOpen, setOverlayOpen] = useState(true);
  const overlayRef = useRef(null);

  const handleResize = (_event, delta) => {
    if (!overlayRef.current) return;
    const current = overlayRef.current.getBoundingClientRect().width;
    const next = Math.min(Math.max(current + delta, 140), 480);
    overlayRef.current.style.width = `${next}px`;
  };

  return (
    <section className="page-panel">
      <SectionHeader
        label="Single Panel — Overlay"
        title="Floating Overlay Panel"
        description="A panel that slides over the content area without pushing it. The underlying content remains visible."
      />
      <div className="rp-overlay-container" style={{ height: 280 }}>
        {/* Background content */}
        <div className="rp-overlay-bg">
          <PanelContent
            title="Main Content Area"
            body="The main content area is not affected by the overlay panel's width. The overlay floats on top. Scroll and interact with this area independently."
            listItems={['Item alpha', 'Item beta', 'Item gamma', 'Item delta', 'Item epsilon']}
          />
        </div>

        {/* Overlay panel */}
        {overlayOpen && (
          <div className="rp-overlay-panel-wrapper">
            <div ref={overlayRef} className="rp-overlay-panel" style={{ width: 260 }}>
              <div className="rp-overlay-panel__inner">
                <button
                  className="rp-overlay-close"
                  onClick={() => setOverlayOpen(false)}
                  aria-label="Close overlay"
                >
                  ✕
                </button>
                <PanelContent
                  title="Overlay Panel"
                  body="Drag the handle on the left edge to resize. The overlay floats above the content without reflowing it."
                />
              </div>
              <Resizer
                orientation="vertical"
                className="rp-handle rp-handle--overlay-left"
                thickness={6}
                onResize={handleResize}
              />
            </div>
          </div>
        )}

        {!overlayOpen && (
          <button className="rp-overlay-reopen" onClick={() => setOverlayOpen(true)}>
            Open Overlay
          </button>
        )}
      </div>
    </section>
  );
}

/* ─── 4. Two Panels — horizontal ─────────────────────────────────────────── */

function TwoPanelsHorizontal() {
  return (
    <section className="page-panel">
      <SectionHeader
        label="Two Panels — Horizontal"
        title="Side-by-Side Panels"
        description="Classic horizontal split. Drag the vertical divider to redistribute space between the two panels."
      />
      <div className="rp-row" style={{ height: 300 }}>
        <div className="rp-panel rp-panel--blue" style={{ width: '40%' }}>
          <PanelContent
            title="Left Panel"
            body="This panel starts at 40% of the container. As you drag the handle, text wraps and reflows smoothly inside the flexbox column layout."
            listItems={['Flexible width', 'Text wraps on resize', 'Overflow hidden']}
          />
        </div>
        <Resizer orientation="vertical" className="rp-handle" thickness={6} />
        <div className="rp-panel rp-panel--dim" style={{ flex: 1 }}>
          <PanelContent
            title="Right Panel"
            body="The right panel fills the remaining width. Its content also wraps and reflows when the divider is dragged."
            listItems={['Auto-fills remaining space', 'min-width: 0 prevents overflow', 'Fully responsive']}
          />
        </div>
      </div>
    </section>
  );
}

/* ─── 5. Two Panels — vertical ───────────────────────────────────────────── */

function TwoPanelsVertical() {
  return (
    <section className="page-panel">
      <SectionHeader
        label="Two Panels — Vertical"
        title="Stacked Panels"
        description="Vertical split layout. Drag the horizontal divider to change how much vertical space each panel occupies."
      />
      <div className="rp-col" style={{ height: 420 }}>
        <div className="rp-panel rp-panel--blue" style={{ height: '55%' }}>
          <PanelContent
            title="Top Panel"
            body="This panel starts at 55% of the container height. Drag the handle below to grow or shrink it. Content uses overflow-y: auto so it scrolls when the panel is too short."
            listItems={['Height adjustable', 'Scrollable content', 'Text reflows']}
          />
        </div>
        <Resizer orientation="horizontal" className="rp-handle" thickness={6} />
        <div className="rp-panel rp-panel--dim" style={{ flex: 1 }}>
          <PanelContent
            title="Bottom Panel"
            body="This panel fills the remaining vertical space. Try dragging the handle up all the way to see the scroll behavior engage in the top panel."
          />
        </div>
      </div>
    </section>
  );
}

/* ─── 6. Four Panels ─────────────────────────────────────────────────────── */

function FourPanels() {
  return (
    <section className="page-panel">
      <SectionHeader
        label="Four Panels"
        title="IDE-Style Layout"
        description="A complex workspace with sidebar, editor, terminal, and inspector — each independently resizable."
      />
      <div className="rp-row" style={{ height: 440 }}>
        {/* Sidebar */}
        <div className="rp-panel rp-panel--blue" style={{ width: 220 }}>
          <PanelContent
            title="Sidebar"
            body="Navigation and tools."
            listItems={['File explorer', 'Search', 'Extensions', 'Settings']}
          />
        </div>

        <Resizer orientation="vertical" className="rp-handle" thickness={6} />

        {/* Center: editor + terminal */}
        <div className="rp-col" style={{ flex: 1 }}>
          <div className="rp-panel rp-panel--mid" style={{ height: '60%' }}>
            <PanelContent
              title="Editor"
              body="Main editing area. Syntax highlighting and code completion are available. Content wraps horizontally and scrolls vertically."
            />
          </div>
          <Resizer orientation="horizontal" className="rp-handle" thickness={6} />
          <div className="rp-panel rp-panel--dim" style={{ flex: 1 }}>
            <PanelContent
              title="Terminal / Output"
              body="Command line interface and build output."
            />
          </div>
        </div>

        <Resizer orientation="vertical" className="rp-handle" thickness={6} />

        {/* Inspector */}
        <div className="rp-panel rp-panel--dim" style={{ width: 220 }}>
          <PanelContent
            title="Inspector"
            body="Properties and debug info."
            listItems={['Component props', 'Styles', 'Debug', 'Performance']}
          />
        </div>
      </div>
    </section>
  );
}

/* ─── 7. Two Panels — vertical grid ─────────────────────────────────────── */

function TwoPanelsVerticalGrid() {
  return (
    <section className="page-panel">
      <SectionHeader
        label="Two Panels — Vertical Grid"
        title="Vertical Grid Layout"
        description="Two equal-width column panels in a grid row. The horizontal resizer controls how the vertical space is divided between top and bottom cells."
      />
      <div className="rp-grid-2col" style={{ height: 380 }}>
        {/* Column A */}
        <div className="rp-col">
          <div className="rp-panel rp-panel--blue" style={{ height: '50%' }}>
            <PanelContent
              title="Column A — Top"
              body="Top cell of column A. Drag the horizontal handle below to resize."
            />
          </div>
          <Resizer orientation="horizontal" className="rp-handle" thickness={6} />
          <div className="rp-panel rp-panel--mid" style={{ flex: 1 }}>
            <PanelContent
              title="Column A — Bottom"
              body="Bottom cell of column A. Grows to fill remaining height after resize."
            />
          </div>
        </div>

        {/* Column B */}
        <div className="rp-col">
          <div className="rp-panel rp-panel--dim" style={{ height: '50%' }}>
            <PanelContent
              title="Column B — Top"
              body="Top cell of column B. Independent of column A's resizer."
            />
          </div>
          <Resizer orientation="horizontal" className="rp-handle" thickness={6} />
          <div className="rp-panel rp-panel--blue" style={{ flex: 1 }}>
            <PanelContent
              title="Column B — Bottom"
              body="Bottom cell of column B. Resize independently from column A."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 8. Custom Handles ──────────────────────────────────────────────────── */

function CustomHandles() {
  return (
    <section className="page-panel">
      <SectionHeader
        label="Custom Handles"
        title="Styled &amp; Custom Handle Slots"
        description="The Resizer accepts custom children and className overrides. This example shows a branded handle with a visible grip icon and a wide, pill-shaped handle."
      />
      <div className="rp-row" style={{ height: 280 }}>
        <div className="rp-panel rp-panel--blue" style={{ width: '45%' }}>
          <PanelContent
            title="Custom Grip Handle"
            body="The divider to the right uses a custom grip icon rendered as a child of the Resizer. It inherits all the drag and keyboard behaviour."
            listItems={['Custom children slot', 'Custom className applied', 'Keyboard accessible']}
          />
        </div>

        {/* Custom handle with grip dots */}
        <Resizer orientation="vertical" className="rp-handle rp-handle--grip" thickness={12}>
          <span className="rp-grip" aria-hidden="true">
            ⋮⋮
          </span>
        </Resizer>

        <div className="rp-panel rp-panel--mid" style={{ flex: 1 }}>
          <PanelContent
            title="Right Panel"
            body="Try the wide pill handle. Double-click resets both panels to their initial sizes."
          />
        </div>

        {/* Wide pill handle */}
        <Resizer orientation="vertical" className="rp-handle rp-handle--pill" thickness={16} />

        <div className="rp-panel rp-panel--dim" style={{ width: '25%' }}>
          <PanelContent
            title="Third Panel"
            body="A third panel separated by the pill-shaped handle on its left."
          />
        </div>
      </div>
    </section>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

function ResizerPage() {
  return (
    <div className="page-stack">
      <div className="hero-section">
        <p className="eyebrow">Carbon Labs</p>
        <h1>Resizer</h1>
        <p className="hero-copy">
          Resizable split-pane layouts for workspaces, editors, and dashboards. Eight configurations — drag handles, bounded panels, overlays, grids, and custom handles — all with correct content reflow.
        </p>
      </div>

      <SinglePanelNoBoundaries />
      <SinglePanelBounded />
      <SinglePanelOverlay />
      <TwoPanelsHorizontal />
      <TwoPanelsVertical />
      <FourPanels />
      <TwoPanelsVerticalGrid />
      <CustomHandles />
    </div>
  );
}

export default ResizerPage;

// Made with Bob
