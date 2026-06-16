export { Processing as default };
/** Primary UI component for user interaction */
declare function Processing({ loop, ...rest }: {
    [x: string]: any;
    loop?: boolean | undefined;
}): React.DetailedReactHTMLElement<{
    className: string;
}, HTMLElement>;
declare namespace Processing {
    let displayName: string;
    namespace propTypes {
        let loop: PropTypes.Requireable<boolean>;
    }
}
import React from 'react';
import PropTypes from 'prop-types';
