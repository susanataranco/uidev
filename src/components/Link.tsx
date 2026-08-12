import styled, {css} from 'styled-components'
import type {DefaultTheme} from 'styled-components'
import {Link as RouterLink, type LinkProps} from 'react-router-dom'
import {useSceneNavigate} from '../hooks/useSceneNavigate.ts'
import type {MouseEvent} from 'react'
import useSound from "use-sound";
import {cornerCutShape, sciFiFrame} from "../theme/sciFi.ts"

interface CustomLinkProps extends LinkProps {
    variant?: "button" | "text"
    color?: keyof DefaultTheme["colors"]["semantic"]
}

export function Link({to, onClick, variant = "text", color = "accent", ...rest}: CustomLinkProps) {
    const [play] = useSound('/sounds/click.mp3', {html5: true, volume: 0.2});
    const [hover] = useSound('/sounds/hover.mp3', {html5: true, volume: 0.2});
    const sceneNavigate = useSceneNavigate()

    function handleClick(e: MouseEvent<HTMLAnchorElement>) {
        e.preventDefault()
        play()
        onClick?.(e)
        sceneNavigate(to.toString())
    }

    function handleMouseEnter() {
        hover()
    }

    return <StyledLink to={to} onClick={handleClick} $variant={variant} $color={color}
                       onMouseEnter={handleMouseEnter} {...rest} />
}

const StyledLink = styled(RouterLink)<{
    $variant: "button" | "text";
    $color: keyof DefaultTheme["colors"]["semantic"]
}>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: ${({theme}) => theme.fonts.family.body};
    text-decoration: none;
    cursor: none;
    transition: color 0.2s ease;
    color: ${({theme}) => theme.colors.ui.text};

    ${({$variant, $color, theme}) => $variant === "text" ? css`
    ` : css`
        ${cornerCutShape(8)}
        min-width: 32px;
        height: 32px;
        padding: 0 ${theme.spacing(1.5)};
        text-transform: uppercase;
        letter-spacing: 0.05em;

        ${sciFiFrame(theme.colors.semantic[$color])}
    `}
    &:hover {
        color: ${({theme, $color}) => theme.colors.semantic[$color].base};
        text-shadow: 0 0 8px ${({theme, $color}) => theme.colors.semantic[$color].glow};
    }

    &:visited {
        color: inherit;
    }
`