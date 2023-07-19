import React, { useState } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../utils/ToastHelper';
import axios from "axios";
const DealerInfoAdd = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const submitCustomer = () => {
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
        const url = `${process.env.REACT_APP_API_URL}dealer-info`;
        setIsLoading(true)
        try {
            axios.post(url, { name, phoneNumber, address }).then((res) => {
                if (res?.data?.status) {
                    setName("")
                    setAddress("")
                    setPhoneNumber("")
                    showToast("success", res?.data?.message)
                    setIsLoading(false)
                }
            })
        } catch (error) { }
    }
    return (
        <>
            <div className='page_header'>
                <h3>Add Dealer</h3>
                <a onClick={() => navigate("/dealer")}>List</a>
            </div>
            <div className='add'>
                <div className='input_cell'>
                    <h4>Dealer Name</h4>
                    <input
                        placeholder='enter dealer name'
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
                    <h4>Dealer Address</h4>
                    <input
                        placeholder='enter address'
                        value={address}
                        type='text'
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className='input_cell'>
                    <a
                        onClick={() => { !isLoading && submitCustomer() }}
                        className='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? "Is Loading" : "SUBMIT"}
                    </a>
                </div>
            </div>
        </>

    )
}

export default DealerInfoAdd