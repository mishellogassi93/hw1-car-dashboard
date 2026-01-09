import React from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, BarChart, Bar, Cell, Legend
} from 'recharts';

const engineColors = {
    'Electric': '#2ecc71',
    'Petrol': '#7f8c8d',
    'Hybrid': '#3498db'
};
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { Model } = payload[0].payload;
        return (
            <div style={{
                backgroundColor: '#fff',
                padding: '5px 10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                direction: 'rtl'
            }}>
                <p style={{ margin: 0, fontWeight: 'bold', fontSize: '14px' }}>{Model}</p>
            </div>
        );
    }
    return null;
};
export function BubbleChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="Year" name="שנה" domain={['auto', 'auto']} tickCount={5} allowDecimals={false}/>
                <YAxis type="number" dataKey="Sales" name="מכירות" />
                <ZAxis type="number" dataKey="Price" range={[100, 800]} name="מחיר" />
                <Tooltip content={<CustomTooltip />} />

                <Scatter name="מכוניות" data={data}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={engineColors[entry.Engine] || '#ccc'} />
                    ))}
                </Scatter>
            </ScatterChart>
        </ResponsiveContainer>
    );
}

export function SalesBarChart({ data }) {

    const aggregated = data.reduce((acc, curr) => {
        acc[curr.Engine] = (acc[curr.Engine] || 0) + curr.Sales;
        return acc;
    }, {});

    const chartData = Object.keys(aggregated).map(key => ({
        Engine: key,
        TotalSales: aggregated[key]
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Engine" /> [cite: 44]
                <YAxis />
                <Tooltip />
                <Bar dataKey="TotalSales" name="סה''כ מכירות">
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={engineColors[entry.Engine]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}