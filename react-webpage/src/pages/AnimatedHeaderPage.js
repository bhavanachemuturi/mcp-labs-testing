import React from 'react';
import {
  AnimatedHeader,
  dataFabricAnimatedDark,
  dataFabricAnimatedLight,
  dataFabricStaticDark,
  dataFabricStaticLight,
} from '@carbon-labs/react-animated-header';
import { Theme } from '@carbon/react';

const animatedHeaderTileGroups = [
  {
    id: 'overview',
    title: 'Overview',
    tiles: [
      {
        id: 'workspace',
        title: 'Workspace insights',
        description: 'Track product health, releases, and adoption from one place.',
        variant: 'glass',
      },
      {
        id: 'automation',
        title: 'Automation',
        description: 'Launch guided actions and automate repetitive operational tasks.',
        variant: 'ai',
      },
      {
        id: 'assistant',
        title: 'AI assistant',
        description: 'Summarize changes and generate next-step recommendations.',
        variant: 'ai-prompt',
      },
    ],
  },
];

function AnimatedHeaderShowcase({
  theme,
  title,
  description,
  animation,
  staticAsset,
}) {
  return (
    <Theme theme={theme}>
      <section className={`theme-showcase theme-showcase--${theme.toLowerCase()}`}>
        <div className="theme-showcase__intro">
          <p className="demo-label">{theme}</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="animated-header-frame">
          <AnimatedHeader
            allTileGroups={animatedHeaderTileGroups}
            selectedTileGroup={animatedHeaderTileGroups[0]}
            description="Explore AI-powered workflows, workspace insights, and guided actions."
            productName="Carbon Labs"
            welcomeText="Animated Header"
            userName="Preview"
            headerAnimation={animation}
            headerStatic={staticAsset}
          />
        </div>
      </section>
    </Theme>
  );
}

function AnimatedHeaderPage() {
  return (
    <div className="page-stack">
      <div className="hero-section">
        <p className="eyebrow">Carbon Labs</p>
        <h1>Animated Header</h1>
        <p className="hero-copy">
          Carbon Labs Animated Header examples in both g10 and g100 themes.
        </p>
      </div>

      <AnimatedHeaderShowcase
        theme="g10"
        title="Theme g10"
        description="Light theme example using the Carbon Labs Animated Header component."
        animation={dataFabricAnimatedLight}
        staticAsset={dataFabricStaticLight}
      />

      <AnimatedHeaderShowcase
        theme="g100"
        title="Theme g100"
        description="Dark theme example using the Carbon Labs Animated Header component."
        animation={dataFabricAnimatedDark}
        staticAsset={dataFabricStaticDark}
      />
    </div>
  );
}

export default AnimatedHeaderPage;

// Made with Bob
