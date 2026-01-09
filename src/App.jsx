import React, { useState } from 'react';
import './App.css';
import { CarDashboard } from './CarDashboard';

function App() {
    const [minYear, setMinYear] = useState(0);

    return (
        <div id="root">
            <div className="dashboard-card full-width header-card">
                <h1 className="app-header">המהפכה החשמלית - ניתוח מכירות רכב </h1>
                <div className="filter-container">
                    <label>הצג נתונים החל משנה: </label>
                    <select onChange={(e) => setMinYear(Number(e.target.value))} value={minYear}>
                        <option value="0">Show All</option>
                        <option value="2022">From 2022</option>
                        <option value="2023">From 2023</option>
                    </select>
                </div>
            </div>
            <CarDashboard minYear={minYear} />
        </div>
    );
}

export default App;