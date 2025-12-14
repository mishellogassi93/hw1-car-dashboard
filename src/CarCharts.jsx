import React from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';

const originColors = {
    'USA': '#FF4500',
    'Europe': '#1E90FF',
    'Japan': '#3CB371'
};

const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length || !payload[0].payload) {
        return null;
    }
    const carData = payload[0].payload;
    const pointColor =  payload[0].color || originColors[carData.Origin] || '#ccc';

    return (
        <div
            style={{
                backgroundColor: '#fff',
                padding: '10px',
                border: `2px solid ${pointColor}`,
                borderRadius: '5px'
            }}
        >
            <p style={{ fontWeight: 'bold', margin: 0, color: pointColor }}>
                {`שם רכב: ${carData.Name}`}
            </p>
            <p style={{ margin: 0 }}>{`כוח סוס: ${carData.Horsepower} (hp)`}</p>
            <p style={{ margin: 0 }}>{`משקל: ${carData.Weight_in_lbs} (lbs)`}</p>
            <p style={{ margin: 0, marginTop: '5px' }}>{`${carData.Origin} :ארץ ייצור `}</p>
        </div>
    );
};

const calculateMpgByCylinders = (data) => {
    const groups = data.reduce((acc, car) => {
        const key = car.Cylinders;
        if (!acc[key]) {
            acc[key] = { totalMpg: 0, count: 0 };
        }
        acc[key].totalMpg += car.Miles_per_Gallon;
        acc[key].count += 1;
        return acc;
    }, {});

    return Object.keys(groups).map(key => ({
        Cylinders: parseInt(key),
        AverageMPG: groups[key].totalMpg / groups[key].count,
    })).sort((a, b) => a.Cylinders - b.Cylinders);
};

export function ScatterPlotChart({ data }) {
    return (
        <>
            <ResponsiveContainer width="100%" height={300}>
                <ScatterChart margin={{ top: 30, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid />
                    <XAxis type="number" dataKey="Weight_in_lbs" name="משקל (ליברות)"  unit="lbs" />
                    <YAxis type="number" dataKey="Horsepower" name="כוח סוס"  unit="hp"   />

                    <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                    <Scatter name="מכוניות" data={data}>
                        {data.map((car, index) => (<Cell key={`cell-${index}`} fill={originColors[car.Origin] || '#ccc'} />
                        ))}
                    </Scatter>
                </ScatterChart>
            </ResponsiveContainer>

            <div className="custom-legend">
                <span className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: originColors['USA'] }} />
                    ארה"ב (USA)
                </span>
                <span className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: originColors['Europe'] }} />
                    אירופה (Europe)
                </span>
                <span className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: originColors['Japan'] }} />
                    יפן (Japan)
                </span>
            </div>
        </>
    );
}

export function MpgBarChart({ data }) {
    const chartData = calculateMpgByCylinders(data);
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Cylinders" name="מספר צילינדרים" />
                <YAxis name="ממוצע MPG" />
                <Tooltip />
                <Legend />
                <Bar dataKey="AverageMPG" name="ממוצע MPG" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}