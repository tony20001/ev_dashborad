// src/components/ChartComponent.js
import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

const ChartComponent = ({ evData }) => {
    const manufacturers = [...new Set(evData.map((ev) => ev.manufacturer))];

    const manufacturerCounts = manufacturers.map((manufacturer) =>
        evData.filter((ev) => ev.manufacturer === manufacturer).length
    );

    const data = {
        labels: manufacturers,
        datasets: [
            {
                label: "Number of EVs by Manufacturer",
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 1,
                data: manufacturerCounts,
            },
        ],
    };

    return (
        <div>
            <h2>Electric Vehicles by Manufacturer</h2>
            <Bar data={data} />
        </div>
    );
};

export default ChartComponent;
