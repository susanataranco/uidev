import { Outlet } from 'react-router-dom'
import {Cursor} from "./components/Cursor.tsx";

function App() {
    return (
        <>
            <Cursor />
            <Outlet />
        </>
    );
}

export default App
