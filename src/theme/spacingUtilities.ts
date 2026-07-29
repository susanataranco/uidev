import {css} from "styled-components";
import {spacingScale} from "./scale";
import {spacingRem} from "./spacing";

type Side = "t" | "r" | "b" | "l" | "x" | "y" | "";
type Property = "p" | "m";

const SIDE_CSS: Record<Side, (value: string) => string> = {
    "": (v) => `padding: ${v};`,
    t: (v) => `padding-top: ${v};`,
    r: (v) => `padding-right: ${v};`,
    b: (v) => `padding-bottom: ${v};`,
    l: (v) => `padding-left: ${v};`,
    x: (v) => `padding-left: ${v}; padding-right: ${v};`,
    y: (v) => `padding-top: ${v}; padding-bottom: ${v};`,
};

const generateRules = (prop: Property) => {
    const sides: Side[] = ["", "t", "r", "b", "l", "x", "y"];
    const prefix = prop; // "p" or "m"

    return sides
        .map((side) => {
            const className = `${prefix}${side}`;
            return Object.keys(spacingScale)
                .map((key) => {
                    const value = spacingRem(key as keyof typeof spacingScale);
                    const rule = SIDE_CSS[side](value).replace(/^padding/g, prop === "m" ? "margin" : "padding");
                    return `.${className}-${key} { ${rule} }`;
                })
                .join("\n");
        })
        .join("\n");
};

export const spacingUtilities = css`
    ${generateRules("p")}
    ${generateRules("m")}
`;