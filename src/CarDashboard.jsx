import React, { useState, useEffect } from 'react';
import { CarsTable } from './CarsTable';
import { BubbleChart, SalesBarChart } from './CarCharts';

export function CarDashboard({ minYear }) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const engineFixMap = {
        "Tesla Model Y": "Electric",
        "BYD Atto 3": "Electric",
        "MG 4": "Electric",
        "Chery Tiggo 8": "Petrol"
    };

    useEffect(() => {
        fetch('/car_sales.json')
    .then(res => res.json())
            .then(jsonData => {
                const fixedData = jsonData.map(car => {
                    if (car.Engine === null) {
                        return { ...car, Engine: engineFixMap[car.Model] || "Unknown" };
                    }
                    return car;
                });
                setData(fixedData);
                setIsLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    if (isLoading) return <div className="dashboard-card full-width">טוען נתונים...</div>;

    const filteredData = data.filter(car => car.Year >= minYear);

    return (
        <>
            <div className="dashboard-card chart-card">
                <h3>מפת השוק - שנים מול מכירות </h3>
                <BubbleChart data={filteredData} />
            </div>

            <div className="dashboard-card chart-card">
                <h3>סיכום מכירות לפי סוג מנוע </h3>
                <SalesBarChart data={filteredData} />
            </div>

            <div className="dashboard-card full-width">
                <h3>טבלת נתונים מסוננת</h3>
                <CarsTable cars={filteredData} />
            </div>
        </>
    );
}