import styled from "styled-components"

interface CoreBarsProps {
    count: number
}

export function CoreBars({count}: CoreBarsProps) {
    return (
        <Row aria-label={`${count} cores`}>
            {Array.from({length: count}).map((_, i) => (
                <Bar key={i}/>
            ))}
        </Row>
    )
}

const Row = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 2px;
    height: 16px;
`

const Bar = styled.div`
    width: 4px;
    height: 100%;
    background: ${({theme}) => theme.colors.semantic.accent.base};
    opacity: 0.7;
`
