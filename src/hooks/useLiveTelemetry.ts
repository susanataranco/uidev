import {useSyncExternalStore} from "react"


const FPS_HISTORY_LENGTH = 24
const PING_INTERVAL_MS = 4000
const GRID_COLS = 5
const GRID_ROWS = 5

interface MachineTelemetry {
    screenWidth: number
    screenHeight: number
    devicePixelRatio: number
}

interface BrowserTelemetry {
    viewportWidth: number
    viewportHeight: number
    online: boolean
    focused: boolean
    fps: number
    fpsHistory: number[]
    pingMs: number | null
    heapRatio: number | null
    heapUsedMb: number | null
    time: string
    refreshRate: number
}

interface UserTelemetry {
    pointerSpeed: number
    pointerSpeedHistory: number[]
    sessionUptime: number
    exploredCells: number
    idle: boolean
    lastInteraction: number
    inactiveSeconds: number
    cellHeat: number[]
    currentCell: number | null
}

export interface LiveTelemetry {
    machine: MachineTelemetry
    browser: BrowserTelemetry
    user: UserTelemetry
}

const listeners = new Set<() => void>()

let state: LiveTelemetry = {
    machine: {
        screenWidth: typeof window !== "undefined" ? window.screen.width : 0,
        screenHeight: typeof window !== "undefined" ? window.screen.height : 0,
        devicePixelRatio: typeof window !== "undefined" ? window.devicePixelRatio : 1,
    },
    browser: {
        viewportWidth: typeof window !== "undefined" ? window.innerWidth : 0,
        viewportHeight: typeof window !== "undefined" ? window.innerHeight : 0,
        online: typeof navigator !== "undefined" ? navigator.onLine : true,
        focused: typeof document !== "undefined" ? document.hasFocus() : true,
        fps: 0,
        fpsHistory: [],
        pingMs: null,
        heapRatio: null,
        heapUsedMb: null,
        time: "",
        refreshRate: 60,
    },
    user: {
        pointerSpeed: 0,
        pointerSpeedHistory: [],
        sessionUptime: 0,
        exploredCells: 0,
        idle: false,
        lastInteraction: Date.now(),
        inactiveSeconds: 0,
        cellHeat: new Array(GRID_COLS * GRID_ROWS).fill(0),
        currentCell: null
    },
}

function setState(patch: {
    machine?: Partial<MachineTelemetry>;
    browser?: Partial<BrowserTelemetry>;
    user?: Partial<UserTelemetry>
}) {
    state = {
        machine: {...state.machine, ...patch.machine},
        browser: {...state.browser, ...patch.browser},
        user: {...state.user, ...patch.user},
    }
    listeners.forEach((listener) => listener())
}

let started = false
let idleTimeoutId: ReturnType<typeof setTimeout> | null = null

function markActive() {
    if (idleTimeoutId) clearTimeout(idleTimeoutId);

    idleTimeoutId = setTimeout(() => {
        setState({
            user: {
                idle: true,
            },
        });
    }, 4000);
}

function startEngine() {
    if (started || typeof window === "undefined") return
    started = true

    const sessionStart = Date.now()
    let measuredRefreshRate = 60;

    let exploredSet = new Set<number>()
    let cellHeat = new Array(GRID_COLS * GRID_ROWS).fill(0)

    async function measureRefreshRate() {
        return new Promise<number>((resolve) => {
            const samples: number[] = [];

            let previous = performance.now();

            function step(now: number) {
                samples.push(now - previous);
                previous = now;

                if (samples.length < 60) {
                    requestAnimationFrame(step);
                    return;
                }

                const average =
                    samples.reduce((a, b) => a + b, 0) /
                    samples.length;

                resolve(1000 / average);
            }

            requestAnimationFrame(step);
        });
    }

    measureRefreshRate().then((hz) => {
        measuredRefreshRate = Math.round(hz);

        setState({
            browser: {
                refreshRate: measuredRefreshRate,
            },
        });
    });

    let cellVisits = new Array(GRID_COLS * GRID_ROWS).fill(0)

    let frames = 0
    let lastFpsCheck = performance.now()
    let rafId: number

    let lastPointer = {x: 0, y: 0, t: performance.now()}
    let smoothedSpeed = 0
    const MAX_SPEED_PX_S = 2500

    function getCellIndex(x: number, y: number) {
        const cellWidth = window.innerWidth / GRID_COLS;
        const cellHeight = window.innerHeight / GRID_ROWS;

        const col = Math.min(
            GRID_COLS - 1,
            Math.floor(x / cellWidth)
        );

        const row = Math.min(
            GRID_ROWS - 1,
            Math.floor(y / cellHeight)
        );

        return row * GRID_COLS + col;
    }

    function loop(now: number) {
        frames++
        smoothedSpeed *= 0.92

        if (now - lastFpsCheck >= 500) {
            const currentFps = Math.round((frames * 1000) / (now - lastFpsCheck))
            const nextHistory = [...state.browser.fpsHistory, currentFps].slice(-FPS_HISTORY_LENGTH)
            setState({
                browser: {fps: currentFps, fpsHistory: nextHistory},
                user: {
                    pointerSpeed: Math.min(1, smoothedSpeed / MAX_SPEED_PX_S),
                    sessionUptime: Math.floor((Date.now() - sessionStart) / 1000),
                    inactiveSeconds: (Date.now() - state.user.lastInteraction) / 1000,
                },
            })
            frames = 0
            lastFpsCheck = now
        }
        rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)

    function handlePointerSpeed(e: MouseEvent) {
        const now = performance.now()
        const dt = Math.max(1, now - lastPointer.t)
        const dist = Math.hypot(e.clientX - lastPointer.x, e.clientY - lastPointer.y)
        const instantSpeed = (dist / dt) * 1000
        smoothedSpeed = smoothedSpeed * 0.7 + instantSpeed * 0.3
        lastPointer = {x: e.clientX, y: e.clientY, t: now}

        const cellIndex = getCellIndex(e.clientX, e.clientY);
        exploredSet.add(cellIndex)
        cellHeat[cellIndex] = 1

        setState({
            user: {
                idle: false,
                lastInteraction: Date.now(),
                exploredCells: exploredSet.size,
                cellHeat: [...cellHeat],
                currentCell: cellIndex,
            },
        });

        markActive();
    }

    window.addEventListener("mousemove", handlePointerSpeed, {passive: true})

    function checkWindowMetrics() {
        const patch: { machine?: Partial<MachineTelemetry>; browser?: Partial<BrowserTelemetry> } = {}

        const vw = window.innerWidth
        const vh = window.innerHeight
        if (vw !== state.browser.viewportWidth || vh !== state.browser.viewportHeight) {
            exploredSet = new Set()
            cellHeat = new Array(GRID_COLS * GRID_ROWS).fill(0)

            setState({
                user: {
                    exploredCells: 0,
                    cellHeat: [...cellVisits],
                    currentCell: null
                },
            });

            patch.browser = {viewportWidth: vw, viewportHeight: vh}
        }

        const sw = window.screen.width
        const sh = window.screen.height
        const dpr = window.devicePixelRatio
        if (sw !== state.machine.screenWidth || sh !== state.machine.screenHeight || dpr !== state.machine.devicePixelRatio) {
            patch.machine = {screenWidth: sw, screenHeight: sh, devicePixelRatio: dpr}
        }

        if (patch.browser || patch.machine) setState(patch)
    }

    window.addEventListener("resize", checkWindowMetrics)

    function readHeap() {
        const perf = performance as Performance & {
            memory?: { usedJSHeapSize: number; jsHeapSizeLimit: number }
        }
        if (!perf.memory) return
        setState({
            browser: {
                heapRatio: perf.memory.usedJSHeapSize / perf.memory.jsHeapSizeLimit,
                heapUsedMb: Math.round(perf.memory.usedJSHeapSize / 1024 / 1024),
            },
        })
    }

    const HEAT_DECAY = 0.82
    const HEAT_CLAMP = 0.02

    function decayHeat() {
        if (!cellHeat.some((v) => v > 0)) return // nada que enfriar, no gastamos un setState

        cellHeat = cellHeat.map((v) => {
            if (v === 0) return 0
            const next = v * HEAT_DECAY
            return next < HEAT_CLAMP ? 0 : next
        })

        setState({user: {cellHeat: [...cellHeat]}})
    }

    function tickClock() {
        setState({browser: {time: new Date().toLocaleTimeString("es-ES", {hour12: false})}})
        checkWindowMetrics()
        readHeap()
        decayHeat()
    }

    function handleVisibility() {
        if (document.hidden) {
            cancelAnimationFrame(rafId)
        } else {
            lastFpsCheck = performance.now()
            frames = 0
            rafId = requestAnimationFrame(loop)
        }
    }

    document.addEventListener("visibilitychange", handleVisibility)

    function handleOnline() {
        setState({browser: {online: navigator.onLine}})
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOnline)

    function handleFocus() {
        setState({browser: {focused: true}})
    }

    function handleBlur() {
        setState({browser: {focused: false}})
    }

    window.addEventListener("focus", handleFocus)
    window.addEventListener("blur", handleBlur)

    let pingInFlight = false

    async function measurePing() {
        if (pingInFlight) return
        pingInFlight = true
        const start = performance.now()
        try {
            await fetch(`${window.location.origin}/favicon.ico?_=${Date.now()}`, {
                method: "HEAD",
                cache: "no-store",
            })
            setState({browser: {pingMs: Math.round(performance.now() - start)}})
        } catch {
            setState({browser: {pingMs: null}})
        } finally {
            pingInFlight = false
        }
    }

    measurePing()
    setInterval(measurePing, PING_INTERVAL_MS)

    tickClock()
    setInterval(tickClock, 1000)
    markActive()
}

function subscribe(listener: () => void) {
    startEngine()
    listeners.add(listener)
    return () => listeners.delete(listener)
}

function getSnapshot() {
    return state
}

export function useLiveTelemetry(): LiveTelemetry {
    return useSyncExternalStore(subscribe, getSnapshot)
}