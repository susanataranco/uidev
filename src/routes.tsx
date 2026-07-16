import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Bio from './pages/Bio'
import ProjectDetail from './pages/ProjectDetail'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/bio',
        element: <Bio />,
    },
    {
        path: '/proyect/:id',
        element: <ProjectDetail />,
    },
])