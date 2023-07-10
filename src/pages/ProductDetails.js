import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTotalBuy, getTotalDue, getTotalPay, getTotalSell } from '../assets/Function';
import { showToast } from '../utils/ToastHelper';

const ProductDetails = () => {
    const navigate = useNavigate()
    const d = new Date();
    let { id } = useParams();
    const [totalBuy, setTotalBuy] = useState({ price: 0, quantity: 0, unit: "KG", product: "" })
    const [totalSell, setTotalSell] = useState({ price: 0, quantity: 0 })
    const [list, setList] = useState([])
    const buyerInfo = () => {
        const url = `${process.env.REACT_APP_API_URL}daily-buy/product/${id}`;
        try {
            axios.get(url).then((res) => {
                if (res?.data?.status) {
                    setTotalBuy(getTotalBuy(res?.data?.result))
                    // console.log('res?.data', res?.data)
                }
            });
        } catch (error) { }
    };
    const sellerInfo = () => {
        const url = `${process.env.REACT_APP_API_URL}daily-sell/product/${id}`;
        try {
            axios.get(url).then((res) => {
                if (res?.data?.status) {
                    setTotalSell(getTotalSell(res?.data?.result))
                    // console.log('res?.data', res?.data)
                }
            });
        } catch (error) { }
    };

    useEffect(() => {
        buyerInfo()
        sellerInfo()
    }, [])

    // console.log('al', alreadyPaid)
    return (
        <>
            <div className="page_header">
                <h3>Product Details</h3>
                <a onClick={() => navigate("/product")}>List</a>
            </div>
            <div className="page_header mt20">
                <h5>Product:{totalBuy.product}</h5>
                <h5>Unit Name:{totalBuy.unit}</h5>
            </div>
            <div className="list_table">
                <table>
                    <tr>
                        <th>Total Buy</th>
                        <td>{totalBuy.quantity} {totalBuy.unit}</td>
                        <td>{totalBuy.price}&#2547;</td>
                    </tr>
                    <tr>
                        <th>Total Sell</th>
                        <td>{totalSell.quantity} {totalBuy.unit}</td>
                        <td>{totalSell.price}&#2547;</td>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <td>{totalBuy.quantity - totalSell.quantity} {totalBuy.unit}</td>
                        <td>{totalSell.price - totalBuy.price}&#2547;</td>
                    </tr>

                </table>
            </div>
        </>
    )
}

export default ProductDetails