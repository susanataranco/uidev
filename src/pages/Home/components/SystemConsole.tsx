import styled from "styled-components";
import {useSystemLog} from "../../../hooks/useSystemLog.ts";
import {useBehaviorAnalysis} from "../../../hooks/useBehaviorAnalysis.ts";

export function SystemConsole() {
    const behavior = useBehaviorAnalysis();
    const {entries} = useSystemLog(behavior);

    return (
        <Wrapper>
            <ScrollContainer>
                {entries.map((entry) => (
                    <Entry key={entry.id} className="system-console__line">
                        <Time className="system-console__time">
                            [{entry.timestamp}]
                        </Time>

                        <Message className="system-console__message">
                            {entry.message}
                        </Message>
                    </Entry>
                ))}
            </ScrollContainer>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    overflow: hidden;
    background: ${({theme}) => theme.colors.ui.background};
    padding: ${({theme}) => theme.spacing(0)} ${({theme}) => theme.spacing(1)} ${({theme}) => theme.spacing(1)} ${({theme}) => theme.spacing(1)};
    display: flex;
    align-items: end;
    max-height: 200px;
`

const ScrollContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-family: ${({theme}) => theme.fonts.family.code};
    font-size: 12px;
`

const Entry = styled.div`
    display: flex;
    gap: 8px;
`


const Time = styled.div`
    opacity: .5;
`

const Message = styled.div`
    color: ${({theme}) => theme.colors.semantic.accent.base};
`