import Chart from 'react-apexcharts';

const defaultOptions = {
    series: [{
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }, {
        name: 'Revenue',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    }, {
        name: 'Free Cash Flow',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
    }],
    options: {
        chart: {
            toolbar: {
                show: false
            }
        },
        tooltip: {
            style: {
                fontSize: "12px",
                fontFamily: undefined
            },
            onDatasetHover: {
                style: {
                    fontSize: "12px",
                    fontFamily: undefined
                }
            },
            theme: "dark"
        },
        xaxis: {
            categories: ["00", "04", "08", "12", "14", "16", "18"],
            show: false,
            labels: {
                show: true,
                style: {
                    colors: "#A3AED0",
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
                    colors: "#CBD5E0",
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
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                colorStops: [
                    [
                        {
                            offset: 0,
                            color: "#4318FF",
                            opacity: 1
                        },
                        {
                            offset: 100,
                            color: "rgba(67, 24, 255, 1)",
                            opacity: 0.28
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
                columnWidth: "40px"
            }
        }
    },
};
export const BarChart = ({ options = defaultOptions.options, series = defaultOptions.series }: any) => {
    return (
        <Chart
            options={options}
            series={series}
            type="bar"
            width="100%"
            height="100%"
        />
    )
}