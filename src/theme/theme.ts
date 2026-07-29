export const theme = {
    colors: {
        background: '#0b0e14',
        surface: '#131822',
        line: '#2a3240',
        frame: '#6c7387',
        text: '#e4e8f0',
        cursor: '#e4e8f0',
        textMuted: '#7a8496',
        accent: '#4fd1ff',
        accentDim: '#1c4a5c',
    },
    font: {
        family: {
            heading: '"Unbounded", sans-serif',
            body: '"Lekton", monospace',
        },
        heading: {
            small: {fontSize: '1.16rem', lineHeight: 1.4, fontWeight: 600},
            medium: {fontSize: '1.5rem', lineHeight: 1.3, fontWeight: 700},
            large: {fontSize: '3.625rem', lineHeight: 1.2, fontWeight: 800},
        },
        body: {
            extrasmall: {fontSize: '0.8rem', lineHeight: 1.6, fontWeight: 400},
            small: {fontSize: '1.16rem', lineHeight: 1.6, fontWeight: 400},
            medium: {fontSize: '1.5rem', lineHeight: 1.6, fontWeight: 400},
            large: {fontSize: '2.063rem', lineHeight: 1.6, fontWeight: 400},
        }
    },
    spacing: (factor: number) => `${factor * 8}px`,
    breakpoints: {
        mobile: '768px',
    },
} as const

export type Theme = typeof theme