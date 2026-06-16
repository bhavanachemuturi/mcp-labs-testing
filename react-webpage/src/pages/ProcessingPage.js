import React, { useState } from 'react';
import { Processing } from '@carbon-labs/react-processing';
import { Button } from '@carbon/react';

function ProcessingPage() {
  const [isProcessing1, setIsProcessing1] = useState(true);
  const [isProcessing2, setIsProcessing2] = useState(false);
  const [isProcessing3, setIsProcessing3] = useState(true);

  return (
    <div className="page-stack">
      <div className="hero-section">
        <p className="eyebrow">Carbon Labs</p>
        <h1>Processing</h1>
        <p className="hero-copy">
          A page focused on processing states, progress indicators, and task feedback.
        </p>
      </div>

      {/* Looping Processing Demo */}
      <section className="page-panel">
        <div className="demo-header">
          <div>
            <p className="demo-label">Continuous Animation</p>
            <h2>Looping Processing Indicator</h2>
            <p>A continuous animation that loops indefinitely, perfect for ongoing operations.</p>
          </div>
          <Button
            kind="tertiary"
            size="sm"
            onClick={() => setIsProcessing1(!isProcessing1)}
          >
            {isProcessing1 ? 'Stop' : 'Start'}
          </Button>
        </div>

        <div className="processing-group">
          <div className="processing-item">
            <span className="status-label">Status</span>
            {isProcessing1 && <Processing loop={true} />}
            <p style={{ marginTop: '0.5rem', color: '#c6c6c6' }}>
              {isProcessing1 ? 'Processing...' : 'Idle'}
            </p>
          </div>
        </div>
      </section>

      {/* Non-Looping Processing Demo */}
      <section className="page-panel">
        <div className="demo-header">
          <div>
            <p className="demo-label">Single Animation</p>
            <h2>Non-Looping Processing Indicator</h2>
            <p>A single animation cycle that completes once, ideal for one-time operations.</p>
          </div>
          <Button
            kind="tertiary"
            size="sm"
            onClick={() => setIsProcessing2(!isProcessing2)}
          >
            {isProcessing2 ? 'Reset' : 'Start'}
          </Button>
        </div>

        <div className="processing-group">
          <div className="processing-item">
            <span className="status-label">Status</span>
            {isProcessing2 && <Processing loop={false} />}
            <p style={{ marginTop: '0.5rem', color: '#c6c6c6' }}>
              {isProcessing2 ? 'Processing...' : 'Ready'}
            </p>
          </div>
        </div>
      </section>

      {/* Multiple Processing States Demo */}
      <section className="page-panel">
        <div className="demo-header">
          <div>
            <p className="demo-label">Multiple States</p>
            <h2>Multiple Processing Indicators</h2>
            <p>Manage multiple processing states simultaneously for complex workflows.</p>
          </div>
        </div>

        <div className="processing-group">
          <div className="processing-item">
            <span className="status-label">Task 1</span>
            {isProcessing3 && <Processing loop={true} />}
            <p style={{ marginTop: '0.5rem', color: '#c6c6c6' }}>
              {isProcessing3 ? 'Loading data...' : 'Complete'}
            </p>
            <Button
              kind="ghost"
              size="sm"
              onClick={() => setIsProcessing3(!isProcessing3)}
              style={{ marginTop: '0.5rem' }}
            >
              Toggle
            </Button>
          </div>

          <div className="processing-item">
            <span className="status-label">Task 2</span>
            <Processing loop={true} />
            <p style={{ marginTop: '0.5rem', color: '#c6c6c6' }}>
              Syncing files...
            </p>
          </div>

          <div className="processing-item">
            <span className="status-label">Task 3</span>
            <Processing loop={true} />
            <p style={{ marginTop: '0.5rem', color: '#c6c6c6' }}>
              Building project...
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="page-panel">
        <h2>Processing Component Use Cases</h2>
        <p>The Carbon Labs Processing component is ideal for various scenarios:</p>
        <ul className="panel-list">
          <li><strong>Data Loading</strong> - Show when fetching data from APIs or databases</li>
          <li><strong>File Operations</strong> - Indicate file uploads, downloads, or processing</li>
          <li><strong>Background Tasks</strong> - Display ongoing background operations</li>
          <li><strong>Build Processes</strong> - Show compilation or build progress</li>
          <li><strong>Sync Operations</strong> - Indicate synchronization with external services</li>
          <li><strong>Form Submission</strong> - Provide feedback during form processing</li>
        </ul>
      </section>

      {/* Features Section */}
      <section className="page-panel">
        <h2>Processing Features</h2>
        <p>Key features of the Carbon Labs Processing component:</p>
        <ul className="panel-list">
          <li><strong>Loop Control</strong> - Toggle between continuous and single-cycle animations</li>
          <li><strong>Lightweight</strong> - Minimal performance impact with SVG-based animation</li>
          <li><strong>Accessible</strong> - Built with accessibility in mind</li>
          <li><strong>Themeable</strong> - Integrates seamlessly with Carbon Design System themes</li>
          <li><strong>Flexible</strong> - Can be used inline or as a standalone indicator</li>
          <li><strong>Consistent</strong> - Maintains visual consistency across your application</li>
        </ul>
      </section>
    </div>
  );
}

export default ProcessingPage;

// Made with Bob
