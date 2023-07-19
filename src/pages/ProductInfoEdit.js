import React, { useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate, useParams } from 'react-router-dom';
import { showToast } from '../utils/ToastHelper';
import axios from "axios";
import { unitList } from '../assets/Function';
import Select from "react-select";
const ProductInfoEdit = () => {
    const navigate = useNavigate()
    let { id } = useParams();
    const [name, setName] = useState("")
    const [unitName, setUnitName] = useState("")
    const [unitID, setUnitID] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const updateCustomer = () => {
        if (name.length === 0) {
            showToast("error", "Name should n't be empty")
            return 0
        } else if (unitName.length === 0) {
            showToast("error", "Unit Name shouldn't be empty")
            return 0
        }
        const url = `${process.env.REACT_APP_API_URL}product-info/${id}`;
        setIsLoading(true)
        try {
            axios.put(url, { name, unitName, unitID }).then((res) => {
                if (res?.data?.status) {
                    setName("")
                    setUnitName("")
                    setUnitID("")
                    showToast("success", res?.data?.message)
                    navigate("/product")
                    setIsLoading(false)
                }
            })
        } catch (error) { }
    }
    const getDataFromApi = () => {
        const url = `${process.env.REACT_APP_API_URL}product-info/${id}`;
        try {
            axios.get(url).then((res) => {
                if (res?.data?.status) {
                    const { name, unitName, unitID } = res?.data?.result
                    setName(name)
                    setUnitName(unitName)
                    setUnitID(unitID)

                }
            })
        } catch (error) { }
    }
    useEffect(() => {
        getDataFromApi()
    }, [])
    return (
        <>
            <div className='page_header'>
                <h3>Update Product</h3>
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
                        onClick={() => { isLoading && updateCustomer() }}
                        className='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? "Is Loading" : "UPDATE"}
                    </a>
                </div>
            </div>
        </>

    )
}

export default ProductInfoEdit