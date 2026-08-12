import styled from 'styled-components'
import {InfoBlock} from './components/InfoBlock.tsx'
import {Timeline} from './components/Timeline.tsx'
import {timeline, stats, type TimelineEntry} from '../../data/resume.ts'
import {Typography} from "../../components/Typography.tsx";
import {useState} from "react";
import {IoArrowBack} from "react-icons/io5";
import {Panel} from "../../components/Panel.tsx";
import {Link} from "../../components/Link.tsx";

export default function Bio() {
    const [immersive, setImmersive] = useState(false)
    const [selectedEntry, setSelectedEntry] = useState<TimelineEntry | null>(null);

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
                    <Link to="/" className={immersive ? "relative" : "absolute"}>
                        <IoArrowBack size={20}/>
                    </Link>

                    <div className="flex flex-column justify-center h-100">
                        <div>
                            <Typography variant="heading" size="md" className="uppercase p-none m-none">Susana
                                Taranco</Typography>
                            <Typography variant="body" size="md" className="uppercase p-none m-none">UI/Frontend
                                Developer</Typography>
                        </div>

                        <InfoBlock stats={stats} immersiveMode={immersive} className="mt-l"/>
                    </div>
                </LeftColumn>

                <RightColumn>
                    {!immersive && (
                        <Typography variant="heading" size="sm" className="uppercase">Experience</Typography>
                    )}
                    <Timeline entries={timeline} onEntrySelect={(entry) => handleOpenInfoPanel(entry)}
                              immersive={immersive} onImmersiveToggle={() => setImmersive((current) => !current)}/>
                </RightColumn>
            </Grid>

            <Panel isOpen={selectedEntry !== null} onClose={handleCloseInfoPanel} direction="right" size="400px">
                {selectedEntry && (
                    <div className="p-m">
                        <Typography variant="heading"
                                    size="sm"
                                    className="p-none m-none">{selectedEntry.company ?? selectedEntry.label}</Typography>

                        <Typography variant="body"
                                    size="sm"
                                    className="p-none m-none">{selectedEntry.period ?? selectedEntry.year}</Typography>

                        <Typography variant="heading"
                                    size="sm">{selectedEntry.role}</Typography>

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
    border-right: ${({theme, $floating}) => $floating ? "none" : `1px solid ${theme.colors.ui.line}`};
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
        width: 320px;
        border: 1px solid ${theme.colors.ui.line};
        background: ${theme.colors.ui.background};
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