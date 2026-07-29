import {type ElementType, type ReactNode, type HTMLAttributes, createElement} from "react";
import {theme} from "../theme/theme";

type Variant = "heading" | "body";
type Size = "extrasmall" | "small" | "medium" | "large";

interface TypographyProps extends HTMLAttributes<HTMLElement> {
    variant: Variant;
    size?: Size;
    color?: string;
    as?: ElementType;
    children: ReactNode;
}

const TAG_MAP: Record<Variant, Record<Size, ElementType>> = {
    heading: {small: "h4", medium: "h2", large: "h1"},
    body: {extrasmall: "p", small: "p", medium: "p", large: "p"},
};

const SIZE_CLASS: Record<Variant, Record<Size, string>> = {
    heading: {small: "text-lg", medium: "text-2xl", large: "text-4xl"},
    body: {extrasmall: "text-xs", small: "text-sm", medium: "text-base", large: "text-lg"},

};

export function Typoghraphy({
                                variant,
                                size = "medium",
                                color,
                                as,
                                children,
                                className = "",
                                style,
                                ...rest
                            }: TypographyProps) {
    const Tag = as ?? TAG_MAP[variant][size];

    return createElement(
        Tag,
        {
            className: `${SIZE_CLASS[variant][size]} ${className}`,
            style: {
                color, fontFamily: theme.font.family[variant],
                fontSize: theme.font[variant][size].fontSize,
                lineHeight: theme.font[variant][size].lineHeight,
                fontWeight: theme.font[variant][size].fontWeight, ...style
            },
            ...rest,
        },
        children
    );
}