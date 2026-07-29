import {spacingScale, type SpacingKey} from "./scale";

const BASE_PX = 8;
const ROOT_FONT_SIZE = 16;

export const toRem = (factor: number): string =>
    `${(factor * BASE_PX) / ROOT_FONT_SIZE}rem`;

export const spacingRem = (key: SpacingKey): string =>
    toRem(spacingScale[key]);