/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var _rollupPluginBabelHelpers = require('../_virtual/_rollupPluginBabelHelpers.js');
var React = require('react');
var index$1 = require('../node_modules/@carbon/layout/es/index.js');
var usePrefix = require('@carbon-labs/utilities/usePrefix');
var cx = require('classnames');
var index = require('../_virtual/index.js');

var _span;
const DEBOUNCE_DELAY = 100;
/** Primary UI component for user interaction */

const getRefElement = ref => {
  if (!ref || !('current' in ref)) {
    return null;
  }
  return ref.current;
};
const Resizer = /*#__PURE__*/React.forwardRef(({
  orientation,
  onResize,
  onResizeEnd,
  onDoubleClick,
  className,
  children,
  thickness = 4,
  ...rest
}, forwardedRef) => {
  const prefix = usePrefix.usePrefix();
  const blockClass = `${prefix}__resizer`;
  const internalRef = React.useRef(null);
  const ref = forwardedRef || internalRef; // combine refs, forwarded ref takes priority over internal ref
  const [isResizing, setIsResizing] = React.useState(false);
  const startPos = React.useRef({
    x: 0,
    y: 0
  });
  // Sizes of the previous and next siblings, gets modified during resizing
  const sizes = React.useRef({
    prevSiblingSize: {
      width: 0,
      height: 0
    },
    nextSiblingSize: {
      width: 0,
      height: 0
    }
  });
  // Initial sizes of the previous and next siblings, a static reference
  const initialSizes = React.useRef({
    prevSiblingSize: {
      width: 0,
      height: 0
    },
    nextSiblingSize: {
      width: 0,
      height: 0
    }
  });

  // Debounced function to handle resize end events
  // This is used to prevent multiple calls during a resize operation especially from keyboard when the key is held down
  // It will only call the onResizeEnd after the user has stopped resizing
  const debouncedResizeEnd = React.useRef(index.default(event => {
    const element = getRefElement(ref);
    if (element && onResizeEnd) {
      onResizeEnd(event, ref);
    }
  }, DEBOUNCE_DELAY));
  React.useEffect(() => {
    const element = getRefElement(ref);
    if (!element) {
      return;
    }
    element.style[orientation === 'horizontal' ? 'blockSize' : 'inlineSize'] = index$1.rem(thickness);
    const prevSibling = element.previousElementSibling;
    const nextSibling = element.nextElementSibling;
    const rect = el => el?.getBoundingClientRect();
    initialSizes.current = {
      prevSiblingSize: prevSibling ? {
        width: rect(prevSibling).width,
        height: rect(prevSibling).height
      } : {
        width: 0,
        height: 0
      },
      nextSiblingSize: nextSibling ? {
        width: rect(nextSibling).width,
        height: rect(nextSibling).height
      } : {
        width: 0,
        height: 0
      }
    };
  }, [ref, thickness, orientation]);
  const updateSizes = React.useCallback((event, delta) => {
    const element = getRefElement(ref);
    if (!element) {
      return;
    }
    if (onResize) {
      onResize(event, delta);
      return;
    }
    const prevSibling = element.previousElementSibling;
    const nextSibling = element.nextElementSibling;
    const prop = orientation === 'horizontal' ? 'height' : 'width';
    if (prevSibling) {
      const newSize = sizes.current.prevSiblingSize[prop] + delta;
      prevSibling.style[prop] = `${newSize}px`;
    }
    if (nextSibling) {
      const newSize = sizes.current.nextSiblingSize[prop] - delta;
      nextSibling.style[prop] = `${newSize}px`;
    }
  }, [onResize, orientation, ref]);
  const handleMouseMove = React.useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
    const delta = orientation === 'horizontal' ? event.clientY - startPos.current.y : event.clientX - startPos.current.x;
    updateSizes(event, delta);
  }, [orientation, updateSizes]);
  const handleMouseUp = React.useCallback(event => {
    const element = getRefElement(ref);
    if (!element) {
      return;
    }
    setIsResizing(false);
    if (onResizeEnd) {
      onResizeEnd(event, ref);
    }
    const prevSibling = element.previousElementSibling;
    const nextSibling = element.nextElementSibling;
    if (prevSibling) {
      prevSibling.style.transition = '';
    }
    if (nextSibling) {
      nextSibling.style.transition = '';
    }
  }, [onResizeEnd, ref]);

  // Effect to add/remove mousemove and mouseup listeners during resizing
  React.useEffect(() => {
    if (!isResizing) {
      return;
    }
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);
  const handleMouseDown = React.useCallback(event => {
    const element = getRefElement(ref);
    if (!element || event.button !== 0) {
      return;
    }
    const prevSibling = element.previousElementSibling;
    const nextSibling = element.nextElementSibling;
    const rect = el => el?.getBoundingClientRect();
    prevSibling && (prevSibling.style.transition = 'none');
    nextSibling && (nextSibling.style.transition = 'none');
    setIsResizing(true);
    startPos.current = {
      x: event.clientX,
      y: event.clientY
    };
    sizes.current = {
      prevSiblingSize: prevSibling ? {
        width: rect(prevSibling).width,
        height: rect(prevSibling).height
      } : {
        width: 0,
        height: 0
      },
      nextSiblingSize: nextSibling ? {
        width: rect(nextSibling).width,
        height: rect(nextSibling).height
      } : {
        width: 0,
        height: 0
      }
    };
  }, [ref]);
  const handleKeyDown = React.useCallback(event => {
    const navigationKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (![...navigationKeys, 'PageUp', 'PageDown'].includes(event.key)) {
      return;
    }
    const element = getRefElement(ref);
    if (!element) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    const prevSibling = element.previousElementSibling;
    const nextSibling = element.nextElementSibling;
    const getSize = el => {
      const rect = el?.getBoundingClientRect();
      return {
        width: rect?.width || 0,
        height: rect?.height || 0
      };
    };
    sizes.current = {
      prevSiblingSize: getSize(prevSibling),
      nextSiblingSize: getSize(nextSibling)
    };
    const step = event.shiftKey ? 25 : 5;
    let delta = 0;
    const isHorizontal = orientation === 'horizontal';
    const keyMap = {
      ArrowUp: () => isHorizontal ? delta = -step : null,
      ArrowDown: () => isHorizontal ? delta = step : null,
      ArrowLeft: () => !isHorizontal ? delta = -step : null,
      ArrowRight: () => !isHorizontal ? delta = step : null,
      Home: () => delta = isHorizontal ? -sizes.current.prevSiblingSize.height : -sizes.current.prevSiblingSize.width,
      End: () => delta = isHorizontal ? sizes.current.nextSiblingSize.height : sizes.current.nextSiblingSize.width
    };
    keyMap[event.key]?.();
    updateSizes(event, delta);
    debouncedResizeEnd?.current(event);
  }, [orientation, updateSizes, debouncedResizeEnd, ref]);
  const handleDoubleClick = event => {
    event.preventDefault();
    const element = getRefElement(ref);
    if (!element) {
      return;
    }
    const prevSibling = element.previousElementSibling;
    const nextSibling = element.nextElementSibling;
    if (onDoubleClick) {
      onDoubleClick(event);
    } else {
      const prop = orientation === 'horizontal' ? 'height' : 'width';
      if (prevSibling) {
        prevSibling.style[prop] = `${initialSizes.current.prevSiblingSize[prop]}px`;
      }
      if (nextSibling) {
        nextSibling.style[prop] = `${initialSizes.current.nextSiblingSize[prop]}px`;
      }
    }
  };
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    React.createElement("div", _rollupPluginBabelHelpers.extends({}, rest, {
      ref: ref,
      role: "separator"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      ,
      tabIndex: 0,
      "aria-orientation": orientation,
      "aria-live": "assertive",
      onMouseDown: handleMouseDown,
      onDoubleClick: handleDoubleClick,
      onKeyDown: handleKeyDown,
      className: cx([className, blockClass, `${blockClass}--${orientation}`])
    }), _span || (_span = /*#__PURE__*/React.createElement("span", {
      className: "sr-only"
    }, "Use arrow keys to resize, hold Shift for larger steps. Double-click to reset.")), children)
  );
});
Resizer.displayName = 'Resizer';

exports.DEBOUNCE_DELAY = DEBOUNCE_DELAY;
exports.Resizer = Resizer;
