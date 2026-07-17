import {useState} from 'react'
import styled from 'styled-components'
import type {TimelineEntry} from '../data/resume'
import {Panel} from './Panel'

interface TimelineProps {
    entries: TimelineEntry[]
}

export function Timeline({entries}: TimelineProps) {
    const [activeId, setActiveId] = useState(entries[0]?.id)
    const activeEntry = entries.find((entry) => entry.id === activeId)

    return (
        <TimelineWrapper>
            <CardsRow>
                {entries.map((entry) => (
                    <div key={entry.id}>
                        <Card
                            type="button"
                            $active={entry.id === activeId}
                            onClick={() => setActiveId(entry.id)}
                            data-cursor-hover
                        >
                            {entry.company}
                        </Card>
                        <PeriodLabel>{entry.period}</PeriodLabel>
                    </div>
                ))}
            </CardsRow>

            {activeEntry && (
                <DetailPanel corners>
                    <h3>{activeEntry.role}</h3>
                    {activeEntry.description.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                    ))}
                    <div>
                        {activeEntry.tech.map((tech) => (
                            <TechTag key={tech}>{tech}</TechTag>
                        ))}
                    </div>
                </DetailPanel>
            )}
        </TimelineWrapper>
    )
}


const TimelineWrapper = styled.div``

const CardsRow = styled.div`
    display: flex;
    gap: ${({theme}) => theme.spacing(1)};
    overflow-x: auto;
    padding-bottom: ${({theme}) => theme.spacing(2)};
`

const Card = styled.button<{ $active: boolean }>`
    flex: 0 0 auto;
    padding: ${({theme}) => theme.spacing(1)} ${({theme}) => theme.spacing(2)};
    background: transparent;
    border: 1px solid ${({theme, $active}) => ($active ? theme.colors.accent : theme.colors.line)};
    color: ${({theme, $active}) => ($active ? theme.colors.accent : theme.colors.text)};
    font-family: ${({theme}) => theme.font.body};
    font-size: 14px;
    white-space: nowrap;
    transition: border-color 0.2s ease, color 0.2s ease;

    &:hover {
        border-color: ${({theme}) => theme.colors.accent};
    }
`

const PeriodLabel = styled.div`
    font-size: 12px;
    color: ${({theme}) => theme.colors.textMuted};
    margin-top: ${({theme}) => theme.spacing(0.5)};
`

const DetailPanel = styled(Panel)`
    margin-top: ${({theme}) => theme.spacing(2)};
`

const TechTag = styled.span`
    display: inline-block;
    border: 1px solid ${({theme}) => theme.colors.line};
    color: ${({theme}) => theme.colors.textMuted};
    font-size: 12px;
    padding: 2px 8px;
    margin-right: ${({theme}) => theme.spacing(1)};
    margin-top: ${({theme}) => theme.spacing(1)};
`