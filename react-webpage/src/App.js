import React, { useMemo, useState } from 'react';
import UIShellPage from './pages/UIShellPage';
import AnimatedHeaderPage from './pages/AnimatedHeaderPage';
import WhatsNewPage from './pages/WhatsNewPage';
import ResizerPage from './pages/ResizerPage';
import ProcessingPage from './pages/ProcessingPage';
import './App.css';

const tabs = [
  'UIShell',
  'AnimatedHeader',
  'WhatsNew',
  'Resizer',
  'Processing',
];

function App() {
  const [activeTab, setActiveTab] = useState('UIShell');

  const pageContent = useMemo(() => {
    switch (activeTab) {
      case 'UIShell':
        return <UIShellPage />;
      case 'AnimatedHeader':
        return <AnimatedHeaderPage />;
      case 'WhatsNew':
        return <WhatsNewPage />;
      case 'Resizer':
        return <ResizerPage />;
      case 'Processing':
        return <ProcessingPage />;
      default:
        return <UIShellPage />;
    }
  }, [activeTab]);

  return (
    <div className="App">
      <nav className="top-tabs" aria-label="Primary page navigation">
        <div className="top-tabs__inner">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`top-tabs__button ${activeTab === tab ? 'top-tabs__button--active' : ''}`}
              onClick={() => setActiveTab(tab)}
              aria-current={activeTab === tab ? 'page' : undefined}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <main className="app-shell">{pageContent}</main>
    </div>
  );
}

export default App;

// Made with Bob
