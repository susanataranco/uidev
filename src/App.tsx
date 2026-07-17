import {Outlet} from 'react-router-dom'
import {Cursor} from "./components/Cursor.tsx";
import {BackgroundVideo} from "./components/BackgroundVideo.tsx";
import {Canvas} from "@react-three/fiber";
import {Character} from "./scene/Character.tsx";

function App() {
    return (
        <>
            <BackgroundVideo/>
            <Cursor/>
            <div style={{position: 'fixed', inset: 0, pointerEvents: 'none'}}>
                <Canvas camera={{position: [0, 0, 10], fov: 50}} style={{pointerEvents: 'auto'}}>
                    <ambientLight intensity={0.7}/>
                    <directionalLight position={[5, 5, 5]} intensity={1}/>
                    <Character/>
                </Canvas>
            </div>
            <Outlet/>
        </>
    );
}

export default App
