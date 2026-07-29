import styled from 'styled-components'
import {Button} from "../components/Button.tsx";
import {Link} from "../components/Link.tsx";
import {Typoghraphy} from "../components/Typography.tsx";

export default function Home() {

    return (
        <Wrapper>
            <HomeGrid>
                <Section style={{gridArea: 'identity'}}>
                    <Typoghraphy variant="heading" size="large" className="uppercase p-none m-none">Susana
                        Taranco</Typoghraphy>

                    <div>
                        <Typoghraphy variant="body" size="large" className="uppercase p-none m-none">UI / Frontend
                            Developer</Typoghraphy>
                        <Typoghraphy variant="body" size="medium" className="uppercase p-none m-none">Coherent GT,
                            React,
                            Typescript</Typoghraphy>
                    </div>
                </Section>

                <Section style={{gridArea: 'bio'}} className="pt-l pb-l">
                    <Typoghraphy variant="body" size="medium" className="p-none m-none">12+ years building interfaces
                        for AAA games and web
                        products. Focused on performance and fluid experiences.</Typoghraphy>
                    <div className="flex justify-end">
                        <Link to="/bio">See more →</Link>
                    </div>
                </Section>

                <Section style={{gridArea: 'projects'}}>
                    <Typoghraphy variant="heading" size="small" className="uppercase">Projects</Typoghraphy>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                        <Button to="/project/project-1">Project #01</Button>
                        <Button to="/project/project-2">Project #02</Button>
                        <Button to="/project/project-3">Project #03</Button>
                        <Button to="/project/project-4">Project #04</Button>
                        <Button to="/project/project-5">Project #05</Button>
                    </div>
                </Section>

                <Section style={{gridArea: 'avatar'}}>

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
    'identity avatar'
    'bio      avatar'
    'projects avatar';
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