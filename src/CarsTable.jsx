import React from 'react';

const engineColors = {
    'Electric': '#2ecc71',
    'Petrol': '#7f8c8d',
    'Hybrid': '#3498db'
};

export function CarsTable({ cars }) {
    if (!cars || cars.length === 0) return null;

    return (
        <table className="cars-table">
            <thead>
            <tr>
                <th>שנה</th>
                <th>דגם</th>
                <th>מכירות</th>
                <th>מחיר</th>
                <th>מנוע</th>
            </tr>
            </thead>
            <tbody>
            {cars.map((car, index) => (
                <tr key={`${car.Model}-${index}`}>
                    <td>{car.Year}</td>
                    <td>{car.Model}</td>
                    <td>{car.Sales.toLocaleString()}</td>
                    <td>₪{car.Price.toLocaleString()}</td>
                    <td style={{ color: engineColors[car.Engine] || '#000', fontWeight: 'bold' }}>
                        {car.Engine}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}