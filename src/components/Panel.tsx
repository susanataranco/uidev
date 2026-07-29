import {useEffect} from "react";
import styled from "styled-components";
import type {ReactNode} from "react";

type PanelDirection = "left" | "right" | "top" | "bottom"

interface PanelProps {
    isOpen: boolean
    onClose: () => void
    direction?: PanelDirection
    size?: string
    children: ReactNode
}

export function Panel({
                          isOpen,
                          onClose,
                          direction = "right",
                          size = "360px",
                          children,
                      }: PanelProps) {
    useEffect(() => {
        if (!isOpen) return

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") onClose()
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, onClose])

    return (
        <>
            <Overlay $visible={isOpen} onClick={onClose} aria-hidden="true"/>
            <PanelSurface
                $direction={direction}
                $size={size}
                $open={isOpen}
                role="dialog"
                aria-modal="true"
            >
                {children}
            </PanelSurface>
        </>
    )
}

function getClosedTransform(direction: PanelDirection) {
    switch (direction) {
        case "left":
            return "translateX(-100%)"
        case "right":
            return "translateX(100%)"
        case "top":
            return "translateY(-100%)"
        case "bottom":
            return "translateY(100%)"
    }
}

function getPositionStyles(direction: PanelDirection, size: string) {
    switch (direction) {
        case "left":
            return `top: 0; left: 0; bottom: 0; width: ${size};`
        case "right":
            return `top: 0; right: 0; bottom: 0; width: ${size};`
        case "top":
            return `top: 0; left: 0; right: 0; height: ${size};`
        case "bottom":
            return `bottom: 0; left: 0; right: 0; height: ${size};`
    }
}

const Overlay = styled.div<{ $visible: boolean }>`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 20;
    opacity: ${({$visible}) => $visible ? 1 : 0};
    pointer-events: ${({$visible}) => $visible ? "auto" : "none"};
    transition: opacity 0.25s ease;
`;

const PanelSurface = styled.div<{ $direction: PanelDirection; $size: string; $open: boolean }>`
    position: fixed;
    z-index: 21;
    background: ${({theme}) => theme.colors.background};
    overflow-y: auto;
    ${({$direction, $size}) => getPositionStyles($direction, $size)};
    transform: ${({$open, $direction}) => $open ? "translate(0, 0)" : getClosedTransform($direction)};
    transition: transform 0.3s ease;
`;