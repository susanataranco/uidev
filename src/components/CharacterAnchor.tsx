import {useEffect, useRef} from 'react'
import styled from 'styled-components'
import {useCharacterStore} from '../store/characterStore'

const AnchorBox = styled.div`
    width: 100%;
    height: 100%;
`

export function CharacterAnchor() {
    const ref = useRef<HTMLDivElement>(null)
    const setTarget = useCharacterStore((state) => state.setTarget)

    useEffect(() => {
        function measure() {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect()
                setTarget({x: rect.left, y: rect.top, width: rect.width, height: rect.height})
            }
        }

        measure()
        window.addEventListener('resize', measure)
        return () => window.removeEventListener('resize', measure)
    }, [setTarget])

    return <AnchorBox ref={ref}/>
}