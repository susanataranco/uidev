import styled from 'styled-components'
import {StatBar} from '../components/StatBar'
import {Timeline} from '../components/Timeline'
import {timeline, stats, type TimelineEntry} from '../data/resume'
import {Typoghraphy} from "../components/Typography.tsx";
import {useState} from "react";
import {Button} from "../components/Button.tsx";
import {IoArrowBack} from "react-icons/io5";
import {Panel} from "../components/Panel.tsx";

export default function Bio() {
    const [immersive, setImmersive] = useState(false)
    const [selectedEntry, setSelectedEntry] = useState(null)
    const handleOpenInfoPanel = (entry: TimelineEntry) => {
        setSelectedEntry(entry)
    }

    function handleCloseInfoPanel() {
        setSelectedEntry(null)
    }

    return (
        <PageLayout $immersive={immersive}>
            <Grid $immersive={immersive}>
                <LeftColumn $floating={immersive}>
                    <Button to="/" className={immersive ? "relative" : "absolute"}>
                        <IoArrowBack size={20}/>
                    </Button>

                    <div className="flex flex-column justify-center h-100">
                        <div>
                            <Typoghraphy variant="heading" size="medium" className="uppercase p-none m-none">Susana
                                Taranco</Typoghraphy>
                            <Typoghraphy variant="body" size="medium" className="uppercase p-none m-none">UI/Frontend
                                Developer</Typoghraphy>
                        </div>

                        <StatBar stats={stats} variant="compact" className="mt-l"/>
                    </div>
                </LeftColumn>

                <RightColumn>
                    {!immersive && (
                        <Typoghraphy variant="heading" size="small" className="uppercase">Experience</Typoghraphy>
                    )}
                    <Timeline entries={timeline} onEntrySelect={(entry) => handleOpenInfoPanel(entry)}
                              immersive={immersive} onImmersiveToggle={() => setImmersive((current) => !current)}/>
                </RightColumn>
            </Grid>

            <Panel isOpen={selectedEntry !== null} onClose={handleCloseInfoPanel} direction="right" size="400px">
                {selectedEntry && (
                    <div className="p-m">
                        <Typoghraphy variant="heading"
                                     size="medium"
                                     className="p-none m-none">{selectedEntry.company ?? selectedEntry.label}</Typoghraphy>

                        <Typoghraphy variant="body"
                                     size="small"
                                     className="p-none m-none">{selectedEntry.period ?? selectedEntry.year}</Typoghraphy>

                        <Typoghraphy variant="heading"
                                     size="small">{selectedEntry.role}</Typoghraphy>

                        {selectedEntry.description?.map((line: string, i: number) => <p className="p-b-xs"
                                                                                        key={i}>{line}</p>)}
                    </div>
                )}
            </Panel>
        </PageLayout>
    )
}

const PageLayout = styled.div<{ $immersive: boolean }>`
    height: 100vh;
    overflow: hidden;
    padding: ${({theme, $immersive}) => $immersive ? 0 : theme.spacing(8)};
    transition: padding 0.3s ease;

    @media (max-width: ${({theme}) => theme.breakpoints.mobile}) {
        padding: 0;
    }
`

const Grid = styled.div<{ $immersive: boolean }>`
    height: 100%;
    display: ${({$immersive}) => $immersive ? "block" : "grid"};
    grid-template-columns: 360px 1fr;
    gap: 0;
`

const LeftColumn = styled.div<{ $floating: boolean }>`
    padding: ${({theme}) => theme.spacing(4)};
    border-right: ${({theme, $floating}) => $floating ? "none" : `1px solid ${theme.colors.line}`};
    display: flex;
    flex-direction: column;
    gap: ${({theme}) => theme.spacing(3)};
    overflow: hidden;
    transition: opacity 0.2s ease;

    ${({$floating, theme}) => $floating && `
        position: fixed;
        top: ${theme.spacing(3)};
        left: ${theme.spacing(3)};
        z-index: 10;
        width: 280px;
        border: 1px solid ${theme.colors.line};
        background: ${theme.colors.background};
        justify-content: flex-start;
    `}
`

const RightColumn = styled.div`
    padding: ${({theme}) => theme.spacing(4)};
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${({theme}) => theme.spacing(2)};
    overflow-y: hidden;
    height: 100%;
`