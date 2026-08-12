import {useNavigate} from 'react-router-dom'

export function useSceneNavigate() {
    const navigate = useNavigate()

    return function sceneNavigate(path: string) {
        navigate(path)
    }
}