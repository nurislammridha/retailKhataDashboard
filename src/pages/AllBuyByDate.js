import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { allBuyingByDate } from '../assets/Function';

const AllBuyByDate = () => {
    const [list, setList] = useState([]);
    const [search, setSearch] = useState("")
    const [total, setTotal] = useState({ totalQuantity: 0, totalPrice: 0, totalCash: 0, totalDue: 0, totalOther: 0 });
    const allBuying = () => {
        const url = `${process.env.REACT_APP_API_URL}daily-buy`;
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
        setTotal(allBuyingByDate(list.filter((val) => {
            if (search == "") {
                return val;
            } else if (
                val.productName
                    .toLowerCase()
                    .includes(search.toLowerCase())
            ) {
                return val;
            }
        })))
    }, [])
    useEffect(() => {
        setTotal(allBuyingByDate(list.filter((val) => {
            if (search == "") {
                return val;
            } else if (
                val.productName
                    .toLowerCase()
                    .includes(search.toLowerCase())
            ) {
                return val;
            }
        })))
    }, [search])

    // console.log('stock', stock)
    return (
        <>
            <div className="page_header">
                <h3>All Buying History By Date</h3>
                {/* <a onClick={() => navigate("/product")}>List</a> */}
            </div>
            <div className='page_header mt20'>
                <h3>Search</h3>
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
                        <th>Product</th>
                        <th>Q</th>
                        <th>Pr</th>
                        <th>Du</th>
                        <th>Ot.</th>
                        <th>Ca</th>
                    </tr>
                    {list?.length > 0 &&
                        list.filter((val) => {
                            if (search == "") {
                                return val;
                            } else if (
                                val.productName
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                            ) {
                                return val;
                            }
                        }).sort((a, b) => (a.timeStamp < b.timeStamp) * 2 - 1).map(
                            (
                                {
                                    _id,
                                    date,
                                    productName,
                                    totalPrice,
                                    cash,
                                    due,
                                    quantity,
                                    otherCost,
                                },
                                index
                            ) => (
                                <tr>
                                    <td>{date}</td>
                                    <td>{productName}</td>
                                    <td>{quantity}</td>
                                    <td>{totalPrice}</td>
                                    <td>{due}</td>
                                    <td>{otherCost}</td>
                                    <td>{cash}</td>
                                </tr>
                            )
                        )}
                    <tr>
                        <td colSpan={2}>Total</td>
                        <td>{total.totalQuantity}</td>
                        <td>{total.totalPrice}</td>
                        <td>{total.totalDue}</td>
                        <td>{total.totalOther}</td>
                        <td>{total.totalCash}</td>
                    </tr>
                </table>
            </div>
        </>
    )
}

export default AllBuyByDate