/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Processing from '../components/Processing';
import type { Meta } from '@storybook/react-webpack5';
import '../components/processing.scss';
declare const meta: Meta<typeof Processing>;
export default meta;
export declare const LinearLoop: {
    (args: any): import("react/jsx-runtime").JSX.Element;
    argTypes: {
        loop: {
            description: string;
        };
    };
    args: {
        loop: boolean;
    };
};
export declare const LinearNoLoop: {
    (args: any): import("react/jsx-runtime").JSX.Element;
    argTypes: {
        loop: {
            description: string;
        };
    };
    args: {
        loop: boolean;
    };
};
