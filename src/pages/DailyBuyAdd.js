import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/ToastHelper";
import Select from "react-select";
import axios from "axios";
import {
  getCustomerOption,
  getDealerOption,
  getProductOption,
} from "../assets/Function";
const DailyBuyAdd = () => {
  const navigate = useNavigate();
  const d = new Date();
  const twoDigit = (n) => {
    return n.length > 1 ? n : "0" + n;
  };
  const [date, setDate] = useState(
    `${d.getFullYear()}-${twoDigit(d.getMonth() + 1)}-${twoDigit(d.getDate())}`
  );
  const [dealerName, setDealerName] = useState("");
  const [dealerID, setDealerID] = useState("");
  const [productName, setProductName] = useState("");
  const [productID, setProductID] = useState("");
  const [unitName, setUnitName] = useState("");
  const [unitID, setUnitID] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cash, setCash] = useState(0);
  const [due, setDue] = useState(-1);
  const [details, setDetails] = useState("Nothing");
  const [productList, setProductList] = useState([]);
  const [dealerList, setDealerList] = useState([]);
  const [otherCost, setOtherCost] = useState(0);
  const submitSell = () => {
    if (dealerName.length === 0) {
      showToast("error", "Dealer should n't be empty");
      return 0;
    } else if (productName.length === 0) {
      showToast("error", "Product should n't be empty");
      return 0;
    } else if (quantity <= 0) {
      showToast("error", "Invalid Quantity");
      return 0;
    } else if (totalPrice <= 0) {
      showToast("error", "Invalid Sell Price");
      return 0;
    } else if (due < 0) {
      showToast("error", "Invalid due");
      return 0;
    }
    const postData = {
      date,
      timeStamp: new Date(date).getTime(),
      dealerName,
      dealerID,
      productName,
      productID,
      unitName,
      unitID,
      quantity,
      pricePerUnit: Math.round(((totalPrice + otherCost) / quantity) * 10) / 10,
      totalPrice,
      cash,
      due,
      details,
      otherCost,
      isPaid: totalPrice + otherCost === cash,
      paymentHistory: { paymentDate: date, amount: cash },
    };
    const url = `${process.env.REACT_APP_API_URL}daily-sell`;
    try {
      axios.post(url, postData).then((res) => {
        if (res?.data?.status) {
          showToast("success", res?.data?.message);
          setDealerName("");
          setDealerID("");
          setProductName("");
          setProductID("");
          setUnitName("");
          setUnitID("");
          setQuantity(0);
          setTotalPrice(0);
          setCash(0);
          setDue(-1);
          setDetails("Nothing");
        }
      });
    } catch (error) {}
  };
  const getProductList = () => {
    const url = `${process.env.REACT_APP_API_URL}product-info`;
    try {
      axios.get(url, {}).then((res) => {
        if (res?.data?.status) {
          setProductList(getProductOption(res?.data?.result));
        }
      });
    } catch (error) {}
  };
  const getDealerList = () => {
    const url = `${process.env.REACT_APP_API_URL}dealer-info`;
    try {
      axios.get(url, {}).then((res) => {
        if (res?.data?.status) {
          setDealerList(getDealerOption(res?.data?.result));
        }
      });
    } catch (error) {}
  };
  useEffect(() => {
    getProductList();
    getDealerList();
  }, []);

  return (
    <>
      <div className="page_header">
        <h3>Add Buying Product</h3>
        <a onClick={() => navigate("/buy")}>List</a>
      </div>
      <div className="add">
        <div className="input_cell">
          <h4>Buying Date</h4>
          <input
            placeholder="enter buying date"
            value={date}
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="input_cell">
          <h4>Select Dealer</h4>
          <Select
            className="select"
            options={dealerList}
            value={{ label: dealerName }}
            onChange={(e) => {
              setDealerName(e.label);
              setDealerID(e.value);
            }}
          />
        </div>
        <div className="input_cell">
          <h4>Select Product</h4>
          <Select
            className="select"
            options={productList}
            value={{ label: productName }}
            onChange={(e) => {
              setProductName(e.label);
              setProductID(e.value);
              setUnitName(e.unitName);
              setUnitID(e.unitID);
            }}
          />
        </div>
        <div className="input_cell">
          <h4>Quantity</h4>
          <input
            placeholder="enter quantity"
            value={quantity}
            type="number"
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>
        <div className="input_cell">
          <h3>
            Price per {unitName} =
            {Math.round(((totalPrice + otherCost) / quantity) * 10) / 10}
          </h3>
          <h3>{totalPrice + otherCost === cash ? "FULL PAID" : "UNPAID"}</h3>
        </div>
        <div className="input_cell">
          <h4>Total Price</h4>
          <input
            placeholder="enter sell price"
            value={totalPrice}
            type="number"
            onChange={(e) => {
              setTotalPrice(parseInt(e.target.value));
              setCash(-1);
            }}
          />
        </div>
        <div className="input_cell">
          <h4>Other Cost</h4>
          <input
            placeholder="enter sell price"
            value={otherCost}
            type="number"
            onChange={(e) => {
              setOtherCost(parseInt(e.target.value));
              setCash(-1);
            }}
          />
        </div>
        <div className="input_cell">
          <h4>Cash</h4>
          <input
            placeholder="enter cash"
            value={cash}
            type="number"
            onChange={(e) => {
              setCash(parseInt(e.target.value));
              setDue(totalPrice + otherCost - parseInt(e.target.value));
            }}
          />
        </div>
        <div className="input_cell">
          <h4>Due</h4>
          <input placeholder="enter cash" value={due} type="number" disabled />
        </div>
        <div className="input_cell">
          <h4>Note</h4>
          <input
            placeholder="enter note"
            value={details}
            type="text"
            onChange={(e) => {
              setDetails(e.target.value);
            }}
          />
        </div>
        <div className="input_cell">
          <a
            onClick={() => {
              submitSell();
            }}
            className="submit"
          >
            SUBMIT
          </a>
        </div>
      </div>
    </>
  );
};

export default DailyBuyAdd;
