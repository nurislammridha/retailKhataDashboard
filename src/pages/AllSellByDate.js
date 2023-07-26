import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { allBuyingByDate, allSellingByDate } from '../assets/Function';

const AllSellByDate = () => {
    const [list, setList] = useState([]);
    const [search, setSearch] = useState("")
    const [customer, setCustomer] = useState("")
    const [total, setTotal] = useState({ totalQuantity: 0, totalPrice: 0, totalCash: 0, totalDue: 0, totalProfit: 0 });
    const allBuying = () => {
        const url = `${process.env.REACT_APP_API_URL}daily-sell`;
        try {
            axios.get(url).then((res) => {
                if (res?.data?.status) {
                    setList(res?.data?.result);
                }
            });
        } catch (error) { }
    };


    useEffect(() => {
        allBuying()
    }, [])
    useEffect(() => {
        setTotal(allSellingByDate(list.filter((val) => {
            if (search == "" && customer == "") {
                return val;
            } else if (
                search == "" && val.buyerName
                    .toLowerCase()
                    .includes(customer.toLowerCase())
            ) {
                return val;
            } else if (
                customer == "" && val.productName
                    .toLowerCase()
                    .includes(search.toLowerCase())
            ) {
                return val;
            } else if (val.buyerName
                .toLowerCase()
                .includes(customer.toLowerCase()) && val.productName
                    .toLowerCase()
                    .includes(search.toLowerCase())) {
                return val
            }
        })))
    }, [search, customer])

    // console.log('stock', stock)
    return (
        <>
            <div className="page_header">
                <h3>All Selling History By Date</h3>
                {/* <a onClick={() => navigate("/product")}>List</a> */}
            </div>
            <div className='page_header mt20'>
                <h3>Search</h3>
                <input
                    className='ml30'
                    placeholder='search by customer name'
                    value={customer}
                    type='text'
                    onChange={(e) => setCustomer(e.target.value)}
                />
                <input
                    className='ml30'
                    placeholder='search by product name'
                    value={search}
                    type='text'
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="list_table">
                <table>
                    <tr>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Q</th>
                        <th>Pri</th>
                        <th>Ca.</th>
                        <th>Du.</th>
                        <th>P.</th>
                    </tr>
                    {list?.length > 0 &&
                        list.filter((val) => {
                            if (search == "" && customer == "") {
                                return val;
                            } else if (
                                search == "" && val.buyerName
                                    .toLowerCase()
                                    .includes(customer.toLowerCase())
                            ) {
                                return val;
                            } else if (
                                customer == "" && val.productName
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                            ) {
                                return val;
                            } else if (val.buyerName
                                .toLowerCase()
                                .includes(customer.toLowerCase()) && val.productName
                                    .toLowerCase()
                                    .includes(search.toLowerCase())) {
                                return val
                            }
                        }).sort((a, b) => (a.timeStamp < b.timeStamp) * 2 - 1).map(
                            (
                                {
                                    buyerName,
                                    quantity,
                                    buyerAddress,
                                    productName,
                                    totalPrice,
                                    cash,
                                    due,
                                    profit,
                                    date
                                },
                                index
                            ) => (
                                <tr>
                                    <td>{date}</td>
                                    <td>
                                        {buyerName}({buyerAddress})
                                    </td>
                                    <td>{productName}</td>
                                    <td>{quantity}</td>
                                    <td>{totalPrice}</td>
                                    <td>{cash}</td>
                                    <td>{due}</td>
                                    <td>{profit.toFixed(2)}</td>
                                </tr>
                            )
                        )}
                    <tr>
                        <td colSpan={3}>Total</td>
                        <td>{total.totalQuantity}</td>
                        <td>{total.totalPrice}</td>
                        <td>{total.totalCash}</td>
                        <td>{total.totalDue}</td>
                        <td>{total.totalProfit.toFixed(2)}</td>
                    </tr>
                </table>
            </div>
        </>
    )
}

export default AllSellByDate