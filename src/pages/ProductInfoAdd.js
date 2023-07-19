import React, { useState } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../utils/ToastHelper';
import axios from "axios";
import Select from "react-select";
import { unitList } from '../assets/Function';
const ProductInfoAdd = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [unitName, setUnitName] = useState("")
    const [unitID, setUnitID] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const submitCustomer = () => {
        if (name.length === 0) {
            showToast("error", "Name should n't be empty")
            return 0
        } else if (unitName.length === 0) {
            showToast("error", "Unit Name Shouldn't be empty")
            return 0
        }
        const url = `${process.env.REACT_APP_API_URL}product-info`;
        setIsLoading(true)
        try {
            axios.post(url, { name, unitName, unitID, presentPricePerUnit: 0 }).then((res) => {
                if (res?.data?.status) {
                    setName("")
                    setUnitName("")
                    setUnitID("")
                    showToast("success", res?.data?.message)
                    setIsLoading(false)
                }
            })
        } catch (error) { }
    }
    return (
        <>
            <div className='page_header'>
                <h3>Add Product</h3>
                <a onClick={() => navigate("/product")}>List</a>
            </div>
            <div className='add'>
                <div className='input_cell'>
                    <h4>Product Name</h4>
                    <input
                        placeholder='enter product name'
                        value={name}
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='input_cell'>
                    <h4>Select Unit</h4>

                    <Select
                        className='select'
                        options={unitList()}
                        value={{ label: unitName }}
                        onChange={(e) => {
                            setUnitName(e.label);
                            setUnitID(e.value);
                        }}
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

export default ProductInfoAdd