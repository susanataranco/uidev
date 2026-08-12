import styled from 'styled-components'
import {FaReact, FaAngular, FaVuejs} from 'react-icons/fa'
import type {Stat} from '../../../data/resume.ts'
import {motion, AnimatePresence} from "framer-motion";
import {Button} from "../../../components/Button.tsx";
import {IoChevronUp} from "react-icons/io5";
import {useState} from "react";

const iconMap = {
    react: FaReact,
    angular: FaAngular,
    vue: FaVuejs,
}

interface StatBarProps {
    immersiveMode?: boolean
    stats: Stat[]
    className?: string
}

export function InfoBlock({immersiveMode, stats, className}: StatBarProps) {
    const [open, setOpen] = useState(true)

    return (
        <>
            <AnimatePresence initial={false}>
                {
                    open && (
                        <Block
                            className={className}
                            initial={{height: 0}}
                            animate={{height: "auto"}}
                            exit={{height: 0}}
                            transition={{duration: 0.3, ease: "easeInOut"}}
                        >
                            {stats.map((stat) => (
                                <InfoItem key={stat.label}>
                                    {stat.type === 'icons' && stat.icons ? (
                                        <IconsRow>
                                            {stat.icons.map((iconKey) => {
                                                const Icon = iconMap[iconKey]
                                                return <Icon key={iconKey}/>
                                            })}
                                        </IconsRow>
                                    ) : (
                                        <InfoValue>{stat.value}</InfoValue>
                                    )}
                                    <InfoLabel>{stat.label}</InfoLabel>
                                </InfoItem>
                            ))}
                        </Block>
                    )
                }
            </AnimatePresence>

            {immersiveMode && (
                <Button variant="text" onClick={() => setOpen((current) => !current)}>
                    <IoChevronUp size={20}/>
                </Button>
            )}
        </>
    )
}

const Block = styled(motion.div)`
    display: flex;
    flex-direction: column;
    gap: ${({theme}) => theme.spacing(2)};
    overflow: hidden;
`

const InfoItem = styled.div`
    display: flex;
    align-items: center;
    gap: ${({theme}) => theme.spacing(1.5)};
    border-bottom: ${({theme}) => `1px solid ${theme.colors.ui.line}`};
    padding-bottom: ${({theme}) => theme.spacing(1)};
`

const InfoValue = styled.div`
    font-family: ${({theme}) => theme.fonts.family.heading};
    font-weight: 700;
    color: ${({theme}) => theme.colors.semantic.accent.base};
    font-size: 16px;
`

const IconsRow = styled.div`
    display: flex;
    gap: ${({theme}) => theme.spacing(1)};
    color: ${({theme}) => theme.colors.semantic.accent.base};
    font-size: 32px;
    justify-content: flex-start;
`

const InfoLabel = styled.div`
    font-size: 12px;
    color: ${({theme}) => theme.colors.ui.textMuted};
`