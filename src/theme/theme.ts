export const theme = {
    colors: {
        background: '#0b0e14',
        surface: '#131822',
        line: '#2a3240',
        text: '#e4e8f0',
        cursor: '#e4e8f0',
        textMuted: '#7a8496',
        accent: '#4fd1ff',
        accentDim: '#1c4a5c',
    },
    font: {
        heading: '"Unbounded", sans-serif',
        body: '"Lekton", monospace',
    },
    spacing: (factor: number) => `${factor * 8}px`,
    breakpoints: {
        mobile: '768px',
    },
} as const

export type Theme = typeof theme