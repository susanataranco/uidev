import styled, {keyframes} from "styled-components";

interface StatusBadgeProps {
    status: string;
    variant?: StatusVariant;
}

type StatusVariant =
    | "default"
    | "success"
    | "warning"
    | "danger";

export function StatusBadge({
                                status,
                                variant = "default",
                            }: StatusBadgeProps) {
    return (
        <Wrapper>
            <Dot $variant={variant}/>
            <Label $variant={variant}>{status}</Label>
        </Wrapper>
    );
}

const pulse = keyframes`
    0% {
        opacity: .35;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: .35;
    }
`;

const Wrapper = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;

    font-size: 12px;
    font-family: ${({theme}) => theme.fonts.family.code};
    letter-spacing: .08em;
    text-transform: uppercase;
`;

const Dot = styled.div<{
    $variant: StatusVariant;
}>`
    width: 7px;
    height: 7px;
    border-radius: 50%;

    background: ${({theme, $variant}) => {
        switch ($variant) {
            case "success":
                return theme.colors.semantic.success.base;

            case "warning":
                return theme.colors.semantic.warning.base;

            case "danger":
                return theme.colors.semantic.danger.base;

            default:
                return theme.colors.semantic.success.base;
        }
    }};

    animation: ${pulse} 1.6s infinite;
`;

const Label = styled.span<{
    $variant: StatusVariant;
}>`
    color: ${({theme}) => theme.colors.semantic.accent};
`;