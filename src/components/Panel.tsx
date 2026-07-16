import styled from 'styled-components'

interface PanelProps {
    borderTop?: boolean
    borderBottom?: boolean
    borderLeft?: boolean
    borderRight?: boolean
}

export const Panel = styled.div<PanelProps>`
  border-top: ${({ theme, borderTop }) =>
    borderTop ? `1px solid ${theme.colors.line}` : 'none'};
  border-bottom: ${({ theme, borderBottom }) =>
    borderBottom ? `1px solid ${theme.colors.line}` : 'none'};
  border-left: ${({ theme, borderLeft }) =>
    borderLeft ? `1px solid ${theme.colors.line}` : 'none'};
  border-right: ${({ theme, borderRight }) =>
    borderRight ? `1px solid ${theme.colors.line}` : 'none'};
  padding: ${({ theme }) => theme.spacing(2)};
`