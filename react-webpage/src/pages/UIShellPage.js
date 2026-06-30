import React, { useState } from 'react';
import {
  HeaderDivider,
  HeaderOverflowPanel,
  HeaderPopover,
  HeaderPopoverActions,
  HeaderPopoverButton,
  HeaderPopoverContent,
  Profile,
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
  SideNavSlot,
  SideNavTitle,
  TrialCountdown,
} from '@carbon-labs/react-ui-shell';
import {
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  Theme,
} from '@carbon/react';
import {
  Notification,
  UserAvatar,
  Search,
  Help,
  Settings,
  Home,
  Dashboard,
  Analytics,
  Watson,
  Security,
} from '@carbon/icons-react';

// Profile namespace: Profile.Profile is the root, Profile.UserInfo / Profile.ReadOnly are sub-components
const ProfileRoot = Profile.Profile;
const ProfileUserInfo = Profile.UserInfo;
const ProfileReadOnly = Profile.ReadOnly;

// Nav tabs mirroring the Carbon Labs UIShell storybook sub-navigation
const NAV_TABS = [
  { id: 'purpose', label: 'Purpose and function' },
  { id: 'usage', label: 'Usage' },
  { id: 'style', label: 'Style' },
  { id: 'accessibility', label: 'Accessibility' },
];

function UIShellPage({ theme = 'g100' }) {
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(true);
  const [activeNav, setActiveNav] = useState('purpose');

  const isLight = theme === 'white' || theme === 'g10';

  return (
    <Theme theme={theme}>
      {/* ─────────────────────────────────────────────────────────────────
          Header  (Carbon: position:fixed, z-index:8000)
          ───────────────────────────────────────────────────────────────── */}
      <Header aria-label="IBM Platform Name">
        {/* Hamburger toggle for the side nav */}
        <HeaderMenuButton
          aria-label={isSideNavExpanded ? 'Close navigation' : 'Open navigation'}
          isActive={isSideNavExpanded}
          isCollapsible
          onClick={() => setIsSideNavExpanded((prev) => !prev)}
        />

        {/* Product name */}
        <HeaderName href="#" prefix="IBM">
          [Platform]
        </HeaderName>

        {/* Secondary navigation tabs — mirroring the Carbon Labs storybook
            "Purpose and function / Usage / Style / Accessibility" sub-nav  */}
        <HeaderNavigation aria-label="UIShell navigation">
          {NAV_TABS.map((tab) => (
            <HeaderMenuItem
              key={tab.id}
              href="#"
              isActive={activeNav === tab.id}
              onClick={(e) => {
                e.preventDefault();
                setActiveNav(tab.id);
              }}
            >
              {tab.label}
            </HeaderMenuItem>
          ))}
        </HeaderNavigation>

        {/* Trial countdown — right-aligned before the global icon bar */}
        <div className="header-trial-countdown">
          <TrialCountdown count={14} text="Trial days left" warning={false} />
        </div>

        {/* Global icon actions — always flush right */}
        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="Search" tooltipAlignment="center">
            <Search size={20} />
          </HeaderGlobalAction>

          <HeaderDivider />

          <HeaderGlobalAction aria-label="Notifications" tooltipAlignment="center">
            <Notification size={20} />
          </HeaderGlobalAction>

          <HeaderDivider />

          {/* Help — toggletip popover */}
          <HeaderPopover align="bottom-end">
            <HeaderPopoverButton label="Help">
              <Help size={20} />
            </HeaderPopoverButton>
            <HeaderPopoverContent>
              <HeaderPopoverActions>
                <div className="uishell-popover-body">
                  <p className="uishell-popover-heading">Help &amp; Support</p>
                  <p className="uishell-popover-text">
                    Access documentation, tutorials, and support resources.
                  </p>
                </div>
              </HeaderPopoverActions>
            </HeaderPopoverContent>
          </HeaderPopover>

          <HeaderDivider />

          {/* Profile — user info + read-only account fields */}
          <ProfileRoot label="User profile" renderIcon={<UserAvatar size={20} />}>
            <ProfileUserInfo name="Jane Smith" email="jane.smith@ibm.com" />
            <ProfileReadOnly
              items={[
                { label: 'Role', title: 'Administrator' },
                { label: 'Account', title: 'IBM Cloud' },
              ]}
            />
          </ProfileRoot>

          {/* HeaderOverflowPanel — only visible below lg breakpoint */}
          <HeaderOverflowPanel label="More options">
            <SideNav
              aria-label="Overflow navigation"
              expanded
              isChildOfHeader={false}
              isFixedNav
              hideOverlay
              headerOverflowPanel>
              <SideNavItems>
                <SideNavTitle>Products</SideNavTitle>
                <SideNavMenu title="Overview" defaultExpanded>
                  <SideNavMenuItem href="#" isActive>
                    Dashboard
                  </SideNavMenuItem>
                  <SideNavMenuItem href="#">Analytics</SideNavMenuItem>
                </SideNavMenu>
                <SideNavMenu title="Services">
                  <SideNavMenuItem href="#">Catalog</SideNavMenuItem>
                  <SideNavMenuItem href="#">Resource list</SideNavMenuItem>
                </SideNavMenu>
                <SideNavLink href="#" renderIcon={Settings}>
                  Settings
                </SideNavLink>
              </SideNavItems>
            </SideNav>
          </HeaderOverflowPanel>
        </HeaderGlobalBar>
      </Header>

      {/* ─────────────────────────────────────────────────────────────────
          Side Navigation  (Carbon: position:fixed, top: 48px)
          ───────────────────────────────────────────────────────────────── */}
      <SideNav
        aria-label="Side navigation"
        expanded={isSideNavExpanded}
        isFixedNav
        isChildOfHeader={false}
        onOverlayClick={() => setIsSideNavExpanded(false)}>
        <SideNavItems>
          <SideNavTitle>Products</SideNavTitle>

          <SideNavLink href="#" renderIcon={Home} isActive>
            Dashboard
          </SideNavLink>

          <SideNavMenu title="Overview" defaultExpanded renderIcon={Dashboard}>
            <SideNavMenuItem href="#" isActive>
              Resource list
            </SideNavMenuItem>
            <SideNavMenuItem href="#">Catalog</SideNavMenuItem>
            <SideNavMenuItem href="#">Activity log</SideNavMenuItem>
          </SideNavMenu>

          <SideNavMenu title="Analytics" renderIcon={Analytics}>
            <SideNavMenuItem href="#">Reports</SideNavMenuItem>
            <SideNavMenuItem href="#">Dashboards</SideNavMenuItem>
          </SideNavMenu>

          <SideNavMenu title="AI &amp; Watson" renderIcon={Watson}>
            <SideNavMenuItem href="#">Models</SideNavMenuItem>
            <SideNavMenuItem href="#">Experiments</SideNavMenuItem>
          </SideNavMenu>

          <SideNavLink href="#" renderIcon={Security}>
            Security
          </SideNavLink>

          {/* SideNavSlot — pinned to bottom of nav, shows TrialCountdown */}
          <SideNavSlot>
            <TrialCountdown count={14} text="Trial days left" warning={false} />
          </SideNavSlot>
        </SideNavItems>
      </SideNav>

      {/* ─────────────────────────────────────────────────────────────────
          Main content
          cds--content supplies margin-inline-start: 256px (sidenav width)
          uishell-page-content adds the top padding to clear the fixed header
          ───────────────────────────────────────────────────────────────── */}
      <main className={`cds--content uishell-page-content${isSideNavExpanded ? ' uishell-page-content--nav-open' : ''}`}>
        {activeNav === 'purpose' && (
          <>
            <h1>Purpose and function</h1>
            <p>
              The shell is perhaps the most crucial piece of any UI built with
              Carbon. It contains the shared navigation framework for the entire
              design system and ties the products in IBM's portfolio together in
              a cohesive and elegant way. The shell is the home of the topmost
              navigation, where users can quickly and dependably gain their
              bearings and move between pages.
            </p>
            <p>
              The shell was designed with maximum flexibility built in, to serve
              the needs of a broad range of products and users. Adopting the
              shell ensures compliance with IBM design standards, simplifies
              development efforts, and provides great user experiences. All IBM
              products built with Carbon are required to use the shell's header.
            </p>

            <h2>Shell UI components</h2>
            <p>
              The UI shell is made up of three components: the{' '}
              <strong>header</strong>, the <strong>left panel</strong>, and the{' '}
              <strong>right panel</strong>. All three can be used independently,
              but the components were designed to work together.
            </p>
            <table className="uishell-table">
              <thead>
                <tr>
                  <th>Shell UI component</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Header</strong></td>
                  <td>The highest level of navigation. The header can be used on its own for simple products or be used to trigger the left and right panels.</td>
                </tr>
                <tr>
                  <td><strong>Left panel</strong></td>
                  <td>An optional panel that is used for a product's navigation.</td>
                </tr>
                <tr>
                  <td><strong>Right panel</strong></td>
                  <td>An optional panel that shows additional system-level actions or content associated with a system icon in the header.</td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        {activeNav === 'usage' && (
          <>
            <h1>Usage</h1>
            <p>
              This header is part of the Carbon UI shell. A shell is a
              collection of components shared by all products within a platform.
              It provides a common set of interaction patterns that persist
              between and across products.
            </p>
            <h2>Left panel</h2>
            <p>
              This left panel is part of the Carbon UI shell. The left panel
              contains secondary navigation and is positioned below the header
              and fixed to the left. Both links and sub-menus can be used in
              the side-nav and may be mixed together.
            </p>
            <p>
              Use the left panel if there are more than five secondary
              navigation items, or if you expect a user to switch between
              secondary items frequently. Sub-menus are denoted with a chevron
              and expand when clicked, pushing the other items down in the
              panel. The left panel does not support three tiers of navigation.
            </p>
            <h2>Carbon Labs extensions</h2>
            <ul>
              <li><strong>HeaderDivider</strong> — visual separators between header global actions</li>
              <li><strong>HeaderOverflowPanel</strong> — mobile/tablet overflow menu (hidden at lg+ breakpoint)</li>
              <li><strong>HeaderPopover</strong> — toggletip-style popover for utility actions (e.g. Help)</li>
              <li><strong>Profile</strong> — user-avatar popover with name, email, and read-only fields</li>
              <li><strong>SideNavTitle</strong> — labelled section divider inside the left panel</li>
              <li><strong>SideNavSlot</strong> — pinned slot at the bottom for auxiliary content</li>
              <li><strong>TrialCountdown</strong> — trial days remaining badge</li>
            </ul>
          </>
        )}

        {activeNav === 'style' && (
          <>
            <h1>Style</h1>
            <p>
              The UI shell is built on Carbon's design token system. All colors,
              spacing, and typography values reference tokens so the shell
              automatically adapts to any Carbon theme — white, g10, g90,
              or g100. This demo uses the <strong>g100</strong> (dark) theme.
            </p>
            <h2>Design tokens in use</h2>
            <ul>
              <li><code>$background</code> — shell and popover backgrounds</li>
              <li><code>$border-subtle</code> — header dividers and slot borders</li>
              <li><code>$text-primary</code> / <code>$text-secondary</code> — nav labels</li>
              <li><code>$background-selected</code> — active nav item highlight</li>
              <li><code>$border-interactive</code> — active item left-border accent</li>
              <li><code>$icon-primary</code> / <code>$icon-secondary</code> — header icons</li>
            </ul>
          </>
        )}

        {activeNav === 'accessibility' && (
          <>
            <h1>Accessibility</h1>
            <p>
              The UI shell header is the foundation for navigating and orienting
              your user to the UI. Carbon already incorporates accessibility for
              the standard shell components — no additional design annotations
              are needed for the header or left panel in most cases.
            </p>
            <h2>Keyboard navigation</h2>
            <ul>
              <li><kbd>Tab</kbd> — moves focus forward through interactive header elements</li>
              <li><kbd>Shift + Tab</kbd> — moves focus backward</li>
              <li><kbd>Enter</kbd> / <kbd>Space</kbd> — activates a focused button or link</li>
              <li><kbd>Escape</kbd> — closes an open popover or panel</li>
              <li><kbd>↑</kbd> <kbd>↓</kbd> — navigate within open menus</li>
            </ul>
            <h2>Screen readers</h2>
            <ul>
              <li><strong>VoiceOver</strong> — Control-Option-Space or Space to trigger state change</li>
              <li><strong>JAWS</strong> — Enter or Space to trigger state change</li>
              <li><strong>NVDA</strong> — Enter or Space to trigger state change</li>
            </ul>
          </>
        )}
      </main>
    </Theme>
  );
}

export default UIShellPage;

// Made with Bob
