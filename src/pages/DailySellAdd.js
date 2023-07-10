import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/ToastHelper";
import Select from "react-select";
import axios from "axios";
import { getCustomerOption, getProductOption, twoDigit } from "../assets/Function";
const DailySellAdd = () => {
  const navigate = useNavigate();
  const d = new Date();

  const [date, setDate] = useState(
    `${d.getFullYear()}-${twoDigit(d.getMonth() + 1)}-${twoDigit(d.getDate())}`
  );
  const [buyerName, setBuyerName] = useState("");
  const [buyerID, setBuyerID] = useState("");
  const [productName, setProductName] = useState("");
  const [productID, setProductID] = useState("");
  const [unitName, setUnitName] = useState("");
  const [unitID, setUnitID] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cash, setCash] = useState(0);
  const [due, setDue] = useState(-1);
  const [details, setDetails] = useState("Nothing");
  const [presentPricePerUnit, setPresentPricePerUnit] = useState(0);
  const [productList, setProductList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [buyerPhone, setBuyerPhone] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");
  const submitSell = () => {
    if (buyerName.length === 0) {
      showToast("error", "Customer should n't be empty");
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
      buyerName: buyerName.split("(")[0],
      buyerID,
      buyerPhone,
      buyerAddress,
      productName,
      productID,
      unitName,
      unitID,
      quantity,
      totalPrice,
      cash,
      due,
      details,
      profit: totalPrice - presentPricePerUnit * quantity,
      isPaid: totalPrice === cash,
      paymentHistory: { paymentDate: date, amount: cash },
    };
    const url = `${process.env.REACT_APP_API_URL}daily-sell`;
    try {
      axios.post(url, postData).then((res) => {
        if (res?.data?.status) {
          showToast("success", res?.data?.message);
          setBuyerName("");
          setBuyerID("");
          setProductName("");
          setProductID("");
          setUnitName("");
          setUnitID("");
          setQuantity(0);
          setTotalPrice(0);
          setCash(0);
          setDue(-1);
          setDetails("Nothing");
          setPresentPricePerUnit(0);
          setBuyerPhone("");
          setBuyerAddress("");
        }
      });
    } catch (error) { }
  };
  const getProductList = () => {
    const url = `${process.env.REACT_APP_API_URL}product-info`;
    try {
      axios.get(url, {}).then((res) => {
        if (res?.data?.status) {
          setProductList(getProductOption(res?.data?.result));
        }
      });
    } catch (error) { }
  };
  const getCustomerList = () => {
    const url = `${process.env.REACT_APP_API_URL}customer-info`;
    try {
      axios.get(url, {}).then((res) => {
        if (res?.data?.status) {
          setCustomerList(getCustomerOption(res?.data?.result));
        }
      });
    } catch (error) { }
  };
  useEffect(() => {
    getProductList();
    getCustomerList();
  }, []);
  console.log("buyerName", buyerName.split("(")[0]);
  return (
    <>
      <div className="page_header">
        <h3>Add Sell</h3>
        <a onClick={() => navigate("/sell")}>List</a>
      </div>
      <div className="add">
        <div className="input_cell">
          <h4>Selling Date</h4>
          <input
            placeholder="enter selling date"
            value={date}
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="input_cell">
          <h4>Select Customer</h4>
          <Select
            className="select"
            options={customerList}
            value={{ label: buyerName }}
            onChange={(e) => {
              setBuyerName(e.label);
              setBuyerID(e.value);
              setBuyerPhone(e.buyerPhone);
              setBuyerAddress(e.buyerAddress);
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
              setPresentPricePerUnit(e.presentPricePerUnit);
            }}
          />
        </div>
        <div className="input_cell">
          <h4>Quantity</h4>
          <input
            name="quantity"
            placeholder="enter quantity"
            value={quantity}
            type="number"
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>
        <div className="input_cell">
          <h3>
            Current rate {quantity}X{presentPricePerUnit}=
            {quantity * presentPricePerUnit}
          </h3>
          <h3>
            {totalPrice - quantity * presentPricePerUnit > 0
              ? "Profit"
              : "Loss"}
            ={Math.abs(totalPrice - presentPricePerUnit * quantity)} Taka
          </h3>
          <h3>{totalPrice === cash ? "FULL PAID" : "UNPAID"}</h3>
        </div>
        <div className="input_cell">
          <h4>Sell Price</h4>
          <input
            name="totalPrice"
            placeholder="enter sell price"
            value={totalPrice}
            type="number"
            onChange={(e) => {
              setTotalPrice(parseInt(e.target.value));
              setDue(-1);
            }}
          />
        </div>
        <div className="input_cell">
          <h4>Cash</h4>
          <input
            name="cash"
            placeholder="enter cash"
            value={cash}
            type="number"
            disabled
          // onChange={(e) => setCash(e.target.value)}
          />
        </div>
        <div className="input_cell">
          <h4>Due</h4>
          <input
            name="due"
            placeholder="enter cash"
            value={due}
            type="number"
            onChange={(e) => {
              setDue(parseInt(e.target.value));
              setCash(totalPrice - parseInt(e.target.value));
            }}
          />
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

export default DailySellAdd;
