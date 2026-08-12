import {createGlobalStyle} from 'styled-components'
import {utilityClasses} from "./utilities";
import {spacingUtilities} from "./spacingUtilities";

export const GlobalStyle = createGlobalStyle`
    body {
        background: ${({theme}) => theme.colors.ui.background};
        color: ${({theme}) => theme.colors.ui.text};
        font-family: ${({theme}) => theme.fonts.family.body};
        cursor: none;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        font-synthesis: none;
    }

    ${utilityClasses}
    ${spacingUtilities}
`