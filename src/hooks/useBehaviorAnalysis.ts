import {type LiveTelemetry, useLiveTelemetry} from "./useLiveTelemetry";

type InteractionStyle =
    | "CALM"
    | "CURIOUS"
    | "FOCUSED"
    | "ACTIVE";

export type BehaviorIntent =
    | "OBSERVING"
    | "INSPECTING"
    | "SEARCHING"
    | "EXPLORING";

export interface BehaviorAnalysis {
    telemetry: LiveTelemetry;
    exploration: number;
    attention: number;
    interactionStyle: InteractionStyle;
    intent: BehaviorIntent;
}

export function useBehaviorAnalysis(): BehaviorAnalysis {
    const telemetry = useLiveTelemetry();

    const exploration = (telemetry.user.exploredCells / 25) * 100;

    const attention = Math.max(
        0,
        100 - telemetry.user.inactiveSeconds * 20
    );

    let interactionStyle: InteractionStyle = "CALM";

    if (telemetry.user.pointerSpeed > 0.75) {
        interactionStyle = "ACTIVE";
    } else if (exploration > 70) {
        interactionStyle = "CURIOUS";
    } else if (attention > 80) {
        interactionStyle = "FOCUSED";
    }

    let intent: BehaviorIntent = "OBSERVING";

    if (
        exploration > 60 &&
        attention > 60
    ) {
        intent = "EXPLORING";
    } else if (
        attention > 80 &&
        telemetry.user.pointerSpeed < 0.25
    ) {
        intent = "INSPECTING";
    } else if (
        telemetry.user.pointerSpeed > 0.75
    ) {
        intent = "SEARCHING";
    }

    return {
        telemetry,

        exploration,
        attention,

        interactionStyle,
        intent,
    };
}