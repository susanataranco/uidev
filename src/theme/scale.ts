export const spacingScale = {
    none: 0,   // 0px = 0rem
    xs: 0.5,   // → theme.spacing(0.5) = 4px = 0.25rem
    s: 1,      // → 8px  = 0.5rem
    m: 2,      // → 16px = 1rem
    l: 3,      // → 24px = 1.5rem
    xl: 4,     // → 32px = 2rem
    xxl: 6,    // → 48px = 3rem
} as const;

export type SpacingKey = keyof typeof spacingScale;