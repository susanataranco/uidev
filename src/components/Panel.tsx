import styled from 'styled-components'
import type { ReactNode, CSSProperties } from 'react'

interface PanelProps {
    borderTop?: boolean
    borderBottom?: boolean
    borderLeft?: boolean
    borderRight?: boolean
    corners?: boolean
    style?: CSSProperties
    children?: ReactNode
}

export function Panel({
                          borderTop,
                          borderBottom,
                          borderLeft,
                          borderRight,
                          corners,
                          style,
                          children,
                      }: PanelProps) {
    return (
        <StyledPanel
            style={style}
            $borderTop={borderTop}
            $borderBottom={borderBottom}
            $borderLeft={borderLeft}
            $borderRight={borderRight}
        >
            {corners && (
                <>
                    <CornerMark $pos="tl" />
                    <CornerMark $pos="tr" />
                    <CornerMark $pos="bl" />
                    <CornerMark $pos="br" />
                </>
            )}
            {children}
        </StyledPanel>
    )
}

interface StyledPanelProps {
    $borderTop?: boolean
    $borderBottom?: boolean
    $borderLeft?: boolean
    $borderRight?: boolean
}

const StyledPanel = styled.div<StyledPanelProps>`
  position: relative;
  border-top: ${({ theme, $borderTop }) =>
    $borderTop ? `1px solid ${theme.colors.line}` : 'none'};
  border-bottom: ${({ theme, $borderBottom }) =>
    $borderBottom ? `1px solid ${theme.colors.line}` : 'none'};
  border-left: ${({ theme, $borderLeft }) =>
    $borderLeft ? `1px solid ${theme.colors.line}` : 'none'};
  border-right: ${({ theme, $borderRight }) =>
    $borderRight ? `1px solid ${theme.colors.line}` : 'none'};
  padding: ${({ theme }) => theme.spacing(2)};
`

const CornerMark = styled.span<{ $pos: 'tl' | 'tr' | 'bl' | 'br' }>`
    position: absolute;
    width: 10px;
    height: 10px;
    pointer-events: none;

    ${({ $pos, theme }) =>
            $pos === 'tl' &&
            `top: -10px; left: -10px; border-bottom: 1px solid ${theme.colors.line}; border-right: 1px solid ${theme.colors.line};`}
    ${({ $pos, theme }) =>
            $pos === 'tr' &&
            `top: -10px; right: -10px; border-bottom: 1px solid ${theme.colors.line}; border-left: 1px solid ${theme.colors.line};`}
    ${({ $pos, theme }) =>
            $pos === 'bl' &&
            `bottom: -10px; left: -10px; border-top: 1px solid ${theme.colors.line}; border-right: 1px solid ${theme.colors.line};`}
    ${({ $pos, theme }) =>
            $pos === 'br' &&
            `bottom: -10px; right: -10px; border-top: 1px solid ${theme.colors.line}; border-left: 1px solid ${theme.colors.line};`}
`