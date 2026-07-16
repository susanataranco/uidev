import { Outlet } from 'react-router-dom'
import TestCube from './scene/TestCube'

function App() {
    return (
        <>
            <TestCube/>

            <Outlet />
        </>
    );
}

export default App
