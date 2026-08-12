import styled from "styled-components";
import {motion, AnimatePresence} from "framer-motion";
import {useHudModules} from "../../../hooks/useHudModules.ts";
import {BoolButton} from "../../../components/BoolButton.tsx";
import type {HudModuleId} from "../../../data/hudmodules.ts";
import {SystemConsole} from "./SystemConsole.tsx";
import {Machine} from "./hud_blocks/Machine.tsx";
import {Browser} from "./hud_blocks/Browser.tsx";
import {User} from "./hud_blocks/User.tsx";
import {ActivityMap} from "./charts/ActivityMap.tsx";

export function Hud() {
    const {modules, isVisible, toggle} = useHudModules();

    function renderModuleContent(id: HudModuleId) {
        switch (id) {
            case "activity":
                return (
                    <ActivityMap/>
                );

            case "machine":
                return (
                    <Machine/>
                );

            case "browser": {
                return (
                    <Browser/>
                );
            }

            case "user":
                return (
                    <User/>
                );
        }
    }

    return (
        <Wrapper>
            <Toggles>
                {modules.map((module) => (
                    <BoolButton
                        key={module.id}
                        active={isVisible(module.id)}
                        onClick={() => toggle(module.id)}
                    >
                        {module.label}
                    </BoolButton>
                ))}
            </Toggles>

            <Grid>
                <AnimatePresence mode="popLayout">
                    {modules
                        .filter((module) => isVisible(module.id))
                        .map((module) => (
                            <ModuleCard
                                key={module.id}
                                layout
                                initial={{opacity: 0, scale: 0.9}}
                                animate={{opacity: 1, scale: 1}}
                                exit={{opacity: 0, scale: 0.9}}
                                transition={{
                                    type: "spring",
                                    stiffness: 350,
                                    damping: 30,
                                }}
                            >
                                <Label>{module.label.toUpperCase()}</Label>
                                {renderModuleContent(module.id)}
                            </ModuleCard>
                        ))}
                </AnimatePresence>
            </Grid>

            <SystemConsole/>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    font-family: ${({theme}) => theme.fonts.family.body};
    color: ${({theme}) => theme.colors.ui.textMuted};
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 80%;
    margin: 0 auto;
`

const Toggles = styled.div`
    display: flex;
    justify-content: center;
    gap: 6px;
    flex-wrap: wrap;
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    grid-auto-rows: auto;
    gap: 12px;
`

const ModuleCard = styled(motion.div)`
    border: 1px solid ${({theme}) => theme.colors.ui.line};
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
`

const Label = styled.div`
    color: ${({theme}) => theme.colors.semantic.accent.base};
    font-size: 11px;
    letter-spacing: 1px;
    margin-bottom: 4px;
`