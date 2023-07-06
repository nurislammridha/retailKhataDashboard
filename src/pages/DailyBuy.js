import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/ToastHelper";
import { confirmAlert } from "react-confirm-alert";

const DailyBuy = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const d = new Date();
  const twoDigit = (n) => {
    return n.length > 1 ? n : "0" + n;
  };
  const [date, setDate] = useState(
    `${d.getFullYear()}-${twoDigit(d.getMonth() + 1)}-${twoDigit(d.getDate())}`
  );
  const searchByDate = () => {
    const url = `${process.env.REACT_APP_API_URL}daily-buy/date/${date}`;
    try {
      axios.get(url).then((res) => {
        setList(res?.data?.result);
      });
    } catch (error) {}
  };
  const deleteFromApi = (id) => {
    const url = `${process.env.REACT_APP_API_URL}daily-buy/${id}`;
    try {
      axios.delete(url).then((res) => {
        console.log("res.data", res.data);
        if (res?.data?.status) {
          showToast("success", res?.data?.message);
          searchByDate();
        }
      });
    } catch (error) {}
  };
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm To Delete",
      message: `Are you sure to delete this?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteFromApi(id);
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  useEffect(() => {
    searchByDate();
  }, []);
  return (
    <>
      <div className="page_header">
        <h3>Daily Buying Info</h3>
        <a onClick={() => navigate("/add-buy")}>ADD</a>
      </div>
      <div className="add">
        <div className="input_cell">
          <h4>Select Date</h4>
          <input
            placeholder="01xxxxxxxxx"
            value={date}
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="input_cell">
          <a
            onClick={() => {
              searchByDate();
            }}
            className="submit"
          >
            SUBMIT
          </a>
        </div>
      </div>
      <div className="list_table">
        <table>
          <tr>
            <th>Dealer</th>
            <th>Product</th>
            <th>Qua</th>
            <th>Pri</th>
            <th>Cash</th>
            <th>Due</th>
            <th>Oth.</th>
            <th style={{ width: "109px" }}>Action</th>
          </tr>
          {list?.length > 0 &&
            list.map(
              (
                {
                  _id,
                  dealerName,
                  productName,
                  totalPrice,
                  cash,
                  due,
                  quantity,
                  otherCost,
                },
                index
              ) => (
                <tr>
                  <td>{dealerName}</td>
                  <td>{productName}</td>
                  <td>{quantity}</td>
                  <td>{totalPrice}</td>
                  <td>{cash}</td>
                  <td>{due}</td>
                  <td>{otherCost}</td>
                  <td>
                    <a
                      className="btn-primary btn-sm mr3"
                      // onClick={() => handleDelete()}
                    >
                      <i className="fa fa-eye"></i>
                    </a>
                    <a
                      className="btn-success btn-sm mr3"
                      onClick={() => navigate(`/sell/${_id}`)}
                    >
                      <i className="fa fa-pencil"></i>
                    </a>
                    <a
                      className="btn-danger btn-sm"
                      onClick={() => handleDelete(_id)}
                    >
                      <i className="fa fa-trash"></i>
                    </a>
                  </td>
                </tr>
              )
            )}
        </table>
      </div>
    </>
  );
};

export default DailyBuy;
