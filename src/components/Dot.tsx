import styled from "styled-components";
import {spacingRem} from "../theme/spacing.ts";

interface DotProps {
    size?: "small" | "medium" | "large";
}

export function Dot({size}: DotProps) {
    return <DotShape $size={size}/>
}

const sizeMap: Record<NonNullable<DotProps["size"]>, string> = {
    small: spacingRem("xs"),
    medium: spacingRem("s"),
    large: spacingRem("m"),
};

const DotShape = styled.div<{ $size: DotProps["size"] }>`
    width: ${({$size}) => sizeMap[$size ?? "medium"]};
    height: ${({$size}) => sizeMap[$size ?? "medium"]};
    border-radius: 50%;
    background: ${({theme}) => theme.colors.line};
`;