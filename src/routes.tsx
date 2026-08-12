import {createBrowserRouter} from 'react-router-dom'
import Home from './pages/Home/Home.tsx'
import Bio from './pages/Bio/Bio.tsx'
import ProjectDetail from './pages/ProjectDetail'
import App from "./App.tsx";

export const router = createBrowserRouter([{
    path: "/",
    element: <App/>,
    children: [
        {
            path: '/',
            element: <Home/>,
        },
        {
            path: '/bio',
            element: <Bio/>,
        },
        {
            path: '/project/:id',
            element: <ProjectDetail/>,
        },
    ]
}])