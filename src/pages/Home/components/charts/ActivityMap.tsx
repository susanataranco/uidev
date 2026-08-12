import styled from "styled-components";
import {useLiveTelemetry} from "../../../../hooks/useLiveTelemetry.ts";

const GRID_COLS = 5
const GRID_ROWS = 5

export function ActivityMap() {
    const {user} = useLiveTelemetry();

    return (
        <Grid>
            {
                user.cellHeat.map((heat, index) => (
                    <Cell key={index}>
                        <CellBackground style={{opacity: 0.15 + heat * (1 - 0.15)}}/>
                        {
                            index === user.currentCell && <Dot/>
                        }
                    </Cell>
                ))
            }
        </Grid>
    )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(${GRID_COLS}, 1fr);
    grid-template-rows: repeat(${GRID_ROWS}, 1fr);
    gap: 2px;
    aspect-ratio: ${GRID_COLS} / ${GRID_ROWS};
    width: 100%;
`;

const Cell = styled.div`
    position: relative;
`;

const CellBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({theme}) => theme.colors.semantic.accent.base};
    transition: opacity 0.25s ease;
`

const Dot = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 2px;
    background: ${({theme}) => theme.colors.semantic.accent.base};
    transform: translateX(-50%) translateY(-50%);
    z-index: 1;
`