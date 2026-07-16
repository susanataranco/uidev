export const theme = {
    colors: {
        background: '#0a0b0d',
        surface: '#14161a',
        line: '#2a2d33',
        text: '#f2f2f2',
        textMuted: '#9a9da3',
        accent: '#5eead4',
    },
    font: {
        heading: '"Unbounded", sans-serif',
        body: '"Lekton", monospace',
    },
    spacing: (factor: number) => `${factor * 8}px`,
} as const

export type Theme = typeof theme