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
import CustomerInfoEdit from './pages/CustomerInfoEdit';
import DealerInfo from './pages/DealerInfo';
import DealerInfoAdd from './pages/DealerInfoAdd';
import DealerInfoEdit from './pages/DealerInfoEdit';
import ProductInfo from './pages/ProductInfo';
import ProductInfoAdd from './pages/ProductInfoAdd';
import ProductInfoEdit from './pages/ProductInfoEdit';
import DailySellAdd from './pages/DailySellAdd';
import DailySell from './pages/DailySell';
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
            <Route path="/customer/:id" element={<CustomerInfoEdit />} />
            <Route path="/dealer" element={<DealerInfo />} />
            <Route path="/add-dealer" element={<DealerInfoAdd />} />
            <Route path="/dealer/:id" element={<DealerInfoEdit />} />
            <Route path="/product" element={<ProductInfo />} />
            <Route path="/add-product" element={<ProductInfoAdd />} />
            <Route path="/product/:id" element={<ProductInfoEdit />} />
            <Route path="/sell" element={<DailySell />} />
            <Route path="/add-sell" element={<DailySellAdd />} />
            <Route path="/sell/:id" element={<ProductInfoEdit />} />
            <Route path="/unit" element={<UnitInfo />} />
            <Route path="/add-unit" element={<UnitInfoAdd />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
