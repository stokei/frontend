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
            height="100%"
        />
    )
}