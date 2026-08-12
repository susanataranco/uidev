export const theme = {
    colors: {
        ui: {
            background: "#0b0e14",
            surface: "#131822",

            text: "#e4e8f0",
            textMuted: "#7a8496",

            border: "#6c7387",
            line: "#2a3240",

            cursor: "#e4e8f0",
        },
        semantic: {
            accent: {
                base: '#4fd1ff',
                dim: '#173a4a',
                glow: 'rgba(79, 209, 255, 0.9)',
            },
            success: {
                base: "#2ee6c8",
                dim: "#123a35",
                glow: "rgba(46,230,200,.5)",
            },

            warning: {
                base: "#e8c547",
                dim: "#403411",
                glow: "rgba(232,197,71,.5)",
            },

            danger: {
                base: "#ff5d73",
                dim: "#43161e",
                glow: "rgba(255,93,115,.45)",
            },
        }
    },
    fonts: {
        family: {
            heading: '"Unbounded", sans-serif',
            body: '"Lekton", monospace',
            code: '"Courier New", monospace',
        },

        size: {
            xs: "0.8rem",
            sm: "1rem",
            md: "1.25rem",
            lg: "1.5rem",
            xl: "2rem",
            xxl: "3.625rem",
        },

        weight: {
            regular: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
            black: 800,
        },

        lineHeight: {
            tight: 1.2,
            normal: 1.4,
            relaxed: 1.6,
        },

        letterSpacing: {
            normal: "0",
            wide: "0.05em",
            wider: "0.12em",
        },
    },
    spacing: (factor: number) => `${factor * 8}px`,
    breakpoints: {
        mobile: '768px',
    },
} as const

export type Theme = typeof theme