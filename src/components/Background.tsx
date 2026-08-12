import styled from 'styled-components'

export function Background() {
    return (
        <Wrapper>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    overflow: hidden;
    background: ${({theme}) => theme.colors.ui.background};

    @keyframes move {
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 0.6;
            filter: brightness(1);
        }
        50% {
            opacity: 1;
            filter: brightness(1.4);
        }
    }

    & span {
        width: 50vmin;
        height: 50vmin;
        border-radius: 50vmin;
        backface-visibility: hidden;
        position: absolute;
        animation-duration: 10s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
    }

    & span:nth-child(1) {
        width: 5vmin;
        height: 5vmin;
        color: #8c8413;
        top: 18%;
        left: -17%;
        animation-name: move;
        animation-duration: 208s;
        animation-delay: -171s;
        transform-origin: 31vw 5vh;
        box-shadow: 100vmin 0 12.876073059142747vmin currentColor;
    }

    & span:nth-child(2) {
        width: 10vmin;
        height: 10vmin;
        color: #116140;
        top: 18%;
        left: 17%;
        animation-name: move;
        animation-duration: 208s;
        animation-delay: -171s;
        transform-origin: 21vw 5vh;
        box-shadow: 100vmin 0 12.876073059142747vmin currentColor;
    }

    & span:nth-child(3) {
        color: #454857;
        top: 80%;
        left: 32%;
        animation-name: move;
        animation-duration: 117s;
        animation-delay: -54s;
        transform-origin: 8vw 14vh;
        box-shadow: -100vmin 0 13.034743783203519vmin currentColor;
    }

    & span:nth-child(4) {
        color: #1c2748;
        top: 45%;
        left: 12%;
        animation-name: pulse;
        animation-duration: 144s;
        animation-delay: -329s;
        transform-origin: -2vw -14vh;
        box-shadow: 100vmin 0 12.901230348777888vmin currentColor;
    }

    & span:nth-child(5) {
        color: #001e57;
        top: 25%;
        left: 43%;
        animation-name: move;
        animation-duration: 340s;
        animation-delay: -3s;
        transform-origin: 7vw 16vh;
        box-shadow: -100vmin 0 13.330936997407855vmin currentColor;
    }
`