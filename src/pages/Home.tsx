import styled from 'styled-components'
import {Panel} from "../components/Panel.tsx";
import {Button} from "../components/Button.tsx";
import Model from "../scene/3DModel.tsx";
export default function Home() {
    return (
        <Wrapper>
            <Panel corners style={{ height: '100%' }}>
                <HomeGrid>
                    <Section style={{ gridArea: 'identity' }}>
                        <h1>Susana Taranco</h1>
                        <p>UI / Frontend Developer</p>
                    </Section>

                    <Section style={{ gridArea: 'bio' }}>
                        <p>Short test bio. See more →</p>
                    </Section>

                    <Section style={{ gridArea: 'projects' }} borderTop>
                        <p>PROJECTS</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <Button to="/project/project-1">01</Button>
                            <Button to="/project/project-2">02</Button>
                            <Button to="/project/project-3">03</Button>
                            <Button to="/project/project-4">04</Button>
                            <Button to="/project/project-5">05</Button>
                        </div>
                    </Section>

                    <Section style={{ gridArea: 'avatar' }} borderLeft>
                        <Model />
                    </Section>
                </HomeGrid>
            </Panel>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    height: 100vh;
    overflow: hidden;
    padding: ${({ theme }) => theme.spacing(8)};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 0;
    }
`

const HomeGrid = styled.div`
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
    'identity avatar'
    'bio      avatar'
    'projects avatar';
    padding: 40px;
    gap: 24px;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        display: block;
        height: 100vh;
        overflow-y: auto;
        scroll-snap-type: y mandatory;
        padding: 0;
        /* oculta la barra de scroll visualmente */
        scrollbar-width: none;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
            display: none;
        }
    }
`

const Section = styled(Panel)`
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 100vh;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
  }
`