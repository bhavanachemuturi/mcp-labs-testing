import React, { createContext, useContext, useRef, useState } from 'react';
import { Resizer } from '@carbon-labs/react-resizer';
import { Theme } from '@carbon/react';

/* ─── Theme context so every sub-section knows the current theme ─────────── */
const ThemeCtx = createContext('g100');
const useThemeCtx = () => useContext(ThemeCtx);

/* ─── Shared content helpers ──────────────────────────────────────────────── */
function PanelContent({ title, body, listItems }) {
  const theme = useThemeCtx();
  const isLight = theme === 'white' || theme === 'g10';
  return (
    <>
      <h3 className={`rp-panel__heading${isLight ? ' rp-panel__heading--light' : ''}`}>{title}</h3>
      {body && <p className={`rp-panel__body${isLight ? ' rp-panel__body--light' : ''}`}>{body}</p>}
      {listItems && (
        <ul className={`rp-panel__list${isLight ? ' rp-panel__list--light' : ''}`}>
          {listItems.map((item, i) => <li key={i}>{item}</li>)}
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

/* ─────────────────────────────────────────────────────────────────────────────
   1. Basic — two panels, vertical split
   The Resizer sits between two flex siblings and resizes them automatically
   via its default behaviour (sets width on previousElementSibling /
   nextElementSibling). No onResize needed.
   ───────────────────────────────────────────────────────────────────────────── */
function BasicTwoPanels() {
  return (
    <section className="page-panel">
      <SectionHeader
        label="Basic Usage"
        title="Two Panels — Vertical Split"
        description="Drag the handle between the two panels to resize them. The Resizer reads Carbon design tokens for its color automatically."
      />
      <div className="rp-row" style={{ height: 260 }}>
        <div className="rp-panel rp-panel--blue" style={{ width: '55%' }}>
          <PanelContent
            title="Left Panel"
            body="Drag the handle to expand or shrink. The Resizer sets widths directly on the sibling DOM elements — no React state needed."
            listItems={['No onResize override', 'Token-driven handle color', 'Double-click to reset']}
          />
        </div>
        <Resizer orientation="vertical" />
        <div className="rp-panel rp-panel--dim" style={{ flex: 1 }}>
          <PanelContent
            title="Right Panel"
            body="This panel fills the remaining space. Both panels resize in concert."
          />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   2. Bounded — constrained min/max via onResize
   onResize(event, delta): delta is the pixel movement since mousedown.
   We clamp by reading the stored initial size and applying bounds.
   ───────────────────────────────────────────────────────────────────────────── */
function BoundedPanel() {
  const panelRef = useRef(null);
  const siblingRef = useRef(null);

  const MIN = 140;
  const MAX = 520;

  const handleResize = (_event, delta) => {
    const panel = panelRef.current;
    const sibling = siblingRef.current;
    if (!panel || !sibling) return;

    const parentW = panel.parentElement?.getBoundingClientRect().width ?? 0;
    const resizerW = 4; // Resizer default thickness

    const currentW = panel.getBoundingClientRect().width;
    const nextW = Math.min(MAX, Math.max(MIN, currentW + delta));
    panel.style.width = `${nextW}px`;
    sibling.style.width = `${parentW - nextW - resizerW}px`;
  };

  return (
    <section className="page-panel">
      <SectionHeader
        label="Bounded Resize"
        title="Min & Max Constraints"
        description={`Left panel is constrained between ${MIN} px and ${MAX} px. Dragging past either limit stops at the boundary.`}
      />
      <div className="rp-row" style={{ height: 260 }}>
        <div ref={panelRef} className="rp-panel rp-panel--blue" style={{ width: 280 }}>
          <PanelContent
            title="Bounded Panel"
            body={`Min: ${MIN} px  ·  Max: ${MAX} px. Try dragging to the extreme edges.`}
            listItems={[`Min width: ${MIN} px`, `Max width: ${MAX} px`, 'Keyboard: Arrow keys (5 px) · Shift+Arrow (25 px)']}
          />
        </div>
        <Resizer orientation="vertical" onResize={handleResize} />
        <div ref={siblingRef} className="rp-panel rp-panel--dim" style={{ flex: 1 }}>
          <PanelContent
            title="Adjacent Panel"
            body="Adjusts automatically as the bounded panel resizes."
          />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   3. Vertical split — two panels stacked, horizontal resizer
   ───────────────────────────────────────────────────────────────────────────── */
function VerticalSplit() {
  return (
    <section className="page-panel">
      <SectionHeader
        label="Vertical Split"
        title="Stacked Panels"
        description="A horizontal Resizer between two vertically stacked panels. Drag up/down to adjust heights. Double-click to reset."
      />
      <div className="rp-col" style={{ height: 380 }}>
        <div className="rp-panel rp-panel--blue" style={{ height: '55%' }}>
          <PanelContent
            title="Top Panel"
            body="Starts at 55% of the container height. Drag the handle below to grow or shrink it."
            listItems={['orientation="horizontal"', 'Keyboard: Arrow Up/Down', 'Double-click resets']}
          />
        </div>
        <Resizer orientation="horizontal" />
        <div className="rp-panel rp-panel--dim" style={{ flex: 1 }}>
          <PanelContent
            title="Bottom Panel"
            body="Fills the remaining height. Content scrolls when the panel is too short."
          />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   4. Three panels — two vertical resizers
   ───────────────────────────────────────────────────────────────────────────── */
function ThreePanels() {
  return (
    <section className="page-panel">
      <SectionHeader
        label="Three Panels"
        title="Triple Column Split"
        description="Two independent vertical resizers between three panels. Each handle only affects its own pair of neighbours."
      />
      <div className="rp-row" style={{ height: 280 }}>
        <div className="rp-panel rp-panel--blue" style={{ width: '30%' }}>
          <PanelContent
            title="Left"
            body="Drag the first handle to resize."
            listItems={['Independent resizer', 'No coupling to right panel']}
          />
        </div>
        <Resizer orientation="vertical" />
        <div className="rp-panel rp-panel--mid" style={{ flex: 1 }}>
          <PanelContent
            title="Center"
            body="Both resizers affect this panel — the left one sets its left edge, the right one sets its right edge."
          />
        </div>
        <Resizer orientation="vertical" />
        <div className="rp-panel rp-panel--dim" style={{ width: '25%' }}>
          <PanelContent
            title="Right"
            body="Drag the second handle to resize."
            listItems={['Independent resizer', 'No coupling to left panel']}
          />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   5. IDE layout — nested horizontal + vertical resizers
   ───────────────────────────────────────────────────────────────────────────── */
function IDELayout() {
  return (
    <section className="page-panel">
      <SectionHeader
        label="IDE Layout"
        title="Nested Resizers"
        description="Sidebar | (Editor / Terminal) | Inspector. The center column uses a nested horizontal Resizer for the editor/terminal split."
      />
      <div className="rp-row" style={{ height: 420 }}>
        {/* Sidebar */}
        <div className="rp-panel rp-panel--blue" style={{ width: 180 }}>
          <PanelContent
            title="Sidebar"
            listItems={['File explorer', 'Search', 'Extensions', 'Settings']}
          />
        </div>

        <Resizer orientation="vertical" />

        {/* Center col — editor + terminal */}
        <div className="rp-col" style={{ flex: 1 }}>
          <div className="rp-panel rp-panel--mid" style={{ height: '60%' }}>
            <PanelContent
              title="Editor"
              body="Main editing surface. Drag the handle below to give more space to the terminal."
            />
          </div>
          <Resizer orientation="horizontal" />
          <div className="rp-panel rp-panel--dim" style={{ flex: 1 }}>
            <PanelContent
              title="Terminal"
              body="Command output. Drag the handle above to grow or shrink."
            />
          </div>
        </div>

        <Resizer orientation="vertical" />

        {/* Inspector */}
        <div className="rp-panel rp-panel--dim" style={{ width: 180 }}>
          <PanelContent
            title="Inspector"
            listItems={['Props', 'Styles', 'Debug', 'Perf']}
          />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   6. onResizeEnd callback demo
   Shows how to react after a resize operation completes.
   ───────────────────────────────────────────────────────────────────────────── */
function ResizeEndDemo() {
  const [lastSize, setLastSize] = useState(null);

  const handleResizeEnd = (_event, ref) => {
    if (ref?.current?.previousElementSibling) {
      const w = Math.round(ref.current.previousElementSibling.getBoundingClientRect().width);
      setLastSize(w);
    }
  };

  return (
    <section className="page-panel">
      <SectionHeader
        label="onResizeEnd Callback"
        title="Post-Resize Event"
        description="The Resizer fires onResizeEnd after the drag stops (debounced 100 ms). Use it to persist layout state or trigger re-renders."
      />
      {lastSize !== null && (
        <p className="rp-callback-badge">
          Last committed left-panel width: <strong>{lastSize} px</strong>
        </p>
      )}
      <div className="rp-row" style={{ height: 240 }}>
        <div className="rp-panel rp-panel--blue" style={{ width: '50%' }}>
          <PanelContent
            title="Left Panel"
            body="Drag and release. The badge above updates with the committed width."
          />
        </div>
        <Resizer orientation="vertical" onResizeEnd={handleResizeEnd} />
        <div className="rp-panel rp-panel--dim" style={{ flex: 1 }}>
          <PanelContent
            title="Right Panel"
            body="onResizeEnd fires once after the mouse is released."
          />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   7. Custom children slot
   The Resizer renders children inside itself — use for grip icons.
   ───────────────────────────────────────────────────────────────────────────── */
function CustomChildren() {
  return (
    <section className="page-panel">
      <SectionHeader
        label="Custom Children"
        title="Grip Icon Inside Resizer"
        description="Pass children to the Resizer to render a grip icon or any visual hint inside the handle. Drag and keyboard behaviour is unchanged."
      />
      <div className="rp-row" style={{ height: 260 }}>
        <div className="rp-panel rp-panel--blue" style={{ width: '45%' }}>
          <PanelContent
            title="Left Panel"
            body="The handle between the panels contains custom children — a grip dot icon rendered inside the Resizer element."
            listItems={['Children slot', 'Keyboard accessible', 'Carbon token colors']}
          />
        </div>
        <Resizer orientation="vertical" thickness={12} className="rp-handle--grip-custom">
          <span className="rp-grip-icon" aria-hidden="true">⋮</span>
        </Resizer>
        <div className="rp-panel rp-panel--dim" style={{ flex: 1 }}>
          <PanelContent
            title="Right Panel"
            body="Resize with the handle above or use keyboard arrow keys while it is focused."
          />
        </div>
      </div>
    </section>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
function ResizerPage({ theme = 'g100' }) {
  return (
    <ThemeCtx.Provider value={theme}>
      <Theme theme={theme}>
        <div className="page-stack">
          <div className="hero-section">
            <p className="eyebrow">Carbon Labs</p>
            <h1>Resizer</h1>
            <p className="hero-copy">
              The <code>@carbon-labs/react-resizer</code> component is a drag
              handle that resizes adjacent flex siblings. It uses Carbon design
              tokens for its color — switching the theme above updates the handle
              appearance automatically.
            </p>
          </div>

          <BasicTwoPanels />
          <BoundedPanel />
          <VerticalSplit />
          <ThreePanels />
          <IDELayout />
          <ResizeEndDemo />
          <CustomChildren />
        </div>
      </Theme>
    </ThemeCtx.Provider>
  );
}

export default ResizerPage;

// Made with Bob
