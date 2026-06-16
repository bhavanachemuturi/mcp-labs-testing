import React, { useState } from 'react';
import {
  HeaderDivider,
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
  TrialCountdown,
} from '@carbon-labs/react-ui-shell';
import { Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction } from '@carbon/react';
import {
  Notification,
  UserAvatar,
  Search,
  Help,
} from '@carbon/icons-react';

function UIShellPage() {
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(true);

  return (
    <div className="uishell-demo">
      <Header aria-label="IBM Platform Name">
        <HeaderName href="#" prefix="IBM">
          [Platform]
        </HeaderName>
        
        <div className="header-trial-countdown">
          <TrialCountdown
            count={30}
            text="Trial days left"
            warning={false}
          />
        </div>
        
        <HeaderGlobalBar>
          <HeaderGlobalAction
            aria-label="Search"
            tooltipAlignment="end">
            <Search size={20} />
          </HeaderGlobalAction>
          
          <HeaderDivider />
          
          <HeaderGlobalAction
            aria-label="Notifications"
            tooltipAlignment="end">
            <Notification size={20} />
          </HeaderGlobalAction>
          
          <HeaderDivider />
          
          <HeaderPopover>
            <HeaderPopoverButton
              aria-label="Help"
              label="Help">
              <Help size={20} />
            </HeaderPopoverButton>
            <HeaderPopoverContent>
              <HeaderPopoverActions>
                <div style={{ padding: '1rem' }}>
                  <h4>Help & Support</h4>
                  <p>Get assistance and documentation</p>
                </div>
              </HeaderPopoverActions>
            </HeaderPopoverContent>
          </HeaderPopover>
          
          <HeaderDivider />
          
          <Profile.Root label="User Profile" renderIcon={<UserAvatar size={20} />}>
            <Profile.UserInfo name="John Doe" email="john.doe@example.com" />
            <Profile.ReadOnly items={[
              { label: 'Role', title: 'Administrator' },
              { label: 'Department', title: 'Engineering' }
            ]} />
          </Profile.Root>
        </HeaderGlobalBar>
      </Header>
      
      <SideNav
        aria-label="Side navigation"
        expanded={isSideNavExpanded}
        isPersistent={true}
        onOverlayClick={() => setIsSideNavExpanded(false)}>
        <SideNavItems>
          <SideNavMenu title="Category 1" defaultExpanded>
            <SideNavMenuItem href="#">Link 1</SideNavMenuItem>
            <SideNavMenuItem href="#">Link 2</SideNavMenuItem>
            <SideNavMenuItem href="#">Link 3</SideNavMenuItem>
          </SideNavMenu>
          
          <SideNavMenu title="Category 2">
            <SideNavMenuItem href="#">Link 1</SideNavMenuItem>
            <SideNavMenuItem href="#">Link 2</SideNavMenuItem>
            <SideNavMenuItem href="#">Link 3</SideNavMenuItem>
          </SideNavMenu>
          
          <SideNavLink href="#">Direct Link 1</SideNavLink>
          <SideNavLink href="#">Direct Link 2</SideNavLink>
          
          <SideNavSlot>
            <div style={{ padding: '1rem', borderTop: '1px solid #393939', marginTop: 'auto' }}>
              <TrialCountdown
                count={14}
                text="Trial days left"
                warning={false}
              />
            </div>
          </SideNavSlot>
          
          <SideNavMenu title="Category 3">
            <SideNavMenuItem href="#">Settings</SideNavMenuItem>
            <SideNavMenuItem href="#">Help</SideNavMenuItem>
          </SideNavMenu>
        </SideNavItems>
      </SideNav>
      
      <div className="uishell-content">
        <h1>Purpose and function</h1>
        <p>
          The shell is perhaps the most crucial piece of any UI built with Carbon. It contains
          the shared navigation framework for the entire design system and ties the products in
          IBM's portfolio together in a cohesive and elegant way. The shell is the home of the
          topmost navigation, where users can quickly and dependably gain their bearings and move
          between pages.
        </p>
        <p>
          The shell was designed with maximum flexibility built in, to serve the needs of a broad
          range of products and users. Adopting the shell ensures compliance with IBM design
          standards, simplifies development efforts, and provides great user experiences. All IBM
          products built with Carbon are required to use the shell's header.
        </p>
        
        <h2>Carbon Labs UIShell Components</h2>
        <p>This demo showcases all Carbon Labs UIShell components:</p>
        <ul>
          <li><strong>HeaderDivider</strong> - Visual separators between header actions</li>
          <li><strong>HeaderOverflowPanel</strong> - Container for overflow content</li>
          <li><strong>HeaderPopover</strong> - Popover with HeaderPopoverButton, HeaderPopoverContent, and HeaderPopoverActions</li>
          <li><strong>Profile</strong> - User profile with Profile.Root, Profile.UserInfo, and Profile.ReadOnly</li>
          <li><strong>SideNav</strong> - Persistent side navigation container</li>
          <li><strong>SideNavItems</strong> - Container for navigation items</li>
          <li><strong>SideNavLink</strong> - Direct navigation links</li>
          <li><strong>SideNavMenu</strong> - Expandable menu categories</li>
          <li><strong>SideNavMenuItem</strong> - Menu items within categories</li>
          <li><strong>SideNavSlot</strong> - Custom content slot for additional elements</li>
          <li><strong>SideNavTitle</strong> - Title for side navigation sections</li>
          <li><strong>TrialCountdown</strong> - Trial period countdown (shown in header and side nav)</li>
        </ul>
      </div>
    </div>
  );
}

export default UIShellPage;

// Made with Bob
