import { ApexOptions } from "apexcharts";
import { Chart, ChartData } from "../chart";
import { useMemo } from "react";
import { IColorName } from "../../../interfaces";

export interface PieChartProps {
    data: ChartData[];
}
export const PieChart = ({
    data,
}: PieChartProps) => {
    const config = useMemo(() => {
        const seriesValues = data?.map(({ value }) => Number(value));
        const totalValues = seriesValues.reduce((prev, current) => prev + current, 0);
        const series = seriesValues?.map(value => Math.round((value / totalValues) * 100));
        const labels = data?.map(({ label }) => label);
        return ({
            series,
            options: {
                labels,
                chart: {
                    type: 'pie',
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }],
            } as ApexOptions,
        })
    }, [data]);

    return (
        <Chart
            options={config.options}
            series={config.series}
            type="pie"
            width="100%"
            height="100%"
        />
    )
}