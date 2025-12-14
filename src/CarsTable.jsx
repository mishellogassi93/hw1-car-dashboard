import React from 'react';

export function CarsTable({ cars }) {
    return (

        <table className="cars-table">
            <thead>
            <tr>
                <th>שם רכב</th>
                <th>כוח סוס</th>
                <th>משקל</th>
                <th>ארץ ייצור</th>
            </tr>
            </thead>
            <tbody>
            {cars.map((car) => (
                <tr key={car.Name}>
                    <td>{car.Name}</td>
                    <td>{car.Horsepower}</td>
                    <td>{car.Weight_in_lbs}</td>
                    <td>{car.Origin}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}