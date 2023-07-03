import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CustomerInfo = () => {
    const navigate = useNavigate()
    const [list, setList] = useState([])
    const apiCall = () => {
        const url = `${process.env.REACT_APP_API_URL}customer-info`;
        try {
            axios.get(url).then((res) => {
                setList(res?.data?.result)
            })
        } catch (error) { }
    }
    useEffect(() => {
        apiCall()
    }, [])
    console.log('list', list)
    return (
        <>
            <div className='page_header'>
                <h3>Customer List</h3>
                <a onClick={() => navigate("/add-customer")}>ADD</a>
            </div>
            <div className='list_table'>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th style={{ width: "109px" }}>Action</th>
                    </tr>
                    {list?.length > 0 && list.map(({ name, phoneNumber, address }, index) => (
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
                                // onClick={() => handleDelete()}
                                >
                                    <i className="fa fa-pencil"></i>
                                </a>
                                <a
                                    className="btn-danger btn-sm"
                                // onClick={() => handleDelete()}
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