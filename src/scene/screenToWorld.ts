import {Vector3, type Camera} from 'three'

export function screenToWorld(
    screenX: number,
    screenY: number,
    camera: Camera,
    distanceFromCamera: number
): Vector3 {
    const ndcX = (screenX / window.innerWidth) * 2 - 1
    const ndcY = -(screenY / window.innerHeight) * 2 + 1

    const vector = new Vector3(ndcX, ndcY, 0.5)
    vector.unproject(camera)

    const direction = vector.sub(camera.position).normalize()
    const targetDistance = distanceFromCamera
    const distance = (targetDistance - camera.position.z) / direction.z

    return camera.position.clone().add(direction.multiplyScalar(distance))
}