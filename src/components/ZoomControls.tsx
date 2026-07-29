import styled from 'styled-components'
import {ActionButton} from "./ActionButton";
import {HiMiniMagnifyingGlassPlus, HiMiniMagnifyingGlassMinus} from "react-icons/hi2";

interface ZoomControlsProps {
    onZoomIn: () => void
    onZoomOut: () => void
    onReset: () => void
}

export function ZoomControls({onZoomIn, onZoomOut, onReset}: ZoomControlsProps) {
    return (
        <Wrapper>
            <ActionButton onClick={onZoomOut} aria-label="Zoom out">
                <HiMiniMagnifyingGlassMinus size={16}/>
            </ActionButton>
            <ActionButton onClick={onReset} aria-label="Reset view">
                reset
            </ActionButton>
            <ActionButton onClick={onZoomIn} aria-label="Zoom in">
                <HiMiniMagnifyingGlassPlus size={16}/>
            </ActionButton>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    gap: 6px;
`;