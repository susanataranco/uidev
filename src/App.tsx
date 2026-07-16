import { Outlet } from 'react-router-dom'
import {Cursor} from "./components/Cursor.tsx";
import {BackgroundVideo} from "./components/BackgroundVideo.tsx";

function App() {
    return (
        <>
            <BackgroundVideo />
            <Cursor />
            <Outlet />
        </>
    );
}

export default App
