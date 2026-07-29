import styled from 'styled-components'
import useSound from "use-sound";
import type {ButtonHTMLAttributes, MouseEvent} from "react";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "text"
}

export function ActionButton({onClick, variant = "default", ...rest}: ActionButtonProps) {
    const [play] = useSound('/sounds/click.mp3', {html5: true, volume: 0.2});
    const [hover] = useSound('/sounds/hover.mp3', {html5: true, volume: 0.2});

    function handleClick(e: MouseEvent<HTMLButtonElement>) {
        play()
        onClick?.(e)
    }

    function handleMouseEnter() {
        hover()
    }

    return (
        <StyledActionButton
            type="button"
            $variant={variant}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            {...rest}
        />
    )
}

const StyledActionButton = styled.button<{ $variant: "default" | "text" }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: ${({theme}) => theme.font.body};
    transition: border-color 0.2s ease, color 0.2s ease;
    cursor: none;
    color: ${({theme}) => theme.colors.text};

    ${({$variant, theme}) => $variant === "default" ? `
        min-width: 32px;
        height: 32px;
        padding: 0 ${theme.spacing(1.5)};
        border: 1px solid ${theme.colors.line};
        background: transparent;
    ` : `
        min-width: 0;
        height: auto;
        padding: 0;
        border: none;
        background: none;
        text-decoration: underline;
        text-underline-offset: 2px;
    `}
    &:hover {
        color: ${({theme}) => theme.colors.accent};
        ${({$variant, theme}) => $variant === "default" && `border-color: ${theme.colors.accent};`}
    }
`