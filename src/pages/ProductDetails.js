import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTotalDue, getTotalPay } from '../assets/Function';
import { showToast } from '../utils/ToastHelper';

const ProductDetails = () => {
    const navigate = useNavigate()
    const d = new Date();
    const twoDigit = (n) => {
        return n.length > 1 ? n : "0" + n;
    };
    let { id } = useParams();
    const [list, setList] = useState([])
    const buyerInfo = () => {
        const url = `${process.env.REACT_APP_API_URL}daily-buy/product/${id}`;
        try {
            axios.get(url).then((res) => {
                if (res?.data?.status) {
                    console.log('res?.data', res?.data)
                }
            });
        } catch (error) { }
    };

    useEffect(() => {
        buyerInfo()
    }, [])

    // console.log('al', alreadyPaid)
    return (
        <>
            <div className="page_header">
                <h3>Product Details</h3>
                <a onClick={() => navigate("/product")}>List</a>
            </div>
            <div className="page_header mt20">
                <h5>Product Name</h5>
                <h5>Product Unit</h5>
            </div>
            <div className="list_table">
                <table>
                    <tr>
                        <th>Total Buy</th>
                        <td>1233 KG</td>
                        <td>13/=</td>
                    </tr>
                    <tr>
                        <th>Total Sell</th>
                        <td>1233 KG</td>
                        <td>123/=</td>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <td>233 Kg</td>
                        <td>2332taka</td>
                    </tr>

                </table>
            </div>
        </>
    )
}

export default ProductDetails