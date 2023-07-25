import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllStock, getTotalBuy, getTotalDue, getTotalPay, getTotalSell } from '../assets/Function';
import { showToast } from '../utils/ToastHelper';

const ProductAllStock = () => {
    const [stock, setStock] = useState({})
    const allSelling = (buyingData) => {
        const url = `${process.env.REACT_APP_API_URL}daily-sell`;
        try {
            axios.get(url).then((res) => {
                if (res?.data?.status) {
                    setStock(getAllStock(buyingData, res?.data?.result))
                    // setTotalSell(getTotalSell(res?.data?.result))
                    // console.log('res?.data', res?.data)
                }
            });
        } catch (error) { }
    };
    const allBuying = () => {
        const url = `${process.env.REACT_APP_API_URL}daily-buy`;
        try {
            axios.get(url).then((res) => {
                if (res?.data?.status) {
                    allSelling(res?.data?.result)
                    // setTotalBuy(getTotalBuy(res?.data?.result))
                    // console.log('res?.data', res?.data)
                }
            });
        } catch (error) { }
    };


    useEffect(() => {
        allBuying()
        // allSelling()
        // getAllStock()
    }, [])

    console.log('stock', stock)
    return (
        <>
            <div className="page_header">
                <h3>All Product Stock</h3>
                {/* <a onClick={() => navigate("/product")}>List</a> */}
            </div>
            <div className="list_table">
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Buy</th>
                        <th>Sell</th>
                        <th>Stock</th>
                        <th>Profit</th>
                    </tr>
                    {stock?.arr?.map(({ productName, buyQuantity, sellQuantity, profit, unitName }) => (<tr>
                        <td>{productName}</td>
                        <td>{buyQuantity}</td>
                        <td>{sellQuantity}</td>
                        <td>{buyQuantity - sellQuantity} {unitName}</td>
                        <td>{profit}&#2547;</td>
                    </tr>))}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{stock?.grandProfit}&#2547;</td>
                    </tr>
                </table>
            </div>
        </>
    )
}

export default ProductAllStock