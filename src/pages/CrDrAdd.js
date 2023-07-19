import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/ToastHelper";
import Select from "react-select";
import axios from "axios";
import { purposeList, twoDigit } from "../assets/Function";
const CrDrAdd = () => {
  const navigate = useNavigate();
  const d = new Date();
  const [date, setDate] = useState(
    `${d.getFullYear()}-${twoDigit(d.getMonth() + 1)}-${twoDigit(d.getDate())}`
  );
  const [amount, setAmount] = useState(0);
  const [purpose, setPurpose] = useState("");
  const [purposeID, setPurposeID] = useState("");
  const [details, setDetails] = useState("Nothing");
  const [isCredit, setIsCredit] = useState("");
  const [crDr, setCrDr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const submitSell = () => {
    if (amount <= 0) {
      showToast("error", "Invalid amount");
      return 0;
    } else if (isCredit.length === 0) {
      showToast("error", "Select Cr Dr");
      return 0;
    } else if (purpose.length === 0) {
      showToast("error", "Select Purpose");
      return 0;
    } else if (details.length === 0) {
      showToast("error", "Details aren't empty");
      return 0;
    }
    const postData = {
      date,
      timeStamp: new Date(date).getTime(),
      amount,
      isCredit,
      details,
      purpose,
      purposeID
    };
    setIsLoading(true)
    const url = `${process.env.REACT_APP_API_URL}crDr`;
    try {
      axios.post(url, postData).then((res) => {
        if (res?.data?.status) {
          showToast("success", res?.data?.message);
          setAmount(0)
          setIsCredit("")
          setPurpose("")
          setCrDr("")
          setPurposeID("")
          setDetails("Nothing")
          setIsLoading(false)
        }
      });
    } catch (error) { }
  };

  return (
    <>
      <div className="page_header">
        <h3>Add Cr/Dr</h3>
        <a onClick={() => navigate("/crdr")}>List</a>
      </div>
      <div className="add">
        <div className="input_cell">
          <h4>Cr/Dr Date</h4>
          <input
            placeholder="enter cr dr date"
            value={date}
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="input_cell">
          <h4>Amount</h4>
          <input
            name="amount"
            placeholder="enter amount"
            value={amount}
            type="number"
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
        </div>
        <div className="input_cell">
          <h4>Select Cr/Dr</h4>
          <Select
            className="select"
            options={[{ label: "Invest", value: true }, { label: "Cost", value: false }]}
            value={{ label: crDr }}
            onChange={(e) => {
              setIsCredit(e.value)
              setCrDr(e.label)
            }}
          />
        </div>
        <div className="input_cell">
          <h4>Select Purpose</h4>
          <Select
            className="select"
            options={purposeList()}
            value={{ label: purpose }}
            onChange={(e) => {
              setPurpose(e.label)
              setPurposeID(e.value)
            }}
          />
        </div>
        <div className="input_cell">
          <h4>Details</h4>
          <input
            name="details"
            placeholder="enter details"
            value={details}
            type="text"
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>


        <div className="input_cell">
          <a
            onClick={() => {
              !isLoading && submitSell();
            }}
            className="submit"
            disabled={isLoading}
          >
            SUBMIT
          </a>
        </div>
      </div>
    </>
  );
};

export default CrDrAdd;
