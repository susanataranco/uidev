import styled from 'styled-components'

export function BackgroundVideo() {
    return (
        <VideoWrapper>
            <Video autoPlay loop muted playsInline>
                <source src="/video/distorted_background.mp4" type="video/mp4"/>
            </Video>
        </VideoWrapper>
    )
}

const VideoWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    overflow: hidden;
`

const Video = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(80px) brightness(0.7);
    transform: scale(1.1);
`
