import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Dashboard from "./pages/Dashboard";
import "font-awesome/css/font-awesome.min.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./style.css";
import UnitInfo from "./pages/UnitInfo";
import UnitInfoAdd from "./pages/UnitInfoAdd";
import CustomerInfo from "./pages/CustomerInfo";
import CustomerInfoAdd from "./pages/CustomerInfoAdd";
import CustomerInfoEdit from "./pages/CustomerInfoEdit";
import DealerInfo from "./pages/DealerInfo";
import DealerInfoAdd from "./pages/DealerInfoAdd";
import DealerInfoEdit from "./pages/DealerInfoEdit";
import ProductInfo from "./pages/ProductInfo";
import ProductInfoAdd from "./pages/ProductInfoAdd";
import ProductInfoEdit from "./pages/ProductInfoEdit";
import DailySellAdd from "./pages/DailySellAdd";
import DailySell from "./pages/DailySell";
import DailyBuyAdd from "./pages/DailyBuyAdd";
import DailyBuy from "./pages/DailyBuy";
import CustomerPayment from "./pages/CustomerPayment";
import ProductDetails from "./pages/ProductDetails";
import CrDr from "./pages/CrDR";
import CrDrAdd from "./pages/CrDrAdd";
import ProductAllStock from "./pages/ProductAllStock";
import AllBuyByDate from "./pages/AllBuyByDate";
import AllSellByDate from "./pages/AllSellByDate";
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
            <Route path="/customer-pay/:id" element={<CustomerPayment />} />
            <Route path="/dealer" element={<DealerInfo />} />
            <Route path="/add-dealer" element={<DealerInfoAdd />} />
            <Route path="/dealer/:id" element={<DealerInfoEdit />} />
            <Route path="/product" element={<ProductInfo />} />
            <Route path="/product-detail/:id" element={<ProductDetails />} />
            <Route path="/add-product" element={<ProductInfoAdd />} />
            <Route path="/product/:id" element={<ProductInfoEdit />} />
            <Route path="/sell" element={<DailySell />} />
            <Route path="/add-sell" element={<DailySellAdd />} />
            <Route path="/sell/:id" element={<ProductInfoEdit />} />
            <Route path="/buy" element={<DailyBuy />} />
            <Route path="/add-buy" element={<DailyBuyAdd />} />
            <Route path="/buy/:id" element={<ProductInfoEdit />} />
            <Route path="/unit" element={<UnitInfo />} />
            <Route path="/add-unit" element={<UnitInfoAdd />} />
            <Route path="/crdr" element={<CrDr />} />
            <Route path="/add-crdr" element={<CrDrAdd />} />
            <Route path="/all-stock" element={<ProductAllStock />} />
            <Route path="/all-buy-date" element={<AllBuyByDate />} />
            <Route path="/all-sell-date" element={<AllSellByDate />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
