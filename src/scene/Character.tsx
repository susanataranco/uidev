import {useEffect, useMemo, useRef} from 'react'
import {useGLTF, useAnimations} from '@react-three/drei'
import {useFrame, useThree} from '@react-three/fiber'
import {SkeletonUtils} from 'three-stdlib'
import {Box3, Vector3, type Group} from 'three'
import {useCharacterStore} from '../store/characterStore'
import {screenToWorld} from './screenToWorld'

const BASE_SCALE = 0.02
const REFERENCE_WIDTH = 300

export function Character() {
    const group = useRef<Group>(null)
    const {scene, animations} = useGLTF('/models/Fox.glb')

    const centeredScene = useMemo(() => {
        const clone = SkeletonUtils.clone(scene)
        const box = new Box3().setFromObject(clone)
        const center = box.getCenter(new Vector3())
        clone.position.sub(center)
        return clone
    }, [scene])

    const {actions} = useAnimations(animations, group)
    const action = useCharacterStore((state) => state.action)
    const target = useCharacterStore((state) => state.target)
    const {camera} = useThree()

    useEffect(() => {
        const current = actions[action]
        current?.reset().fadeIn(0.3).play()
        return () => {
            current?.fadeOut(0.3)
        }
    }, [action, actions])

    useFrame(() => {
        if (!group.current) return

        const centerX = target.x + target.width / 2
        const centerY = target.y + target.height / 2
        const worldTarget = screenToWorld(centerX, centerY, camera, 0)
        group.current.position.lerp(worldTarget, 0.08)

        const desiredScale = BASE_SCALE * (target.width / REFERENCE_WIDTH)
        const currentScale = group.current.scale.x
        const newScale = currentScale + (desiredScale - currentScale) * 0.08
        group.current.scale.setScalar(newScale)
    })

    return <primitive ref={group} object={centeredScene} scale={BASE_SCALE}/>
}

useGLTF.preload('/models/Fox.glb')