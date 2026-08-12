import {StatusBadge} from "../charts/StatusBadge.tsx";
import {Metric} from "../charts/Metric.tsx";
import styled from "styled-components";
import {Sparkline} from "../charts/Sparkline.tsx";
import {useDeviceProfile} from "../../../../hooks/useDeviceProfile.ts";
import {useLiveTelemetry} from "../../../../hooks/useLiveTelemetry.ts";

export function Browser() {
    const {browser: browserProfile} = useDeviceProfile();
    const {browser} = useLiveTelemetry();

    return (
        <>
            <StatusBadge
                status={browser.online ? "ONLINE" : "OFFLINE"}
                variant={browser.online ? "success" : "danger"}
            />

            <Metric
                label="LOCALE"
                value={browserProfile.locale !== null ? browserProfile.locale : null}
            />
            <Metric
                label="TIME"
                value={browser.time !== null ? browser.time : null}
            />
            <Metric
                label="TIMEZONE"
                value={browserProfile.timeZone !== null ? browserProfile.timeZone : null}
            />

            <Metric
                label="VIEWPORT"
                value={browser.viewportWidth !== null && browser.viewportHeight !== null ? `${browser.viewportWidth}×${browser.viewportHeight}` : null}
            />

            <Metric
                label="PING"
                value={browser.pingMs !== null ? `${browser.pingMs} ms` : null}
            />

            <Metric
                label="HEAP"
                value={browser.heapUsedMb !== null ? `${browser.heapUsedMb} MB` : null}
            />

            <FieldGroup>
                <FieldHeader>
                    <span>FPS</span>
                    <span>{browser.fps}</span>
                </FieldHeader>

                <Sparkline
                    data={browser.fpsHistory}
                />
            </FieldGroup>
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