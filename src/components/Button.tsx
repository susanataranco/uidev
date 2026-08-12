import styled, {css} from 'styled-components'
import type {DefaultTheme} from 'styled-components'
import type {MouseEvent, ReactNode} from 'react'
import useSound from "use-sound"
import {cornerCutShape, sciFiFrame} from "../theme/sciFi.ts"

type ButtonColor = keyof DefaultTheme['colors']['semantic']

interface CustomButtonProps {
    variant?: "button" | "text"
    color?: ButtonColor
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
    className?: string
    children?: ReactNode
}

export function Button({
                           onClick,
                           variant = "button",
                           color = "accent",
                           className,
                           children,
                           ...rest
                       }: CustomButtonProps) {
    const [play] = useSound('/sounds/click.mp3', {html5: true, volume: 0.2})
    const [hover] = useSound('/sounds/hover.mp3', {html5: true, volume: 0.2})

    function handleClick(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        play()
        onClick?.(e)
    }

    return (
        <StyledButton
            className={className}
            onClick={handleClick}
            onMouseEnter={() => hover()}
            $variant={variant}
            $color={color}
            {...rest}
        >
            {children}
        </StyledButton>
    )
}

const StyledButton = styled.button<{ $variant: "button" | "text"; $color: ButtonColor }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 30px;
    padding: ${({theme}) => theme.spacing(1)} ${({theme}) => theme.spacing(2)};
    font-family: ${({theme}) => theme.fonts.family.body};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${({theme}) => theme.colors.ui.text};
    cursor: none;
    transition: color 0.2s ease;
    background: transparent;
    border: 0;

    ${({$variant, $color, theme}) => $variant === "text" ? css`
    ` : css`
        ${cornerCutShape(8)}
        ${sciFiFrame(theme.colors.semantic[$color])}
    `}
`