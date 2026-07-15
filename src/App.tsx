import styled from 'styled-components'
import TestCube from './scene/TestCube'

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.accent};
  font-family: ${({ theme }) => theme.font.body};
    
`
function App() {
    return (
        <>
            <Title>UI Dev</Title>
            <TestCube/>
        </>
    );
}

export default App
