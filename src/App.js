import { Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import Dashboard from './pages/Dashboard';
import "font-awesome/css/font-awesome.min.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import './style.css'
import UnitInfo from './pages/UnitInfo';
import UnitInfoAdd from './pages/UnitInfoAdd';
import CustomerInfo from './pages/CustomerInfo';
import CustomerInfoAdd from './pages/CustomerInfoAdd';
function App() {
  return (
    <>
      <div className="container">
        <div className="header">
          <div className="menu">
            <Menu />
          </div>
          <div className="title">Circle Store Dashboard</div>
          <div className="user">Login</div>
        </div>
        <div className="body">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customer" element={<CustomerInfo />} />
            <Route path="/add-customer" element={<CustomerInfoAdd />} />
            <Route path="/unit" element={<UnitInfo />} />
            <Route path="/add-unit" element={<UnitInfoAdd />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
