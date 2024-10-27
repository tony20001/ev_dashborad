// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import ChartComponent from "./ChartComponent";

const Dashboard = () => {
    const [evData, setEvData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data from CSV file
        const fetchData = async () => {
            try {
                const response = await axios.get("/Electric_Vehicle_Population_Data.csv");
                const rows = response.data.split("\n").slice(1); // Skip header

                const parsedData = rows.map((row) => {
                    const cols = row.split(",");
                    return {
                        vehicleType: cols[0],
                        range: parseFloat(cols[1]),
                        manufacturer: cols[2],
                        model: cols[3],
                        year: parseInt(cols[4]),
                    };
                });

                setEvData(parsedData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    if (loading) return <p>Loading data...</p>;

    // Extract data insights
    const totalEVs = evData.length;
    const averageRange = evData.reduce((sum, ev) => sum + ev.range, 0) / totalEVs;

    return (
        <div style={{ padding: "20px" }}>
            <h1>Electric Vehicle Analytics Dashboard</h1>
            <p>Total EVs: {totalEVs}</p>
            <p>Average Range: {averageRange.toFixed(2)} miles</p>
            <ChartComponent evData={evData} />
        </div>
    );
};

export default Dashboard;
