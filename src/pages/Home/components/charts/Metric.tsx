import styled from "styled-components";

interface MetricProps {
    label: string;
    value: string | number | null | undefined;
}

export function Metric({
                           label,
                           value
                       }: MetricProps) {
    const isMuted = value === null || value === undefined;
    return (
        <Wrapper>
            <Label>{label}</Label>
            <Value $isMuted={isMuted}>{isMuted ? "n/a" : value}</Value>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
`;

const Label = styled.span`
    color: ${({theme}) => theme.colors.ui.textMuted};
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: .08em;
`;

const Value = styled.span<{ $isMuted: boolean }>`
    color: ${({theme, $isMuted}) => $isMuted ? theme.colors.semantic.accent.dim : theme.colors.semantic.accent.base};
    font-family: ${({theme}) => theme.fonts.family.code};
    font-size: 12px;
`;