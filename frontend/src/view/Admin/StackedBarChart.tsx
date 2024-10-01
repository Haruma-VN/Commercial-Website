import { BarChart } from "@mui/x-charts/BarChart";
import React from "react";

const StackedBarChart: React.FC<{
    name: Array<string>;
    data: Array<[number, number]>;
}> = ({ name, data }) => {
    const series = [
        {
            data: data.map((e) => e[0]),
            label: "Số lượng",
        },
        {
            data: data.map((e) => e[1]),
            label: "Còn lại",
        },
    ];

    return (
        <div style={{ overflowX: "auto" }}>
            <div style={{ minWidth: "600px" }}>
                <BarChart xAxis={[{ scaleType: "band", data: name, hideTooltip: false, disableLine: false, disableTicks: false }]} series={series} height={300} />
            </div>
        </div>
    );
};

export default StackedBarChart;
