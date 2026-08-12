import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import styled from "styled-components";
import type {TimelineEntry} from "../../../data/resume.ts";
import {Typography} from "../../../components/Typography.tsx";
import {Dot} from "../../../components/Dot.tsx";
import {GiExpand} from "react-icons/gi";
import {BiCollapseAlt} from "react-icons/bi";
import {BoolButton} from "../../../components/BoolButton.tsx";
import {ZoomControls} from "./ZoomControls.tsx";
import {Button} from "../../../components/Button.tsx";

const PAD_YEARS = 1.4
const MIN_ZOOM = 1
const MAX_ZOOM = 5
const ZOOM_TIERS = [1, 1.9, 3.1, 4.4]
const IDLE_SNAP_DELAY = 450
const SETTLE_DURATION = 420
const BOX_WIDTH = 168
const LANE_GAP = 0
const LANE_STEP = 74
const DETAIL_ZOOM_THRESHOLD = 2.4
const DETAIL_BOX_WIDTH = 220
const DETAIL_BOX_HEIGHT = 150
const FILTER_FIT_PAD_YEARS = 1
const TIMELINE_STAGE_HEIGHT = 440

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value))
}

function easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3)
}

interface TimelineProps {
    entries: TimelineEntry[]
    onEntrySelect?: (entry: TimelineEntry) => void
    immersive?: boolean
    onImmersiveToggle?: () => void
}

export function Timeline({
                             entries,
                             onEntrySelect,
                             immersive = false,
                             onImmersiveToggle
                         }: TimelineProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [pan, setPan] = useState(0)
    const [filter, setFilter] = useState<"all" | "work">("all")

    const dragState = useRef<{ lastX: number } | null>(null)
    const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const rafId = useRef<number | null>(null)
    const pendingFitRef = useRef(false)

    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        const observer = new ResizeObserver((entries) => {
            const measuredWidth = entries[0]?.contentRect.width
            if (measuredWidth) setWidth(measuredWidth)
        })

        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    const entriesSorted = useMemo(
        () => [...entries].sort((a, b) => a.year - b.year),
        [entries],
    )

    const visibleEntries = useMemo(
        () => filter === "all"
            ? entriesSorted
            : entriesSorted.filter((entry) => entry.type === "work"),
        [entriesSorted, filter],
    )

    const minYear = entriesSorted[0].year - PAD_YEARS
    const maxYear = entriesSorted[entriesSorted.length - 1].year + PAD_YEARS
    const yearSpan = maxYear - minYear

    const fitScale = width > 0 ? width / yearSpan : 0

    const baseX = useCallback(
        (year: number) => (year - minYear) * fitScale,
        [fitScale, minYear],
    )

    const screenX = useCallback(
        (year: number) => baseX(year) * zoom + pan,
        [baseX, zoom, pan],
    )

    const activeRange = useMemo(() => {
        const first = visibleEntries[0]
        const last = visibleEntries[visibleEntries.length - 1]
        return {
            minYear: first.year - FILTER_FIT_PAD_YEARS,
            maxYear: last.year + FILTER_FIT_PAD_YEARS,
        }
    }, [visibleEntries])

    const clampPan = useCallback(
        (nextPan: number, nextZoom: number) => {
            const rangeLeftPx = baseX(activeRange.minYear) * nextZoom
            const rangeRightPx = baseX(activeRange.maxYear) * nextZoom
            const rangeWidthPx = rangeRightPx - rangeLeftPx

            if (rangeWidthPx <= width) {
                return (width - rangeWidthPx) / 2 - rangeLeftPx
            }

            const minPan = width - rangeRightPx
            const maxPan = -rangeLeftPx
            return clamp(nextPan, minPan, maxPan)
        },
        [width, baseX, activeRange],
    )

    const detailVisible = zoom >= DETAIL_ZOOM_THRESHOLD

    const effectiveLaneStep = detailVisible ? DETAIL_BOX_HEIGHT + LANE_GAP : LANE_STEP
    const effectiveBoxWidth = detailVisible ? DETAIL_BOX_WIDTH : BOX_WIDTH

    const lanes = useMemo(() => {
        const lastRightEdgeByLane: number[] = []
        const result = new Map<string, number>()

        for (const entry of visibleEntries) {
            if (entry.type === "milestone") {
                result.set(entry.id, 0)
                continue
            }
            const x = baseX(entry.year) * zoom
            let lane = 1
            while (
                lastRightEdgeByLane[lane] !== undefined &&
                x - effectiveBoxWidth / 2 < lastRightEdgeByLane[lane] + LANE_GAP
                ) {
                lane += 1
            }
            lastRightEdgeByLane[lane] = x + effectiveBoxWidth / 2
            result.set(entry.id, lane)
        }
        return result
    }, [visibleEntries, baseX, zoom, effectiveBoxWidth])

    const maxLane = Math.max(0, ...Array.from(lanes.values()))
    const trackHeight = 90 + (maxLane + 1) * effectiveLaneStep + 40

    const animateTo = useCallback((targetZoom: number, targetPan: number) => {
        if (rafId.current) cancelAnimationFrame(rafId.current)

        const startZoom = zoom
        const startPan = pan
        const startTime = performance.now()

        function step(now: number) {
            const t = clamp((now - startTime) / SETTLE_DURATION, 0, 1)
            const eased = easeOutCubic(t)
            setZoom(startZoom + (targetZoom - startZoom) * eased)
            setPan(startPan + (targetPan - startPan) * eased)
            if (t < 1) {
                rafId.current = requestAnimationFrame(step)
            }
        }

        rafId.current = requestAnimationFrame(step)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [zoom, pan])

    function fitToEntries(list: TimelineEntry[]) {
        if (list.length === 0 || width === 0) return

        const rangeMinYear = list[0].year - FILTER_FIT_PAD_YEARS
        const rangeMaxYear = list[list.length - 1].year + FILTER_FIT_PAD_YEARS
        const spanPx = baseX(rangeMaxYear) - baseX(rangeMinYear)
        const targetZoom = clamp(width / spanPx, MIN_ZOOM, MAX_ZOOM)
        const targetPan = clampPan(-baseX(rangeMinYear) * targetZoom, targetZoom)

        animateTo(targetZoom, targetPan)
    }

    function handleFilterChange(nextFilter: "all" | "work") {
        setFilter(nextFilter)
        if (idleTimer.current) clearTimeout(idleTimer.current)
        if (rafId.current) cancelAnimationFrame(rafId.current)

        const relevant = nextFilter === "all"
            ? entriesSorted
            : entriesSorted.filter((entry) => entry.type === "work")

        fitToEntries(relevant)
    }

    const magnetSnap = useCallback(() => {
        if (visibleEntries.length === 0) return

        const nearestTier = ZOOM_TIERS.reduce((a, b) =>
            Math.abs(b - zoom) < Math.abs(a - zoom) ? b : a,
        )

        const zoomAlreadySettled = Math.abs(nearestTier - zoom) < 0.001

        if (zoomAlreadySettled) {
            const settledPan = clampPan(pan, zoom)
            if (Math.abs(settledPan - pan) > 0.5) {
                animateTo(zoom, settledPan)
            }
            return
        }

        const viewportCenter = width / 2
        let closest = visibleEntries[0]
        let closestDist = Infinity
        for (const entry of visibleEntries) {
            const x = baseX(entry.year) * nearestTier + pan
            const dist = Math.abs(x - viewportCenter)
            if (dist < closestDist) {
                closestDist = dist
                closest = entry
            }
        }

        let targetPan = viewportCenter - baseX(closest.year) * nearestTier
        targetPan = clampPan(targetPan, nearestTier)

        animateTo(nearestTier, targetPan)
    }, [zoom, pan, width, visibleEntries, baseX, clampPan, animateTo])

    const scheduleMagnet = useCallback(() => {
        if (idleTimer.current) clearTimeout(idleTimer.current)
        idleTimer.current = setTimeout(magnetSnap, IDLE_SNAP_DELAY)
    }, [magnetSnap])

    const zoomAt = useCallback(
        (pointerX: number, factor: number) => {
            if (rafId.current) cancelAnimationFrame(rafId.current)
            setZoom((currentZoom) => {
                const nextZoom = clamp(currentZoom * factor, MIN_ZOOM, MAX_ZOOM)
                setPan((currentPan) => {
                    const contentXAtPointer = (pointerX - currentPan) / currentZoom
                    return clampPan(pointerX - contentXAtPointer * nextZoom, nextZoom)
                })
                return nextZoom
            })
        },
        [clampPan],
    )

    function onWheel(e: React.WheelEvent) {
        e.preventDefault()
        const rect = containerRef.current!.getBoundingClientRect()
        const pointerX = e.clientX - rect.left
        const factor = Math.exp(-e.deltaY * 0.0022)
        zoomAt(pointerX, factor)
        scheduleMagnet()
    }

    function onPointerDown(e: React.PointerEvent) {
        (e.target as Element).setPointerCapture(e.pointerId)
        if (idleTimer.current) clearTimeout(idleTimer.current)
        if (rafId.current) cancelAnimationFrame(rafId.current)
        dragState.current = {lastX: e.clientX}
    }

    function onPointerMove(e: React.PointerEvent) {
        if (!dragState.current) return
        const deltaX = e.clientX - dragState.current.lastX
        dragState.current.lastX = e.clientX
        setPan((current) => clampPan(current + deltaX, zoom))
    }

    function onPointerUp() {
        if (!dragState.current) return
        dragState.current = null
        scheduleMagnet()
    }

    function handleZoomIn() {
        if (idleTimer.current) clearTimeout(idleTimer.current)

        const nextTier = ZOOM_TIERS.find((tier) => tier > zoom + 0.01)
            ?? ZOOM_TIERS[ZOOM_TIERS.length - 1]

        const viewportCenter = width / 2
        const contentXAtCenter = (viewportCenter - pan) / zoom
        const targetPan = clampPan(viewportCenter - contentXAtCenter * nextTier, nextTier)

        animateTo(nextTier, targetPan)
    }

    function handleZoomOut() {
        if (idleTimer.current) clearTimeout(idleTimer.current)

        const nextTier = [...ZOOM_TIERS].reverse().find((tier) => tier < zoom - 0.01)
            ?? ZOOM_TIERS[0]

        const viewportCenter = width / 2
        const contentXAtCenter = (viewportCenter - pan) / zoom
        const targetPan = clampPan(viewportCenter - contentXAtCenter * nextTier, nextTier)

        animateTo(nextTier, targetPan)
    }

    function handleReset() {
        if (idleTimer.current) clearTimeout(idleTimer.current)
        if (rafId.current) cancelAnimationFrame(rafId.current)
        fitToEntries(visibleEntries)
    }

    const hasMountedRef = useRef(false)

    useEffect(() => {
        if (hasMountedRef.current) {
            pendingFitRef.current = true
        }
        hasMountedRef.current = true
    }, [immersive])

    useEffect(() => {
        if (!pendingFitRef.current || width === 0) return
        pendingFitRef.current = false

        if (idleTimer.current) clearTimeout(idleTimer.current)
        if (rafId.current) cancelAnimationFrame(rafId.current)
        fitToEntries(visibleEntries)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width])

    const controlsRow = (
        <>
            <div className="flex gap-s">
                <BoolButton active={filter === "all"} onClick={() => handleFilterChange("all")}>
                    All
                </BoolButton>
                <BoolButton active={filter === "work"} onClick={() => handleFilterChange("work")}>
                    Work only
                </BoolButton>
            </div>

            <ZoomControls
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onReset={handleReset}
            />

            {onImmersiveToggle && (
                <Button
                    onClick={onImmersiveToggle}
                    aria-label={immersive ? "Exit immersive view" : "Immersive view"}
                >
                    {immersive ? <BiCollapseAlt size={16}/> : <GiExpand size={16}/>}
                </Button>
            )}
        </>
    );

    return (
        <div className="h-full">
            <ControlsBar $immersive={immersive}>{controlsRow}</ControlsBar>

            <TimelineStage $immersive={immersive}>
                <TimelineContainer
                    $immersive={immersive}
                    ref={containerRef}
                    onWheel={onWheel}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerUp}
                    style={{height: trackHeight}}
                >
                    {width > 0 &&
                        visibleEntries.map((entry) => {
                            const lane = lanes.get(entry.id) ?? 1
                            const isMilestone = entry.type === "milestone"
                            const stemHeight = isMilestone ? 22 : lane * effectiveLaneStep - 18

                            return (
                                <TimelineEvent
                                    key={entry.id}
                                    style={{left: screenX(entry.year)}}
                                >
                                    <Typography variant="body" size="md" className="p-none m-none">
                                        {entry.year}
                                    </Typography>
                                    <Dot size="small"/>
                                    <TimelineStem style={{height: stemHeight}}/>
                                    <TimelineBox $detail={detailVisible}>
                                        <Typography variant="body" size="sm" className="p-none m-none">
                                            {entry.company ?? entry.label}
                                        </Typography>

                                        {detailVisible && entry.role && (
                                            <Typography variant="body" size="xs" className="p-none m-none">
                                                {entry.role}
                                            </Typography>
                                        )}

                                        {detailVisible && onEntrySelect && entry.type === "work" && (
                                            <Button variant="text" onClick={() => onEntrySelect(entry)}>See more
                                                →</Button>

                                        )}
                                    </TimelineBox>
                                </TimelineEvent>
                            )
                        })}
                </TimelineContainer>
            </TimelineStage>
        </div>
    )
}

const TimelineStage = styled.div<{ $immersive: boolean }>`
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    ${({$immersive}) => $immersive
            ? `flex: 1; min-height: 0;`
            : `height: ${TIMELINE_STAGE_HEIGHT}px;`}
`;

const TimelineContainer = styled.div<{ $immersive: boolean }>`
    position: absolute;
    top: 0;
    transform: translateY(0);
    left: 0;
    width: 100%;
    overflow: hidden;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
    touch-action: none;

    &:active {
        cursor: grabbing;
    }

    ${({$immersive}) => $immersive && `
    top: 50%;
    transform: translateY(-50%);
    `}
`;

const TimelineStem = styled.span`
    width: 1.5px;
    background: ${({theme}) => theme.colors.ui.line};
    flex-shrink: 0;
`;

const TimelineEvent = styled.div`
    position: absolute;
    top: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateX(-50%);
    white-space: nowrap;`

const TimelineBox = styled.div<{ $detail?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${({theme}) => theme.spacing(1)};
    padding: ${({theme}) => theme.spacing(2)} ${({theme}) => theme.spacing(3)};
    text-align: center;
    white-space: normal;

    width: ${({$detail}) => ($detail ? `${DETAIL_BOX_WIDTH}px` : "auto")};
    height: ${({$detail}) => ($detail ? `${DETAIL_BOX_HEIGHT}px` : "auto")};
`;

const ControlsBar = styled.div<{ $immersive: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 9;
    position: relative;

    ${({$immersive, theme}) => $immersive && `
        position: fixed;
        bottom: ${theme.spacing(3)};
        left: ${theme.spacing(3)};
        right: ${theme.spacing(3)};
        z-index: 10;
        padding: ${theme.spacing(2)};
        background: ${theme.colors.ui.background};
        border: 1px solid ${theme.colors.ui.line};
    `}
`;