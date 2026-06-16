import React from 'react';
import { Resizer } from '@carbon-labs/react-resizer';

function ResizerPage() {
  return (
    <div className="page-stack">
      <div className="hero-section">
        <p className="eyebrow">Carbon Labs</p>
        <h1>Resizer</h1>
        <p className="hero-copy">
          A page reserved for resizable workspace layouts and split-pane interactions.
        </p>
      </div>

      {/* Horizontal Resizer Demo */}
      <section className="page-panel">
        <div className="demo-header">
          <div>
            <p className="demo-label">Horizontal Layout</p>
            <h2>Horizontal Resizer</h2>
            <p>Drag the vertical divider to resize the panels horizontally.</p>
          </div>
        </div>

        <div className="resizer-demo">
          <div className="panel panel-primary" style={{ width: '300px' }}>
            <div>
              <h3>Primary Panel</h3>
              <p>This panel can be resized by dragging the divider to the right.</p>
              <ul className="panel-list">
                <li>Flexible width adjustment</li>
                <li>Smooth resize interaction</li>
                <li>Maintains content integrity</li>
                <li>Responsive to user input</li>
              </ul>
            </div>
          </div>

          <Resizer
            orientation="vertical"
            className="workspace-resizer"
            thickness={6}
          />

          <div className="panel panel-secondary" style={{ flex: 1 }}>
            <div>
              <h3>Secondary Panel</h3>
              <p>This panel automatically adjusts to fill the remaining space.</p>
              <ul className="panel-list">
                <li>Auto-adjusting width</li>
                <li>Complementary to primary panel</li>
                <li>Maintains layout balance</li>
                <li>Flexible content area</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Resizer Demo */}
      <section className="page-panel">
        <div className="demo-header">
          <div>
            <p className="demo-label">Vertical Layout</p>
            <h2>Vertical Resizer</h2>
            <p>Drag the horizontal divider to resize the panels vertically.</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '400px', borderRadius: '0.75rem', overflow: 'hidden', background: 'rgba(0, 0, 0, 0.18)' }}>
          <div className="panel panel-primary" style={{ height: '200px', minHeight: '100px' }}>
            <div>
              <h3>Top Panel</h3>
              <p>This panel can be resized by dragging the divider below.</p>
              <ul className="panel-list">
                <li>Vertical height control</li>
                <li>Smooth drag interaction</li>
                <li>Content preservation</li>
              </ul>
            </div>
          </div>

          <Resizer
            orientation="horizontal"
            className="workspace-resizer"
            thickness={6}
          />

          <div className="panel panel-secondary" style={{ flex: 1, minHeight: '100px' }}>
            <div>
              <h3>Bottom Panel</h3>
              <p>This panel automatically fills the remaining vertical space.</p>
              <ul className="panel-list">
                <li>Auto-adjusting height</li>
                <li>Flexible content display</li>
                <li>Responsive layout</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Complex Layout Demo */}
      <section className="page-panel">
        <div className="demo-header">
          <div>
            <p className="demo-label">Advanced Layout</p>
            <h2>Complex Resizable Layout</h2>
            <p>Multiple resizers working together for a sophisticated workspace.</p>
          </div>
        </div>

        <div style={{ display: 'flex', minHeight: '400px', borderRadius: '0.75rem', overflow: 'hidden', background: 'rgba(0, 0, 0, 0.18)' }}>
          <div className="panel" style={{ width: '250px', background: 'rgba(15, 98, 254, 0.14)' }}>
            <div>
              <h3>Sidebar</h3>
              <p>Navigation and tools</p>
              <ul className="panel-list">
                <li>File explorer</li>
                <li>Search tools</li>
                <li>Extensions</li>
                <li>Settings</li>
              </ul>
            </div>
          </div>

          <Resizer
            orientation="vertical"
            className="workspace-resizer"
            thickness={6}
          />

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="panel" style={{ height: '200px', background: 'rgba(255, 255, 255, 0.04)' }}>
              <h3>Editor Area</h3>
              <p>Main content editing space with syntax highlighting and code completion.</p>
            </div>

            <Resizer
              orientation="horizontal"
              className="workspace-resizer"
              thickness={6}
            />

            <div className="panel" style={{ flex: 1, background: 'rgba(255, 255, 255, 0.06)' }}>
              <h3>Terminal / Output</h3>
              <p>Command line interface and build output display.</p>
            </div>
          </div>

          <Resizer
            orientation="vertical"
            className="workspace-resizer"
            thickness={6}
          />

          <div className="panel" style={{ width: '250px', background: 'rgba(255, 255, 255, 0.04)' }}>
            <div>
              <h3>Properties</h3>
              <p>Inspector and details</p>
              <ul className="panel-list">
                <li>Component props</li>
                <li>Styles inspector</li>
                <li>Debug info</li>
                <li>Performance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="page-panel">
        <h2>Resizer Features</h2>
        <p>The Carbon Labs Resizer component provides powerful layout control:</p>
        <ul className="panel-list">
          <li><strong>Orientation Support</strong> - Both horizontal and vertical resizing</li>
          <li><strong>Smooth Interactions</strong> - Debounced resize events for performance</li>
          <li><strong>Customizable Thickness</strong> - Adjustable divider size</li>
          <li><strong>Event Callbacks</strong> - onResize, onResizeEnd, and onDoubleClick handlers</li>
          <li><strong>Keyboard Accessible</strong> - Full keyboard navigation support</li>
          <li><strong>Flexible Styling</strong> - Custom className support for theming</li>
          <li><strong>Nested Layouts</strong> - Support for complex multi-panel arrangements</li>
        </ul>
      </section>
    </div>
  );
}

export default ResizerPage;

// Made with Bob
