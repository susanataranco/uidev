import styled from 'styled-components'
import {Panel} from '../components/Panel'
import {StatBar} from '../components/StatBar'
import {Timeline} from '../components/Timeline'
import {CharacterAnchor} from '../components/CharacterAnchor'
import {timeline, stats} from '../data/resume'

export default function Bio() {
    return (
        <Wrapper>
            <Panel corners style={{height: '100%'}}>
                <Grid>
                    <LeftColumn>
                        <h1>Susana Taranco</h1>
                        <p>Frontend / UI Developer</p>
                        <p>
                            12+ years building interfaces for AAA games and web products.
                            Focused on performance and fluid experiences.
                        </p>
                        <AvatarSlot>
                            <CharacterAnchor/>
                        </AvatarSlot>
                        <StatBar stats={stats} variant="compact"/>
                    </LeftColumn>

                    <RightColumn>
                        <h2>Experience</h2>
                        <Timeline entries={timeline}/>
                    </RightColumn>
                </Grid>
            </Panel>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    height: 100vh;
    overflow: hidden;
    padding: ${({theme}) => theme.spacing(8)};

    @media (max-width: ${({theme}) => theme.breakpoints.mobile}) {
        padding: 0;
    }
`

const Grid = styled.div`
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1.8fr;
    gap: 0;
`

const LeftColumn = styled.div`
    padding: ${({theme}) => theme.spacing(4)};
    border-right: 1px solid ${({theme}) => theme.colors.line};
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${({theme}) => theme.spacing(3)};
`

const AvatarSlot = styled.div`
    width: 120px;
    height: 120px;
`

const RightColumn = styled.div`
    padding: ${({theme}) => theme.spacing(4)};
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${({theme}) => theme.spacing(2)};
    overflow-y: auto;
`