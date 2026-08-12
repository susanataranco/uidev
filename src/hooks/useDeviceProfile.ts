import {useState} from "react"

export interface MachineProfile {
    cores: number | null
    ramGb: number | null
    gpuRenderer: string | null
    connectionType: string | null
    touchPoints: number
}

export interface BrowserProfile {
    locale: string
    timeZone: string
    prefersReducedMotion: boolean
    prefersDark: boolean
}

export interface DeviceProfile {
    machine: MachineProfile
    browser: BrowserProfile
}

interface NavigatorExtras {
    deviceMemory?: number
    connection?: { effectiveType?: string }
}

function getGpuRenderer(): string | null {
    try {
        const canvas = document.createElement("canvas")
        const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null
        if (!gl) return null
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info")
        if (!debugInfo) return null
        return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string
    } catch {
        return null
    }
}

function readDeviceProfile(): DeviceProfile {
    const nav = navigator as Navigator & NavigatorExtras

    return {
        machine: {
            cores: navigator.hardwareConcurrency ?? null,
            ramGb: nav.deviceMemory ?? null,
            gpuRenderer: getGpuRenderer(),
            connectionType: nav.connection?.effectiveType ?? null,
            touchPoints: navigator.maxTouchPoints ?? 0,
        },
        browser: {
            locale: navigator.language,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
            prefersDark: window.matchMedia("(prefers-color-scheme: dark)").matches,
        },
    }
}

export function useDeviceProfile(): DeviceProfile {
    const [profile] = useState(readDeviceProfile)
    return profile
}