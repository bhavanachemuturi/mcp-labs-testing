import React, { useState, useEffect } from 'react';
import { Processing } from '@carbon-labs/react-processing';
import { Button, Theme } from '@carbon/react';

/**
 * The Carbon Labs Processing animation is driven entirely by CSS that scopes
 * stroke colour to [data-carbon-theme] attribute values:
 *
 *   [data-carbon-theme='g90']  → stroke: $gray-10  (light dots on dark bg)
 *   [data-carbon-theme='g100'] → stroke: $gray-10
 *   [data-carbon-theme='white']/ 'g10' → stroke: $blue-90
 *
 * Without that attribute the dots have stroke: none and are invisible.
 *
 * Additionally, the "looping" animation actually runs the loop phase exactly
 * 5 times (animation-iteration-count: 5) then fires an unload sequence and
 * goes dark.  To keep the animation visually continuous we remount the
 * component every ~8 s by incrementing a key.
 */

const LOOP_DURATION_MS = 8300; // load(1s) + loop×5(5s) + a little margin

/** Wrapper that auto-remounts <Processing> on each cycle so it loops forever */
function LoopingProcessing({ active = true, theme = 'g100' }) {
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setCycleKey((k) => k + 1), LOOP_DURATION_MS);
    return () => clearInterval(id);
  }, [active]);

  if (!active) return null;

  return (
    <div data-carbon-theme={theme} className="proc-theme-wrap">
      <Processing key={cycleKey} loop={true} />
    </div>
  );
}

/** Single-cycle processing — shows one full load→loop×1→unload run */
function SingleCycleProcessing({ active = false, theme = 'g100' }) {
  const [runKey, setRunKey] = useState(0);

  const restart = () => setRunKey((k) => k + 1);

  return (
    <div data-carbon-theme={theme} className="proc-theme-wrap">
      {active && <Processing key={runKey} loop={false} />}
      {!active && <span className="proc-idle-dot" aria-hidden="true" />}
      <button className="proc-restart-btn" onClick={restart} disabled={!active}>
        Re-run
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

function ProcessingPage({ theme = 'g100' }) {
  const [looping1Active, setLooping1Active] = useState(true);
  const [singleActive, setSingleActive] = useState(false);
  const [task1Active, setTask1Active] = useState(true);

  const isLight = theme === 'white' || theme === 'g10';

  return (
    <Theme theme={theme}>
    <div className={`page-stack${isLight ? ' page-stack--light' : ''}`}>
      <div className="hero-section">
        <p className="eyebrow">Carbon Labs</p>
        <h1>Processing</h1>
        <p className="hero-copy">
          Three animated dots that signal an ongoing operation. The component uses SVG
          CSS animations and requires a <code>data-carbon-theme</code> context to
          render the correct stroke colour.
        </p>
      </div>

      {/* ── 1. Continuous loop ──────────────────────────────────────────── */}
      <section className="page-panel">
        <div className="demo-header">
          <div>
            <p className="demo-label">Continuous Animation</p>
            <h2>Looping Processing Indicator</h2>
            <p>
              Runs indefinitely. The component is remounted every ~8 s to restart
              the CSS animation cycle before it times out.
            </p>
          </div>
          <Button
            kind="tertiary"
            size="sm"
            onClick={() => setLooping1Active((v) => !v)}
          >
            {looping1Active ? 'Stop' : 'Start'}
          </Button>
        </div>

        <div className="proc-showcase">
          {/* Dark theme tile — dots are white/gray */}
          <div className="proc-tile proc-tile--dark">
            <span className="proc-tile__label">Dark (g100)</span>
            <LoopingProcessing active={looping1Active} theme="g100" />
            <p className="proc-tile__status">
              {looping1Active ? 'Processing…' : 'Idle'}
            </p>
          </div>

          {/* Light theme tile — dots are Carbon blue-90 */}
          <div className="proc-tile proc-tile--light">
            <span className="proc-tile__label">Light (g10)</span>
            <LoopingProcessing active={looping1Active} theme="g10" />
            <p className="proc-tile__status proc-tile__status--dark-text">
              {looping1Active ? 'Processing…' : 'Idle'}
            </p>
          </div>

          {/* Mid-tone tile — g90 */}
          <div className="proc-tile proc-tile--g90">
            <span className="proc-tile__label">Mid (g90)</span>
            <LoopingProcessing active={looping1Active} theme="g90" />
            <p className="proc-tile__status">
              {looping1Active ? 'Processing…' : 'Idle'}
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Single cycle (no-loop) ───────────────────────────────────── */}
      <section className="page-panel">
        <div className="demo-header">
          <div>
            <p className="demo-label">Single Animation</p>
            <h2>One-Shot Processing Indicator</h2>
            <p>
              Plays one load → pulse → unload cycle, then disappears. Click{' '}
              <strong>Start</strong> to mount the component or{' '}
              <strong>Re-run</strong> inside the tile to replay it without
              unmounting.
            </p>
          </div>
          <Button
            kind="tertiary"
            size="sm"
            onClick={() => setSingleActive((v) => !v)}
          >
            {singleActive ? 'Unmount' : 'Start'}
          </Button>
        </div>

        <div className="proc-showcase">
          <div className="proc-tile proc-tile--dark">
            <span className="proc-tile__label">Dark (g100) — single cycle</span>
            <SingleCycleProcessing active={singleActive} theme="g100" />
            <p className="proc-tile__status">
              {singleActive ? 'Running once…' : 'Not started'}
            </p>
          </div>

          <div className="proc-tile proc-tile--light">
            <span className="proc-tile__label">Light (g10) — single cycle</span>
            <SingleCycleProcessing active={singleActive} theme="g10" />
            <p className="proc-tile__status proc-tile__status--dark-text">
              {singleActive ? 'Running once…' : 'Not started'}
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. Multiple simultaneous tasks ─────────────────────────────── */}
      <section className="page-panel">
        <div className="demo-header">
          <div>
            <p className="demo-label">Multiple States</p>
            <h2>Parallel Task Indicators</h2>
            <p>
              Multiple Processing instances running independently. Toggle Task 1
              to see an indicator start and stop while the others continue.
            </p>
          </div>
        </div>

        <div className="proc-task-grid">
          {/* Task 1 — toggleable */}
          <div className="proc-task">
            <div className="proc-task__header">
              <span className="status-label">Task 1</span>
              <Button
                kind="ghost"
                size="sm"
                onClick={() => setTask1Active((v) => !v)}
              >
                {task1Active ? 'Stop' : 'Start'}
              </Button>
            </div>
            <div className="proc-task__indicator">
              <LoopingProcessing active={task1Active} theme="g100" />
            </div>
            <p className="proc-task__desc">
              {task1Active ? 'Loading data…' : 'Idle'}
            </p>
          </div>

          {/* Task 2 — always on */}
          <div className="proc-task">
            <div className="proc-task__header">
              <span className="status-label">Task 2</span>
            </div>
            <div className="proc-task__indicator">
              <LoopingProcessing active={true} theme="g100" />
            </div>
            <p className="proc-task__desc">Syncing files…</p>
          </div>

          {/* Task 3 — always on */}
          <div className="proc-task">
            <div className="proc-task__header">
              <span className="status-label">Task 3</span>
            </div>
            <div className="proc-task__indicator">
              <LoopingProcessing active={true} theme="g100" />
            </div>
            <p className="proc-task__desc">Building project…</p>
          </div>

          {/* Task 4 — light theme to contrast */}
          <div className="proc-task proc-task--light">
            <div className="proc-task__header">
              <span className="status-label">Task 4</span>
            </div>
            <div className="proc-task__indicator">
              <LoopingProcessing active={true} theme="g10" />
            </div>
            <p className="proc-task__desc proc-task__desc--dark-text">
              Uploading assets…
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. How it works ─────────────────────────────────────────────── */}
      <section className="page-panel">
        <h2>How it works</h2>
        <p>
          The <code>Processing</code> component renders three SVG circles
          animated with CSS <code>@keyframes</code>. Two behaviours are
          supported via the <code>loop</code> prop:
        </p>
        <ul className="panel-list" style={{ marginBottom: '1rem' }}>
          <li>
            <strong>loop=true</strong> — load (1 s) → pulse × 5 (5 s) →
            unload (1.3 s). Remount the component to replay.
          </li>
          <li>
            <strong>loop=false</strong> — load (1 s) → unload (1.3 s). One
            shot only.
          </li>
        </ul>
        <p>
          Dot visibility is controlled by <code>stroke</code> colour set via
          the <code>[data-carbon-theme]</code> attribute on an ancestor element:
        </p>
        <ul className="panel-list">
          <li><code>g10 / white</code> → <strong>Blue-90</strong> dots</li>
          <li><code>g90 / g100</code> → <strong>Gray-10</strong> (near-white) dots</li>
        </ul>
      </section>
    </div>
    </Theme>
  );
}

export default ProcessingPage;

// Made with Bob
