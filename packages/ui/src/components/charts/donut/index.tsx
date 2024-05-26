import { ApexOptions } from "apexcharts";
import { useMemo } from "react";
import { Chart, ChartData } from "../chart";

export interface DonutChartProps {
    data: ChartData[];
}
export const DonutChart = ({
    data,
}: DonutChartProps) => {
    const config = useMemo(() => {
        const series = data?.map(({ value }) => Number(value));
        const labels = data?.map(({ label }) => label);
        return ({
            series,
            options: {
                labels,
                chart: {
                    type: 'donut',
                },
                dataLabels: {
                    enabled: false
                },
                colors: [
                    'var(--chakra-colors-green-500)',
                    'var(--chakra-colors-purple-500)',
                    'var(--chakra-colors-blue-500)',
                    'var(--chakra-colors-red-500)',
                ],
                legend: {
                    position: 'bottom'
                },
            } as ApexOptions,
        })
    }, [data]);

    return (
        <Chart
            options={config.options}
            series={config.series}
            type="donut"
            width="100%"
            height="90%"
        />
    )
}