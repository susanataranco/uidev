import { useParams } from 'react-router-dom'

export default function ProjectDetail() {
    const { id } = useParams()
    return <h1>Proyect: {id}</h1>
}