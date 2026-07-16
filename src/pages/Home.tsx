import styled from 'styled-components'
export default function Home() {
    return (
        <HomeGrid>
            <Identity>
                <h1>Susana Taranco</h1>
                <p>UI / Frontend Developer</p>
            </Identity>

            <Bio>
                <p>Short test bio. See more →</p>
            </Bio>

            <Projects>
                <p>PROJECTS</p>
                <p>[01] [02] [03] [04] [05]</p>
            </Projects>

            <AvatarSlot />
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

const Identity = styled.div`
  grid-area: identity;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  padding-bottom: 16px;
`

const Bio = styled.div`
  grid-area: bio;
`

const Projects = styled.div`
  grid-area: projects;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  padding-top: 16px;
`

const AvatarSlot = styled.div`
  grid-area: avatar;
  border-left: 1px solid ${({ theme }) => theme.colors.line};
`