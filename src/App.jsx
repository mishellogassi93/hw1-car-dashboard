import './App.css';
import { CarDashboard } from './CarDashboard';

function App() {
    return (
        <>
            <div className="dashboard-card full-width header-card">
                <h1 className="app-header">מרכז בקרה לרכב</h1>
            </div>
            <CarDashboard />
        </>
    );
}

export default App;