import styled from 'styled-components'
import {Link as RouterLink, type LinkProps} from 'react-router-dom'
import {useSceneNavigate} from '../scene/useSceneNavigate'
import type {MouseEvent} from 'react'
import useSound from "use-sound";

export function Link({to, onClick, ...rest}: LinkProps) {
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

    return <StyledLink to={to} onClick={handleClick} onMouseEnter={handleMouseEnter} {...rest} />
}

const StyledLink = styled(RouterLink)`
    display: inline-flex;
    border: none;
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.font.body};
    text-decoration: none;
    transition: color 0.2s ease;
    cursor: none;

    &:hover {
        color: ${({theme}) => theme.colors.accent};
    }
`