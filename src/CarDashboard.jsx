import React, { useState, useEffect } from 'react';
import { CarsTable } from './CarsTable';
import { ScatterPlotChart, MpgBarChart } from './CarCharts';

export function CarDashboard() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/cars.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(jsonData => {
                setData(jsonData);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div className="loading-message">...טוען נתונים</div>;
    }

    if (!data || data.length === 0) {
        return <div className="error-message">לא נמצאו נתונים להצגה.</div>;
    }

    const strongCars = [...data]
        .sort((a, b) => b.Horsepower - a.Horsepower)
        .slice(0, 5);

    return (
        <>
            <div className="dashboard-card chart-card">
                <h3>1. קורלציה בין משתנים (Scatter Plot)</h3>
                <ScatterPlotChart data={data} />
            </div>

            <div className="dashboard-card chart-card">
                <h3>2. מגמות צריכת דלק (Bar Chart)</h3>
                <MpgBarChart data={data} />
            </div>

            <div className="dashboard-card full-width">
                <h3>3. טבלת נתונים (Data Table)</h3>
                <CarsTable cars={strongCars} />
            </div>
        </>
    );
}