import {Outlet} from 'react-router-dom'
import {Cursor} from "./components/Cursor.tsx";
import {Background} from "./components/Background.tsx";

function App() {
    return (
        <>
            <Background/>
            <Cursor/>
            <Outlet/>
        </>
    );
}

export default App