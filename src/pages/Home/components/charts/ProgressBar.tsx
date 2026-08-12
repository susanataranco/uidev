import styled from "styled-components"

interface ProgressBarProps {
    value: number // 0-1
}

export function ProgressBar({value}: ProgressBarProps) {
    const clamped = Math.min(1, Math.max(0, value))

    return (
        <Track role="img" aria-label={`${Math.round(clamped * 100)}%`}>
            <Fill style={{width: `${clamped * 100}%`}}/>
        </Track>
    )
}

const Track = styled.div`
    width: 100%;
    height: 4px;
    background: ${({theme}) => theme.colors.ui.line};
`

const Fill = styled.div`
    height: 100%;
    background: ${({theme}) => theme.colors.semantic.accent.base};
    transition: width 0.15s ease-out;
`
