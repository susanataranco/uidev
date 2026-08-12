import {StatusBadge} from "../charts/StatusBadge.tsx";
import {Metric} from "../charts/Metric.tsx";
import {ProgressBar} from "../charts/ProgressBar.tsx";
import {Sparkline} from "../charts/Sparkline.tsx";
import styled from "styled-components";
import {useState} from "react";
import {useCursorTracker} from "../../../../hooks/useCursorTracker.ts";
import {useLiveTelemetry} from "../../../../hooks/useLiveTelemetry.ts";

export function User() {
    const [cursor, setCursor] = useState("0.50 / 0.50");
    const {user} = useLiveTelemetry();

    useCursorTracker((pos) => {
        setCursor(`${pos.x.toFixed(2)} / ${pos.y.toFixed(2)}`);
    });

    return (
        <>
            <StatusBadge
                status={user.idle ? "IDLE" : "ACTIVE"}
                variant={user.idle ? "warning" : "success"}
            />

            <Metric
                label="UPTIME"
                value={user.sessionUptime !== null ? `${user.sessionUptime}s` : null}
            />

            <FieldGroup>
                <FieldHeader>
                    <span>POINTER SPEED</span>
                    <span>{(user.pointerSpeed * 100).toFixed(0)}%</span>
                </FieldHeader>

                <ProgressBar value={user.pointerSpeed}/>
            </FieldGroup>

            <Metric
                label="CURSOR"
                value={cursor !== null ? cursor : null}
            />

            <Sparkline
                data={user.pointerSpeedHistory}
            />
        </>
    )
}

const FieldGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
`

const FieldHeader = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 13px;
`