import styled from 'styled-components'
import useSound from "use-sound";
import type {ButtonHTMLAttributes, MouseEvent} from "react";

interface BoolButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    active: boolean
}

export function BoolButton({active, onClick, ...rest}: BoolButtonProps) {
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
        <StyledBoolButton
            type="button"
            $active={active}
            aria-pressed={active}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            {...rest}
        />
    )
}

const StyledBoolButton = styled.button<{ $active: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: ${({theme}) => theme.spacing(1)} ${({theme}) => theme.spacing(2)};
    border: 1px solid ${({theme}) => theme.colors.line};
    background: ${({$active, theme}) => $active ? theme.colors.line : "transparent"};
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.font.body};
    text-transform: uppercase;
    text-decoration: none;
    transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
    cursor: none;

    &:hover {
        border-color: ${({theme}) => theme.colors.accent};
        color: ${({theme}) => theme.colors.accent};
    }
`