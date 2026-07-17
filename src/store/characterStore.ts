import {create} from 'zustand'

export type CharacterAction = 'None' | 'Survey' | 'Walk' | 'Run'

interface Rect {
    x: number
    y: number
    width: number
    height: number
}

interface CharacterState {
    action: CharacterAction
    setAction: (action: CharacterAction) => void
    target: Rect
    setTarget: (target: Rect) => void
}

export const useCharacterStore = create<CharacterState>((set) => ({
    action: 'Survey',
    setAction: (action) => set({action}),
    target: {x: 0, y: 0, width: 300, height: 300},
    setTarget: (target) => set({target}),
}))

if (import.meta.env.DEV) {
    // @ts-expect-error - debug
    window.characterStore = useCharacterStore
}