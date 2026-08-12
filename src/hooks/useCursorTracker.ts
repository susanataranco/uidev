import {useEffect, useRef} from "react"

export interface CursorPosition {
    x: number
    y: number
    clientX: number
    clientY: number
}

type CursorListener = (pos: CursorPosition) => void

const listeners = new Set<CursorListener>()
let started = false
let last: CursorPosition = {x: 0.5, y: 0.5, clientX: 0, clientY: 0}

function startEngine() {
    if (started || typeof window === "undefined") return
    started = true

    window.addEventListener(
        "mousemove",
        (e) => {
            last = {
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
                clientX: e.clientX,
                clientY: e.clientY,
            }
            listeners.forEach((listener) => listener(last))
        },
        {passive: true}
    )
}

export function useCursorTracker(onMove: CursorListener) {
    const callbackRef = useRef(onMove)
    callbackRef.current = onMove

    useEffect(() => {
        startEngine()
        const listener: CursorListener = (pos) => callbackRef.current(pos)
        listeners.add(listener)
        listener(last)
        return () => {
            listeners.delete(listener)
        }
    }, [])
}
