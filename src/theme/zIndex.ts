export const zIndexScale = {
    behind: -1,
    base: 0,
    raised: 10,
    sticky: 100,
    dropdown: 200,
    overlay: 300,
    modal: 400,
    toast: 500,
    cursor: 900,
} as const;

export type ZIndexKey = keyof typeof zIndexScale;

export const zIndex = (key: ZIndexKey): number => zIndexScale[key];