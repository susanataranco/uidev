import styled from 'styled-components'
import {FaReact, FaAngular, FaVuejs} from 'react-icons/fa'
import type {Stat} from '../data/resume'

const iconMap = {
    react: FaReact,
    angular: FaAngular,
    vue: FaVuejs,
}

interface StatBarProps {
    stats: Stat[]
    variant?: 'bar' | 'compact'
}

export function StatBar({stats, variant = 'bar'}: StatBarProps) {
    return (
        <Bar $variant={variant}>
            {stats.map((stat) => (
                <StatItem key={stat.label} $variant={variant}>
                    {stat.type === 'icons' && stat.icons ? (
                        <IconsRow $variant={variant}>
                            {stat.icons.map((iconKey) => {
                                const Icon = iconMap[iconKey]
                                return <Icon key={iconKey}/>
                            })}
                        </IconsRow>
                    ) : (
                        <StatValue $variant={variant}>{stat.value}</StatValue>
                    )}
                    <StatLabel>{stat.label}</StatLabel>
                </StatItem>
            ))}
        </Bar>
    )
}

const Bar = styled.div<{ $variant: 'bar' | 'compact' }>`
    display: flex;
    flex-direction: ${({$variant}) => ($variant === 'compact' ? 'column' : 'row')};

    ${({$variant, theme}) =>
            $variant === 'bar' &&
            `
      border-top: 1px solid ${theme.colors.line};
      border-bottom: 1px solid ${theme.colors.line};
    `}

    ${({$variant, theme}) =>
            $variant === 'compact' &&
            `
      gap: ${theme.spacing(2)};
    `}
`

const StatItem = styled.div<{ $variant: 'bar' | 'compact' }>`
    ${({$variant, theme}) =>
            $variant === 'bar'
                    ? `
        flex: 1;
        padding: ${theme.spacing(3)};
        text-align: center;
        border-right: 1px solid ${theme.colors.line};
        &:last-child { border-right: none; }
      `
                    : `
        display: flex;
        align-items: baseline;
        gap: ${theme.spacing(1.5)};
        border-bottom: 1px solid ${theme.colors.line};
        padding-bottom: ${theme.spacing(1)};
      `}
`

const StatValue = styled.div<{ $variant: 'bar' | 'compact' }>`
    font-family: ${({theme}) => theme.font.heading};
    font-weight: 700;
    color: ${({theme}) => theme.colors.accent};
    font-size: ${({$variant}) => ($variant === 'bar' ? '32px' : '16px')};
    margin-bottom: ${({$variant, theme}) => ($variant === 'bar' ? theme.spacing(1) : '0')};
`

const IconsRow = styled.div<{ $variant: 'bar' | 'compact' }>`
    display: flex;
    gap: ${({theme}) => theme.spacing(1)};
    color: ${({theme}) => theme.colors.accent};
    font-size: ${({$variant}) => ($variant === 'bar' ? '32px' : '16px')};
    justify-content: ${({$variant}) => ($variant === 'bar' ? 'center' : 'flex-start')};
    margin-bottom: ${({$variant, theme}) => ($variant === 'bar' ? theme.spacing(1) : '0')};
`

const StatLabel = styled.div`
    font-size: 12px;
    color: ${({theme}) => theme.colors.textMuted};
`