import {css} from "styled-components";
import {spacingRem} from "./spacing.ts";
import {zIndex} from "./zIndex.ts";

export const utilityClasses = css`
    .uppercase {
        text-transform: uppercase;
    }

    .lowercase {
        text-transform: lowercase;
    }

    .capitalize {
        text-transform: capitalize;
    }

    .italic {
        font-style: italic;
    }

    .truncate {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .text-center {
        text-align: center;
    }

    .text-right {
        text-align: right;
    }

    .text-left {
        text-align: left;
    }

    .relative {
        position: relative;
    }

    .absolute {
        position: absolute;
    }

    .flex {
        display: flex;
    }

    .flex-column {
        flex-direction: column;
    }

    .flex-row {
        flex-direction: row;
    }

    .justify-center {
        justify-content: center;
    }

    .justify-end {
        justify-content: flex-end;
    }

    .justify-between {
        justify-content: space-between;
    }

    .items-center {
        align-items: center;
    }

    .items-start {
        align-items: flex-start;
    }

    .items-end {
        align-items: flex-end;
    }

    .gap-xs {
        gap: ${spacingRem("xs")};
    }

    .gap-s {
        gap: ${spacingRem("s")};
    }

    .gap-m {
        gap: ${spacingRem("m")};
    }

    .gap-l {
        gap: ${spacingRem("l")};
    }

    .h-full {
        height: 100vh;
    }

    .w-full {
        width: 100vw;
    }

    .h-100 {
        height: 100%;
    }

    .w-100 {
        width: 100%;
    }

    .object-cover {
        object-fit: cover;
    }

    .z-behind {
        z-index: ${zIndex("behind")};
    }

    .z-base {
        z-index: ${zIndex("base")};
    }

    .z-raised {
        z-index: ${zIndex("raised")};
    }

    .z-sticky {
        z-index: ${zIndex("sticky")};
    }

    .z-dropdown {
        z-index: ${zIndex("dropdown")};
    }

    .z-overlay {
        z-index: ${zIndex("overlay")};
    }

    .z-modal {
        z-index: ${zIndex("modal")};
    }

    .z-toast {
        z-index: ${zIndex("toast")};
    }

    .z-cursor {
        z-index: ${zIndex("cursor")};
    }
`;