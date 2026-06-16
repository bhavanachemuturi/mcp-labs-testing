/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import { usePrefix } from '@carbon-labs/utilities/usePrefix';

/** Primary UI component for user interaction */

const Processing = ({
  loop = true,
  ...rest
}) => {
  const prefix = usePrefix();
  const blockClass = `${prefix}--processing`;
  const getAnimationEffect = () => {
    if (loop == true) {
      return 'linear';
    } else {
      return 'linear--no-loop';
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `${blockClass} ${blockClass}__${getAnimationEffect()}`
  }, /*#__PURE__*/React.createElement("svg", {
    className: `${blockClass}__dots`,
    viewBox: "0 0 32 32"
  }, /*#__PURE__*/React.createElement("circle", {
    className: `${blockClass}__dot ${blockClass}__dot--left`,
    cx: "8",
    cy: "16"
  }), /*#__PURE__*/React.createElement("circle", {
    className: `${blockClass}__dot ${blockClass}__dot--center`,
    cx: "16",
    cy: "16",
    r: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    className: `${blockClass}__dot ${blockClass}__dot--right`,
    cx: "24",
    cy: "16",
    r: "2"
  })));
};
Processing.displayName = 'Processing';
Processing.propTypes = {
  /**
   * Specify whether the animation should loop
   */
  loop: PropTypes.bool
};

export { Processing as default };
