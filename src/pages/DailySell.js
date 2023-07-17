import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/ToastHelper";
import { confirmAlert } from "react-confirm-alert";
import { twoDigit } from "../assets/Function";

const DailySell = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const d = new Date();
  const [date, setDate] = useState(
    `${d.getFullYear()}-${twoDigit(d.getMonth() + 1)}-${twoDigit(d.getDate())}`
  );
  const searchByDate = () => {
    const url = `${process.env.REACT_APP_API_URL}daily-sell/date/${date}`;
    try {
      axios.get(url).then((res) => {
        setList(res?.data?.result);
      });
    } catch (error) { }
  };
  const deleteFromApi = (id) => {
    const url = `${process.env.REACT_APP_API_URL}daily-sell/${id}`;
    try {
      axios.delete(url).then((res) => {
        console.log("res.data", res.data);
        if (res?.data?.status) {
          showToast("success", res?.data?.message);
          searchByDate();
        }
      });
    } catch (error) { }
  };
  const handleDelete = (id, name) => {
    confirmAlert({
      title: "Confirm To Delete" + " " + { name },
      message: `Are you sure to delete this category?`,
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
        <h3>Daily Selling Info</h3>
        <a onClick={() => navigate("/add-sell")}>ADD</a>
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
            <th>Customer</th>
            <th>Product</th>
            <th>Pri</th>
            <th>Cash</th>
            <th>Due</th>
            <th>Pr</th>
            <th style={{ width: "109px" }}>Action</th>
          </tr>
          {list?.length > 0 &&
            list.map(
              (
                {
                  _id,
                  buyerName,
                  buyerAddress,
                  productName,
                  totalPrice,
                  cash,
                  due,
                  profit,
                },
                index
              ) => (
                <tr>
                  <td>
                    {buyerName}({buyerAddress})
                  </td>
                  <td>{productName}</td>
                  <td>{totalPrice}</td>
                  <td>{cash}</td>
                  <td>{due}</td>
                  <td>{profit}</td>
                  <td>
                    <a
                      className="btn-primary btn-sm mr3"
                    // onClick={() => handleDelete()}
                    >
                      <i className="fa fa-eye"></i>
                    </a>
                    <a
                      className="btn-success btn-sm mr3"
                    //   onClick={() => navigate(`/sell/${_id}`)}
                    >
                      <i className="fa fa-pencil"></i>
                    </a>
                    <a
                      className="btn-danger btn-sm"
                      onClick={() => handleDelete(_id, productName)}
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

export default DailySell;
