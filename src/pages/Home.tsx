import styled from 'styled-components'
import {Panel} from "../components/Panel.tsx";
import {Button} from "../components/Button.tsx";
export default function Home() {
    return (
        <HomeGrid>
            <Panel style={{ gridArea: 'identity' }} borderBottom>
                <h1>Susana Taranco</h1>
                <p>UI / Frontend Developer</p>
            </Panel>

            <Panel style={{ gridArea: 'bio' }}>
                    <p>Short test bio. See more →</p>
                </Panel>

                <Panel style={{ gridArea: 'projects' }} borderTop>
                    <p>PROJECTS</p>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <Button to="/project/project-1">01</Button>
                        <Button to="/project/project-2">02</Button>
                        <Button to="/project/project-3">03</Button>
                        <Button to="/project/project-4">04</Button>
                        <Button to="/project/project-5">05</Button>
                    </div>
                </Panel>

                <Panel style={{ gridArea: 'avatar' }} borderLeft />

        </HomeGrid>
    )
}

const HomeGrid = styled.div`
    height: 100vh;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
    'identity avatar'
    'bio      avatar'
    'projects avatar';
    padding: 40px;
    gap: 24px;
`