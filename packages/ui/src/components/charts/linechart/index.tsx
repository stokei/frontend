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
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                colors: [`var(--chakra-colors-${colorScheme}-500)`],
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories,
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