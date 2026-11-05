import {useEffect, useRef, useSyncExternalStore} from "react";
import type {BehaviorAnalysis} from "./useBehaviorAnalysis";
import {randomMessage} from "../utils/randomMessage.ts";
import {systemMessages} from "../data/systemMessages.ts";

export interface SystemLogEntry {
    id: number;
    timestamp: string;
    message: string;
}

let entries: SystemLogEntry[] = [];
const listeners = new Set<() => void>();

function notify() {
    listeners.forEach(listener => listener());
}

function subscribe(listener: () => void) {
    listeners.add(listener);

    return () => listeners.delete(listener);
}

function getSnapshot() {
    return entries;
}

let nextId = 0

export function pushSystemLog(message: string) {
    const entry: SystemLogEntry = {
        id: nextId++,
        timestamp: new Date().toLocaleTimeString("es-ES", {
            hour12: false,
        }),
        message,
    };

    entries = [...entries.slice(-19), entry];

    notify();
}

export function useSystemLog(behavior: BehaviorAnalysis) {
    const previousStyle = useRef(behavior.interactionStyle);
    const previousExploration = useRef(behavior.exploration);
    const fastMovementDetected = useRef(false);
    const previousFocus = useRef(
        behavior.telemetry.browser.focused
    );
    const entries = useSyncExternalStore(
        subscribe,
        getSnapshot
    );

    useEffect(() => {
        if (previousStyle.current === behavior.interactionStyle) {
            return;
        }

        pushSystemLog(
            randomMessage(
                systemMessages.interactionStyle[
                    behavior.interactionStyle
                    ]
            )
        );

        previousStyle.current = behavior.interactionStyle;
    }, [behavior.interactionStyle]);

    useEffect(() => {
        if (behavior.exploration <= previousExploration.current) {
            return;
        }

        pushSystemLog(
            randomMessage(systemMessages.exploration)
        );

        previousExploration.current = behavior.exploration;

    }, [behavior.exploration]);

    useEffect(() => {
        const isFast = behavior.telemetry.user.pointerSpeed > 0.8;

        if (isFast && !fastMovementDetected.current) {
            pushSystemLog(
                randomMessage(systemMessages.fastMovement)
            );
        }

        fastMovementDetected.current = isFast;
    }, [behavior.telemetry.user.pointerSpeed]);

    useEffect(() => {
        if (
            previousFocus.current ===
            behavior.telemetry.browser.focused
        ) {
            return;
        }

        pushSystemLog(
            randomMessage(
                behavior.telemetry.browser.focused
                    ? systemMessages.focusRecovered
                    : systemMessages.focusLost
            )
        );

        previousFocus.current =
            behavior.telemetry.browser.focused;
    }, [behavior.telemetry.browser.focused]);

    return {
        entries
    };
}