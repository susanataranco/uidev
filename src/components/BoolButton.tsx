import styled, {type DefaultTheme} from 'styled-components'
import useSound from "use-sound";
import type {ButtonHTMLAttributes, MouseEvent} from "react";
import {cornerCutShape, sciFiFrame} from "../theme/sciFi.ts";

interface BoolButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    active: boolean
    color?: keyof DefaultTheme["colors"]["semantic"]
}

export function BoolButton({active, onClick, color = "accent", ...rest}: BoolButtonProps) {
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
            $color={color}
            className={active ? "" : "inactive"}
            {...rest}
        />
    )
}

const StyledBoolButton = styled.button<{ $active: boolean; $color: keyof DefaultTheme["colors"]["semantic"] }>`
    ${cornerCutShape(8)}
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: ${({theme}) => theme.spacing(1)} ${({theme}) => theme.spacing(2)};
    border: 1px solid ${({theme}) => theme.colors.ui.line};
    color: ${({theme}) => theme.colors.ui.text};
    font-family: ${({theme}) => theme.fonts.family.body};
    text-transform: uppercase;
    text-decoration: none;
    transition: color 0.2s ease;
    cursor: none;

    ${({theme, $color}) => sciFiFrame(theme.colors.semantic[$color])}
`