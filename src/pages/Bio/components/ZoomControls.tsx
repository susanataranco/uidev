import styled from 'styled-components'
import {Button} from "../../../components/Button.tsx";
import {HiMiniMagnifyingGlassPlus, HiMiniMagnifyingGlassMinus} from "react-icons/hi2";

interface ZoomControlsProps {
    onZoomIn: () => void
    onZoomOut: () => void
    onReset: () => void
}

export function ZoomControls({onZoomIn, onZoomOut, onReset}: ZoomControlsProps) {
    return (
        <Wrapper>
            <Button onClick={onZoomOut} aria-label="Zoom out">
                <HiMiniMagnifyingGlassMinus size={16}/>
            </Button>
            <Button onClick={onReset} aria-label="Reset view">
                reset
            </Button>
            <Button onClick={onZoomIn} aria-label="Zoom in">
                <HiMiniMagnifyingGlassPlus size={16}/>
            </Button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    gap: 6px;
`;