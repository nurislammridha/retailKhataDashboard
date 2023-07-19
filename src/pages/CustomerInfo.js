import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { showToast } from '../utils/ToastHelper'
import { confirmAlert } from 'react-confirm-alert'

const CustomerInfo = () => {
    const navigate = useNavigate()
    const [list, setList] = useState([])
    const [search, setSearch] = useState("")
    const apiCall = () => {
        const url = `${process.env.REACT_APP_API_URL}customer-info`;
        try {
            axios.get(url).then((res) => {
                setList(res?.data?.result)
            })
        } catch (error) { }
    }
    const deleteFromApi = (id) => {
        const url = `${process.env.REACT_APP_API_URL}customer-info/${id}`;
        try {
            axios.delete(url).then((res) => {
                console.log('res.data', res.data)
                if (res?.data?.status) {
                    showToast("success", res?.data?.message)
                    apiCall()
                }
            })
        } catch (error) { }
    }
    const handleDelete = (id, name) => {
        confirmAlert({
            title: "Confirm To Delete" + " " + name,
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
                <h3>Customer List</h3>
                <a onClick={() => navigate("/add-customer")}>ADD</a>
            </div>
            <div className='page_header mt20'>
                <h3>Search</h3>
                <input
                    className='ml30'
                    placeholder='search by customer name'
                    value={search}
                    type='text'
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className='list_table'>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th style={{ width: "109px" }}>Action</th>
                    </tr>
                    {list?.length > 0 && list.filter((val) => {
                        if (search == "") {
                            return val;
                        } else if (
                            val.name
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        ) {
                            return val;
                        }
                    }).sort((a, b) => (a.name > b.name) * 2 - 1).map(({ _id, name, phoneNumber, address }, index) => (
                        <tr onClick={() => navigate(`/customer-pay/${_id}`)}>
                            <td>{name}</td>
                            <td>{phoneNumber}</td>
                            <td>{address}</td>
                            <td>
                                {/* <a
                                    className="btn-primary btn-sm mr3"
                                    onClick={() => navigate(`/customer-pay/${_id}`)}
                                >
                                    <i className="fa fa-eye"></i>
                                </a> */}
                                <a
                                    className="btn-success btn-sm mr3"
                                    onClick={() => navigate(`/customer/${_id}`)}
                                >
                                    <i className="fa fa-pencil"></i>
                                </a>
                                <a
                                    className="btn-danger btn-sm"
                                    onClick={() => handleDelete(_id, name)}
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

export default CustomerInfo