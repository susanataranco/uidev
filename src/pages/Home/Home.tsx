import styled from 'styled-components'
import {Link} from "../../components/Link.tsx";
import {Typography} from "../../components/Typography.tsx";
import {Hud} from "./components/Hud.tsx";

export default function Home() {

    return (
        <Wrapper>
            <HomeGrid>
                <Section style={{gridArea: 'identity'}}>
                    <Typography variant="heading" size="lg" className="uppercase p-none m-none">Susana
                        Taranco</Typography>

                    <div>
                        <Typography variant="body" size="lg" className="uppercase p-none m-none">UI / Frontend
                            Developer</Typography>
                        <Typography variant="body" size="md" className="uppercase p-none m-none">Coherent GT,
                            React,
                            Typescript</Typography>
                    </div>
                </Section>

                <Section style={{gridArea: 'bio'}} className="pt-l pb-l">
                    <Typography variant="body" size="md" className="p-none m-none">12+ years building interfaces
                        for AAA games and web
                        products. Focused on performance and fluid experiences.</Typography>
                    <div className="flex justify-end">
                        <Link to="/bio">See more →</Link>
                    </div>
                </Section>

                <Section style={{gridArea: 'projects'}}>
                    <Typography variant="heading" size="sm" className="uppercase">Projects</Typography>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                        <Link to="/project/project-1" variant="button">Project #01</Link>
                        <Link to="/project/project-2" variant="button">Project #02</Link>
                        <Link to="/project/project-3" variant="button">Project #03</Link>
                        <Link to="/project/project-4" variant="button">Project #04</Link>
                        <Link to="/project/project-5" variant="button">Project #05</Link>
                    </div>
                </Section>

                <Section style={{gridArea: 'hud'}}>
                    <Hud/>
                </Section>
            </HomeGrid>
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

const HomeGrid = styled.div`
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
    'identity hud'
    'bio      hud'
    'projects hud';
    padding: 40px;
    gap: 24px;

    @media (max-width: ${({theme}) => theme.breakpoints.mobile}) {
        display: block;
        height: 100vh;
        overflow-y: auto;
        scroll-snap-type: y mandatory;
        padding: 0;
        scrollbar-width: none;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
            display: none;
        }
    }
`

const Section = styled.div`
    @media (max-width: ${({theme}) => theme.breakpoints.mobile}) {
        height: 100vh;
        scroll-snap-align: start;
        scroll-snap-stop: always;
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
    }
`