import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { showToast } from '../utils/ToastHelper'
import { confirmAlert } from 'react-confirm-alert'

const CrDr = () => {
  const navigate = useNavigate()
  const [list, setList] = useState([])
  const apiCall = () => {
    const url = `${process.env.REACT_APP_API_URL}crDr`;
    try {
      axios.get(url).then((res) => {
        setList(res?.data?.result)
      })
    } catch (error) { }
  }
  const deleteFromApi = (id) => {
    const url = `${process.env.REACT_APP_API_URL}crDr/${id}`;
    try {
      axios.delete(url).then((res) => {
        // console.log('res.data', res.data)
        if (res?.data?.status) {
          showToast("success", res?.data?.message)
          apiCall()
        }
      })
    } catch (error) { }
  }
  const handleDelete = (id, amounts) => {
    confirmAlert({
      title: "Confirm To Delete" + " " + amounts,
      message: `Are you sure to delete this category?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => { deleteFromApi(id) },
        },
        {
          label: "No",
        },
      ],
    });
  };
  useEffect(() => {
    apiCall()
  }, [])
  return (
    <>
      <div className='page_header'>
        <h3>Joma/Khoroc List</h3>
        <a onClick={() => navigate("/add-crdr")}>ADD</a>
      </div>
      <div className='list_table'>
        <table>
          <tr>
            <th>Date</th>
            <th>Cr/Dr</th>
            <th>Amount</th>
            <th style={{ width: "109px" }}>Action</th>
          </tr>
          {list?.length > 0 && list.map(({ _id, date, amount, isCredit }, index) => (
            <tr>
              <td>{date}</td>
              <td>{isCredit ? "Joma" : "Khoroc"}</td>
              <td>{amount}</td>
              <td>
                {/* <a
                  className="btn-primary btn-sm mr3"
                  onClick={() => navigate(`/product-detail/${_id}`)}
                >
                  <i className="fa fa-eye"></i>
                </a> */}
                {/* <a
                  className="btn-success btn-sm mr3"
                  onClick={() => navigate(`/crdr/${_id}`)}
                >
                  <i className="fa fa-pencil"></i>
                </a> */}
                <a
                  className="btn-danger btn-sm"
                  onClick={() => handleDelete(_id, amount)}
                >
                  <i className="fa fa-trash"></i>
                </a>
              </td>
            </tr>
          ))}


        </table>
      </div>
    </>
  )
}

export default CrDr