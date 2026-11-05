import {css} from 'styled-components'

export const cornerCutShape = (cut = 8) => css`
    --border-cut: ${cut}px;
    --button-shape: polygon(
            calc(100% - var(--border-cut)) 0,
            100% var(--border-cut),
            100% 100%,
            var(--border-cut) 100%,
            0 calc(100% - var(--border-cut)),
            0 0
    );
`

interface ColorSet {
    base: string
    dim: string
    glow: string
}

export const sciFiFrame = (color: ColorSet, borderWidth = 1) => css`
    position: relative;
    z-index: 1;
    background: transparent;
    border: 0;

    &::before,
    &::after {
        content: '';
        position: absolute;
        inset: ${borderWidth}px;
        clip-path: var(--button-shape);
        z-index: -1;
        transition: box-shadow 0.25s ease, background-color 0.25s ease;
    }

    &::before {
        inset: 0;
        background: ${color.base};
    }

    &::after {
        background: ${color.dim};
        box-shadow: inset 0 0 18px -8px ${color.glow};
    }

    &:hover::after,
    &:focus-visible::after {
        box-shadow: inset 0 0 26px -4px ${color.glow};
    }

    &.inactive {
        &::before {
            inset: 0;
            background: ${color.dim};
        }

        &::after {
            background: ${color.dim};
            box-shadow: inset 0 0 18px -8px ${color.dim};
        }

        &:hover::after,
        &:focus-visible::after {
            box-shadow: inset 0 0 26px -4px ${color.glow};
        }
    }
`