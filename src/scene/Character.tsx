import {useEffect, useRef} from 'react'
import {useGLTF, useAnimations, Center} from '@react-three/drei'
import type {Group} from 'three'

interface CharacterProps {
    action: 'None' | 'Survey' | 'Walk' | 'Run'
}

export function Character({action}: CharacterProps) {
    const group = useRef<Group>(null)
    const {scene, animations} = useGLTF('/models/Fox.glb')
    const {actions} = useAnimations(animations, group)

    useEffect(() => {
        const current = actions[action]
        current?.reset().fadeIn(0.3).play()
        return () => {
            current?.fadeOut(0.3)
        }
    }, [action, actions])

    return (
        <Center>
            <primitive ref={group} object={scene} scale={0.02}/>
        </Center>
    )
}

useGLTF.preload('/models/fox.glb')