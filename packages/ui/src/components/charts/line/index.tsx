import { ApexOptions } from "apexcharts";
import { Chart, ChartData } from "../chart";
import { useMemo } from "react";
import { IColorName } from "../../../interfaces";

export interface LineChartProps {
    data: ChartData[];
    colorScheme?: IColorName;
}
export const LineChart = ({
    data,
    colorScheme = "primary"
}: LineChartProps) => {
    const config = useMemo(() => {
        const series = data?.map(({ value }) => value) as any;
        const categories = data?.map(({ label }) => label);
        return ({
            series: [{ name: '', data: series }],
            options: {
                chart: {
                    offsetY: -24,
                    offsetX: -16,
                    type: 'line',
                    toolbar: {
                        show: true,
                        tools: {
                            download: false
                        }
                    },
                    zoom: {
                        enabled: true
                    }
                },
                colors: [
                    `var(--chakra-colors-${colorScheme}-500)`,
                    'var(--chakra-colors-green-500)',
                    'var(--chakra-colors-purple-500)',
                    'var(--chakra-colors-blue-500)',
                    'var(--chakra-colors-red-500)',
                ],
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: 2,
                    curve: 'smooth',
                },
                grid: {
                    borderColor: '#D9D9D9',
                    strokeDashArray: 3,
                    padding: {
                        left: 20,
                        right: 0
                    }
                },
                xaxis: {
                    categories,
                    tooltip: {
                        enabled: false
                    }
                }
            } as ApexOptions,
        })
    }, [colorScheme, data]);

    return (
        <Chart
            options={config.options}
            series={config.series}
            type="line"
            width="100%"
            height="100%"
        />
    )
}