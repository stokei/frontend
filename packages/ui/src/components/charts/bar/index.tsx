import { useMemo } from "react";
import { Chart, ChartData } from "../chart";
import { ApexOptions } from "apexcharts";
import { IColorName } from "../../../interfaces";

export interface BarChartProps {
    data: ChartData[];
    colorScheme?: IColorName;
}
export const BarChart = ({
    data,
    colorScheme = "primary"
}: BarChartProps) => {
    const config = useMemo(() => {
        const series = data?.map(({ value }) => value) as any;
        const categories = data?.map(({ label }) => label);
        return ({
            series: [{ name: '', data: series }],
            options: {
                chart: {
                    toolbar: {
                        show: false
                    }
                },
                xaxis: {
                    categories,
                    show: false,
                    labels: {
                        show: true,
                        style: {
                            colors: `var(--chakra-colors-text-300)`,
                            fontSize: "14px",
                            fontWeight: "500"
                        }
                    },
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    }
                },
                yaxis: {
                    show: false,
                    color: "black",
                    labels: {
                        show: true,
                        style: {
                            colors: `var(--chakra-colors-text-500)`,
                            fontSize: "14px"
                        }
                    }
                },
                grid: {
                    show: false,
                    strokeDashArray: 5,
                    yaxis: {
                        lines: {
                            show: true
                        }
                    },
                    xaxis: {
                        lines: {
                            show: false
                        }
                    }
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        type: "vertical",
                        colorStops: [
                            [
                                {
                                    offset: 0,
                                    color: `var(--chakra-colors-${colorScheme}-500)`,
                                    opacity: 1
                                }
                            ]
                        ]
                    }
                },
                dataLabels: {
                    enabled: false
                },
                plotOptions: {
                    bar: {
                        borderRadius: 10,
                    }
                }
            } as ApexOptions,
        })
    }, [colorScheme, data]);

    return (
        <Chart
            options={config.options}
            series={config.series}
            type="bar"
            width="100%"
            height="100%"
        />
    )
}