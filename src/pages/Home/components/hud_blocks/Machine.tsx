import {Metric} from "../charts/Metric.tsx";
import {CoreBars} from "../charts/CoreBars.tsx";
import {ProgressBar} from "../charts/ProgressBar.tsx";
import styled from "styled-components";
import {useDeviceProfile} from "../../../../hooks/useDeviceProfile.ts";
import {useLiveTelemetry} from "../../../../hooks/useLiveTelemetry.ts";

export function Machine() {
    const {machine: machineProfile} = useDeviceProfile();
    const {machine} = useLiveTelemetry();

    return (
        <>
            <Metric
                label="MONITOR"
                value={machine.screenWidth !== null || machine.screenHeight !== null || machine.devicePixelRatio !== null ? `${machine.screenWidth}×${machine.screenHeight} @${machine.devicePixelRatio}x` : null}
            />

            <Metric
                label="GPU"
                value={machineProfile.gpuRenderer !== null ? machineProfile.gpuRenderer : null}
            />
            {machineProfile.cores && (
                <FieldGroup>
                    <Metric
                        label="CORES"
                        value={machineProfile.cores !== null ? machineProfile.cores : null}
                    />
                    <CoreBars count={machineProfile.cores}/>
                </FieldGroup>
            )}

            <FieldGroup>
                <FieldHeader>
                    <span>RAM</span>
                    <span>{machineProfile.ramGb ?? "n/a"} GB</span>
                </FieldHeader>

                <ProgressBar
                    value={(machineProfile.ramGb ?? 0) / 32}
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