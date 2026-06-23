import React, { useState } from 'react';
import {
  AnimatedHeader,
  dataFabricAnimatedDark,
  dataFabricAnimatedLight,
  dataFabricStaticDark,
  dataFabricStaticLight,
} from '@carbon-labs/react-animated-header';
import { Theme } from '@carbon/react';
import {
  ChatBot,
  Upload,
  CloudMonitoring,
} from '@carbon/icons-react';

// A single tile group containing the three required tiles.
// Each tile's `variant` drives BaseTile's router:
//   'aiPrompt' → AIPromptTile  (AI chat with text input)
//   'glass'    → GlassTile     (standard rectangular feature tile)
const ALL_TILE_GROUPS = [
  {
    id: 1,
    label: 'My tasks',
    tiles: [
      {
        // AI chat tool — rendered as an AIPromptTile (has a text input for prompts)
        tileId: 'ai-chat',
        title: 'AI chat',
        variant: 'aiPrompt',
        primaryIcon: ChatBot,
        href: '#',
        promptPlaceholder: 'Ask AI about your data…',
      },
      {
        // Load data / Data Explorer — rendered as a GlassTile
        tileId: 'load-data',
        title: 'Load data',
        subtitle: 'Import and explore data sources with Data Explorer.',
        variant: 'glass',
        primaryIcon: Upload,
        href: '#',
      },
      {
        // Monitor data performance / system capacity — rendered as a GlassTile
        tileId: 'monitor-performance',
        title: 'Monitor performance',
        subtitle: 'Track system capacity and data pipeline health.',
        variant: 'glass',
        primaryIcon: CloudMonitoring,
        href: '#',
      },
    ],
  },
];

const WORKSPACE_ITEMS = [
  { id: 'workspace-1', label: 'Enterprise workspace' },
  { id: 'workspace-2', label: 'Growth workspace' },
  { id: 'workspace-3', label: 'Innovation workspace' },
];

function AnimatedHeaderShowcase({ theme, animation, staticAsset }) {
  const [selectedTileGroup] = useState(ALL_TILE_GROUPS[0]);
  const [selectedWorkspace, setSelectedWorkspace] = useState(WORKSPACE_ITEMS[0]);

  // workspaceSelectorConfig: setSelectedWorkspace receives the Carbon Dropdown
  // onChange event object { selectedItem }
  const workspaceSelectorConfig = {
    allWorkspaces: WORKSPACE_ITEMS,
    selectedWorkspace,
    setSelectedWorkspace: (e) => {
      if (e?.selectedItem) {
        setSelectedWorkspace(e.selectedItem);
      }
    },
    ariaLabel: 'Select a workspace',
  };

  // The animated-header SCSS scopes its gradient/color overrides to the
  // `data-carbon-theme` attribute (e.g. [data-carbon-theme='g100']).
  // Carbon's <Theme> only adds CSS classes (cds--g10 / cds--g100) — no
  // data attribute — so we supply it via a custom `as` wrapper.
  const ThemeWrapper = React.useMemo(
    () =>
      React.forwardRef((props, ref) => (
        <div {...props} ref={ref} data-carbon-theme={theme} />
      )),
    [theme]
  );

  return (
    <Theme as={ThemeWrapper} theme={theme}>
      <AnimatedHeader
        productName="Carbon Labs"
        description="Connect, monitor, and manage your data."
        welcomeText="Welcome,"
        userName="Preview"
        headerAnimation={animation}
        headerStatic={staticAsset}
        allTileGroups={ALL_TILE_GROUPS}
        selectedTileGroup={selectedTileGroup}
        workspaceSelectorConfig={workspaceSelectorConfig}
        isLoading={false}
        tileClickHandler={(tile) => {
          console.log('Tile clicked:', tile.tileId);
        }}
      />
    </Theme>
  );
}

function AnimatedHeaderPage() {
  return (
    <div className="animated-header-page">
      <AnimatedHeaderShowcase
        theme="g10"
        animation={dataFabricAnimatedLight}
        staticAsset={dataFabricStaticLight}
      />
      <AnimatedHeaderShowcase
        theme="g100"
        animation={dataFabricAnimatedDark}
        staticAsset={dataFabricStaticDark}
      />
    </div>
  );
}

export default AnimatedHeaderPage;

// Made with Bob
