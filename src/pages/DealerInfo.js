import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { showToast } from '../utils/ToastHelper'
import { confirmAlert } from 'react-confirm-alert'

const DealerInfo = () => {
    const navigate = useNavigate()
    const [list, setList] = useState([])
    const apiCall = () => {
        const url = `${process.env.REACT_APP_API_URL}dealer-info`;
        try {
            axios.get(url).then((res) => {
                setList(res?.data?.result)
            })
        } catch (error) { }
    }
    const deleteFromApi = (id) => {
        const url = `${process.env.REACT_APP_API_URL}dealer-info/${id}`;
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
    const handleDelete = (id) => {
        confirmAlert({
            title: "Confirm To Delete",
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
                <h3>Dealer List</h3>
                <a onClick={() => navigate("/add-dealer")}>ADD</a>
            </div>
            <div className='list_table'>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th style={{ width: "109px" }}>Action</th>
                    </tr>
                    {list?.length > 0 && list.map(({ _id, name, phoneNumber, address }, index) => (
                        <tr>
                            <td>{name}</td>
                            <td>{phoneNumber}</td>
                            <td>{address}</td>
                            <td>
                                <a
                                    className="btn-primary btn-sm mr3"
                                // onClick={() => handleDelete()}
                                >
                                    <i className="fa fa-eye"></i>
                                </a>
                                <a
                                    className="btn-success btn-sm mr3"
                                    onClick={() => navigate(`/dealer/${_id}`)}
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
                    ))}


                </table>
            </div>
        </>
    )
}

export default DealerInfo