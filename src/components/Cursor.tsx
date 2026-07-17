import {useEffect, useRef, useState} from 'react'
import styled, {keyframes} from 'styled-components'
import {useLocation} from 'react-router-dom'
import {playHoverSound, playClickSound} from '../audio/sfx'

export function Cursor() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)
    const [hovering, setHovering] = useState(false)
    const [rings, setRings] = useState<{ id: string; x: number; y: number }[]>([])
    const location = useLocation()
    const [prevPathname, setPrevPathname] = useState(location.pathname)

    if (location.pathname !== prevPathname) {
        setPrevPathname(location.pathname)
        setHovering(false)
    }

    useEffect(() => {
        function handleMove(e: MouseEvent) {
            if (dotRef.current) {
                dotRef.current.style.left = `${e.clientX}px`
                dotRef.current.style.top = `${e.clientY}px`
            }
            if (ringRef.current) {
                ringRef.current.style.left = `${e.clientX}px`
                ringRef.current.style.top = `${e.clientY}px`
            }
        }

        function handleOver(e: MouseEvent) {
            const target = e.target as HTMLElement
            if (target.closest('a, button, [data-cursor-hover]')) {
                setHovering(true)
                playHoverSound()
            }
        }

        function handleOut(e: MouseEvent) {
            const target = e.target as HTMLElement
            if (target.closest('a, button, [data-cursor-hover]')) {
                setHovering(false)
            }
        }

        function handleClick(e: MouseEvent) {
            const id = `${Date.now()}-${Math.random()}`
            setRings((prev) => [...prev, {id, x: e.clientX, y: e.clientY}])
            playClickSound()
        }

        window.addEventListener('mousemove', handleMove)
        window.addEventListener('mouseover', handleOver)
        window.addEventListener('mouseout', handleOut)
        window.addEventListener('click', handleClick)

        return () => {
            window.removeEventListener('mousemove', handleMove)
            window.removeEventListener('mouseover', handleOver)
            window.removeEventListener('mouseout', handleOut)
            window.removeEventListener('click', handleClick)
        }
    }, [])

    function removeRing(id: string) {
        setRings((prev) => prev.filter((r) => r.id !== id))
    }

    return (
        <>
            <Dot ref={dotRef} $hovering={hovering}/>
            <Ring ref={ringRef}/>
            {rings.map((r) => (
                <ClickRing
                    key={r.id}
                    style={{left: r.x, top: r.y}}
                    onAnimationEnd={() => removeRing(r.id)}
                />
            ))}
        </>
    )
}


const burst = keyframes`
    0% {
        width: 24px;
        height: 24px;
        opacity: 0.8;
    }
    100% {
        width: 72px;
        height: 72px;
        opacity: 0;
    }
`

const Dot = styled.div<{ $hovering: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: ${({$hovering}) => ($hovering ? '16px' : '6px')};
    height: ${({$hovering}) => ($hovering ? '16px' : '6px')};
    border-radius: 50%;
    background: ${({theme}) => theme.colors.cursor};
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: width 0.2s ease, height 0.2s ease;
`

const Ring = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid ${({theme}) => theme.colors.cursor};
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
`

const ClickRing = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    border-radius: 50%;
    border: 1px solid ${({theme}) => theme.colors.cursor};
    pointer-events: none;
    z-index: 9997;
    transform: translate(-50%, -50%);
    animation: ${burst} 0.6s ease-out forwards;
`