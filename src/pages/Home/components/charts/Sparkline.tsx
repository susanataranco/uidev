import {useTheme} from "styled-components";

interface SparklineProps {
    data: number[];
    width?: number;
    height?: number;
}

export function Sparkline({
                              data,
                              width = 100,
                              height = 24,
                          }: SparklineProps) {
    const theme = useTheme();

    if (data.length < 2) {
        return <svg width={width} height={height} aria-hidden/>;
    }

    const stepX = width / (data.length - 1);

    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);

    const padding = Math.max((maxValue - minValue) * 0.1, 1);

    const low = minValue - padding;
    const high = maxValue + padding;

    const range = high - low;

    const points = data
        .map((value, i) => {
            const x = i * stepX;
            const normalized = (value - low) / range;
            const y = height - normalized * height;
            return `${x.toFixed(1)},${y.toFixed(1)}`;
        })
        .join(" ");

    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            aria-hidden
        >
            <polyline
                points={points}
                fill="none"
                stroke={theme.colors.semantic.accent.base}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}