import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { allCustomerDue } from '../assets/Function';

const AllBakiByCustomer = () => {
    const [list, setList] = useState([]);
    const [search, setSearch] = useState("")
    const [customer, setCustomer] = useState("")
    const [total, setTotal] = useState({ totalQuantity: 0, totalPrice: 0, totalCash: 0, totalDue: 0, totalProfit: 0 });
    const allDueByCustomer = () => {
        const url = `${process.env.REACT_APP_API_URL}daily-sell`;
        try {
            axios.get(url).then((res) => {
                if (res?.data?.status) {
                    setList(allCustomerDue(res?.data?.result));
                }
            });
        } catch (error) { }
    };

    const diffDate = (date) => {
        const d2 = new Date()
        const d1 = new Date(date)
        const diffTime = Math.abs(d2 - d1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays
    }
    useEffect(() => {
        allDueByCustomer()
    }, [])

    return (
        <>
            <div className='page_header'>
                <h3>Customer Due</h3>
                {/* <a onClick={() => navigate("/add-customer")}>ADD</a> */}
            </div>
            <div className='page_header mt20'>
                <h3>Search</h3>
                <input
                    className='ml30'
                    placeholder='search by customer name'
                    value={search}
                    type='text'
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className='list_table'>
                <table>
                    <tr>
                        <th>S</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Due</th>
                        <th>Sell</th>
                        <th>Pay</th>
                    </tr>
                    {list?.length > 0 && list.filter((val) => {
                        if (search == "") {
                            return val;
                        } else if (
                            val.name
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        ) {
                            return val;
                        }
                    }).sort((a, b) => (a.totalDue < b.totalDue) * 2 - 1).map(({ name, phone, address, totalDue, lastPayingDate, lastSellingDate }, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{name}</td>
                            <td>{phone}</td>
                            <td>{address}</td>
                            <td>{totalDue}</td>
                            <td>{diffDate(lastSellingDate)} Days Ago</td>
                            <td>{diffDate(lastPayingDate)} Days Ago</td>
                        </tr>
                    ))}


                </table>
            </div>
        </>
    )
}

export default AllBakiByCustomer