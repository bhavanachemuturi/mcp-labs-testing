import React, { useMemo, useState } from 'react';
import { Toggle } from '@carbon/react';
import UIShellPage from './pages/UIShellPage';
import AnimatedHeaderPage from './pages/AnimatedHeaderPage';
import WhatsNewPage from './pages/WhatsNewPage';
import ResizerPage from './pages/ResizerPage';
import ProcessingPage from './pages/ProcessingPage';
import './App.scss';

const tabs = [
  'UIShell',
  'AnimatedHeader',
  'WhatsNew',
  'Resizer',
  'Processing',
];

// Tabs that show the theme toggle
const THEMED_TABS = new Set(['UIShell', 'WhatsNew', 'Resizer', 'Processing']);

function App() {
  const [activeTab, setActiveTab] = useState('UIShell');
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? 'g100' : 'white';

  const pageContent = useMemo(() => {
    switch (activeTab) {
      case 'UIShell':
        return <UIShellPage theme={theme} />;
      case 'AnimatedHeader':
        return <AnimatedHeaderPage />;
      case 'WhatsNew':
        return <WhatsNewPage theme={theme} />;
      case 'Resizer':
        return <ResizerPage theme={theme} />;
      case 'Processing':
        return <ProcessingPage theme={theme} />;
      default:
        return <UIShellPage theme={theme} />;
    }
  }, [activeTab, theme]);

  const isUIShell = activeTab === 'UIShell';
  const isAnimatedHeader = activeTab === 'AnimatedHeader';
  const showThemeToggle = THEMED_TABS.has(activeTab);

  return (
    <div className={`App${isDark ? ' App--dark' : ' App--light'}`}>
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

          {showThemeToggle && (
            <div className="top-tabs__theme-toggle">
              <Toggle
                id="theme-toggle"
                labelText=""
                hideLabel
                labelA="Light"
                labelB="Dark"
                toggled={isDark}
                onToggle={(checked) => setIsDark(checked)}
                size="sm"
              />
              <span className="top-tabs__theme-label">
                {isDark ? 'Dark' : 'Light'}
              </span>
            </div>
          )}
        </div>
      </nav>

      {isUIShell ? (
        <div className="uishell-fullbleed">{pageContent}</div>
      ) : isAnimatedHeader ? (
        <div className="animated-header-fullbleed">{pageContent}</div>
      ) : (
        <main className={`app-shell${isDark ? '' : ' app-shell--light'}`}>{pageContent}</main>
      )}
    </div>
  );
}

export default App;

// Made with Bob
