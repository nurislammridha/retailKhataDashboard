import React, { useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate, useParams } from 'react-router-dom';
import { showToast } from '../utils/ToastHelper';
import axios from "axios";
const CustomerInfoEdit = () => {
    const navigate = useNavigate()
    let { id } = useParams();
    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")

    const updateCustomer = () => {
        if (name.length === 0) {
            showToast("error", "Name should n't be empty")
            return 0
        } else if (phoneNumber.length !== 11) {
            showToast("error", "Invalid phone number Or empty")
            return 0
        } else if (address.length === 0) {
            showToast("error", "Address should n't be empty")
            return 0
        }
        const url = `${process.env.REACT_APP_API_URL}customer-info/${id}`;
        try {
            axios.put(url, { name, phoneNumber, address }).then((res) => {
                if (res?.data?.status) {
                    setName("")
                    setAddress("")
                    setPhoneNumber("")
                    showToast("success", res?.data?.message)
                    navigate("/customer")
                }
            })
        } catch (error) { }
    }
    const getDataFromApi = () => {
        const url = `${process.env.REACT_APP_API_URL}customer-info/${id}`;
        try {
            axios.get(url).then((res) => {
                if (res?.data?.status) {
                    const { name, address, phoneNumber } = res?.data?.result
                    setName(name)
                    setAddress(address)
                    setPhoneNumber(phoneNumber)

                }
            })
        } catch (error) { }
    }
    useEffect(() => {
        getDataFromApi()
    }, [])
    console.log('id', id)
    return (
        <>
            <div className='page_header'>
                <h3>Update Customer</h3>
                <a onClick={() => navigate("/customer")}>List</a>
            </div>
            <div className='add'>
                <div className='input_cell'>
                    <h4>Customer Name</h4>
                    <input
                        placeholder='enter customer name'
                        value={name}
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='input_cell'>
                    <h4>Phone Number</h4>
                    <input
                        placeholder='01xxxxxxxxx'
                        value={phoneNumber}
                        type='text'
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className='input_cell'>
                    <h4>Address(Village)</h4>
                    <input
                        placeholder='enter address'
                        value={address}
                        type='text'
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className='input_cell'>
                    <a onClick={() => { updateCustomer() }} className='submit'>UPDATE</a>
                </div>
            </div>
        </>

    )
}

export default CustomerInfoEdit