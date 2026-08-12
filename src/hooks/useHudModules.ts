import {useCallback, useEffect, useState} from "react"
import {HUD_MODULES, type HudModuleId} from "../data/hudmodules.ts"

const STORAGE_KEY = "hud-visible-modules"

function readInitialState(): Record<HudModuleId, boolean> {
    const fallback = Object.fromEntries(HUD_MODULES.map((m) => [m.id, true])) as Record<HudModuleId, boolean>

    if (typeof window === "undefined") return fallback

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY)
        if (!raw) return fallback
        const stored = JSON.parse(raw) as Partial<Record<HudModuleId, boolean>>
        return {...fallback, ...stored}
    } catch {
        return fallback
    }
}

export function useHudModules() {
    const [visibility, setVisibility] = useState<Record<HudModuleId, boolean>>(readInitialState)

    useEffect(() => {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(visibility))
        } catch {
            // localStorage can fail
        }
    }, [visibility])

    const isVisible = useCallback((id: HudModuleId) => visibility[id] ?? true, [visibility])

    const toggle = useCallback((id: HudModuleId) => {
        setVisibility((current) => ({...current, [id]: !current[id]}))
    }, [])

    return {
        modules: HUD_MODULES,
        isVisible,
        toggle,
        visibleModules: HUD_MODULES.filter((m) => isVisible(m.id)),
    }
}