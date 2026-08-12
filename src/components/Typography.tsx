import {type ElementType, type ReactNode, type HTMLAttributes, createElement} from "react";
import {theme} from "../theme/theme";

type Variant = "heading" | "body";

type Size =
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "xxl";

type Weight =
    | "regular"
    | "medium"
    | "semibold"
    | "bold"
    | "black";

interface TypographyProps extends HTMLAttributes<HTMLElement> {
    variant?: Variant;
    size?: Size;
    weight?: Weight;
    color?: string;
    as?: ElementType;
    children: ReactNode;
}

const TAG_MAP = {
    heading: "h2",
    body: "p",
} satisfies Record<Variant, ElementType>;

export function Typography({
                               variant = "body",
                               size = "md",
                               weight = "regular",
                               color,
                               as,
                               children,
                               className = "",
                               style,
                               ...rest
                           }: TypographyProps) {
    const Tag = as ?? TAG_MAP[variant];

    return createElement(
        Tag,
        {
            className,
            style: {
                color,
                fontFamily: theme.fonts.family[variant],
                fontSize: theme.fonts.size[size],
                fontWeight: theme.fonts.weight[weight],
                lineHeight: theme.fonts.lineHeight.relaxed, ...style
            },
            ...rest,
        },
        children
    );
}