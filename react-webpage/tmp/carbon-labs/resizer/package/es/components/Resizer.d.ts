/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
export declare const DEBOUNCE_DELAY = 100;
/** Primary UI component for user interaction */
interface ResizerProps {
    orientation: 'horizontal' | 'vertical';
    onResize?: (event: MouseEvent | KeyboardEvent, delta: number) => void;
    onResizeEnd?: (event: MouseEvent | KeyboardEvent, ref: React.RefObject<HTMLDivElement>) => void;
    onDoubleClick?: (event: MouseEvent) => string | void;
    className?: string;
    children?: React.ReactNode;
    thickness?: number;
    [key: string]: any;
}
export declare const Resizer: React.ForwardRefExoticComponent<Omit<ResizerProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export default Resizer;
