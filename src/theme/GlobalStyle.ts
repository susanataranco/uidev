import {createGlobalStyle} from 'styled-components'
import {utilityClasses} from "./utilities";
import {spacingUtilities} from "./spacingUtilities";

export const GlobalStyle = createGlobalStyle`
    body {
        background: ${({theme}) => theme.colors.background};
        color: ${({theme}) => theme.colors.text};
        font-family: ${({theme}) => theme.font.family.body};
        cursor: none;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        font-synthesis: none;
    }

    ${utilityClasses}
    ${spacingUtilities}
`