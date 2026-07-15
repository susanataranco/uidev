import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Mesh } from 'three'

function SpinningBox() {
    const meshRef = useRef<Mesh>(null)

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta
            meshRef.current.rotation.y += delta * 0.5
        }
    })

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    )
}

export default function TestCube() {
    return (
        <div style={{ width: '100%', height: '400px' }}>
            <Canvas camera={{ position: [3, 3, 3] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <SpinningBox />
            </Canvas>
        </div>
    )
}