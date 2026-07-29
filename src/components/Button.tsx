import styled from 'styled-components'
import {Link as RouterLink, type LinkProps} from 'react-router-dom'
import {useSceneNavigate} from '../scene/useSceneNavigate'
import type {MouseEvent} from 'react'
import useSound from "use-sound";

export function Button({to, onClick, ...rest}: LinkProps) {
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

    return <StyledButton to={to} onClick={handleClick} onMouseEnter={handleMouseEnter} {...rest} />
}

const StyledButton = styled(RouterLink)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: ${({theme}) => theme.spacing(1)} ${({theme}) => theme.spacing(2)};
    border: 1px solid ${({theme}) => theme.colors.line};
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.font.body};
    text-transform: uppercase;
    text-decoration: none;
    transition: border-color 0.2s ease, color 0.2s ease;
    cursor: none;

    &:hover {
        border-color: ${({theme}) => theme.colors.accent};
        color: ${({theme}) => theme.colors.accent};
    }
`