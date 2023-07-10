import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTotalDue, getTotalPay, twoDigit } from '../assets/Function';
import { showToast } from '../utils/ToastHelper';

const CustomerPayment = () => {
    const navigate = useNavigate()
    const d = new Date();
    let { id } = useParams();
    const [pay, setPay] = useState([])
    const [list, setList] = useState([])
    const [alreadyPaid, setAlreadyPaid] = useState([])
    const [tCash, setTCash] = useState(0)
    const handleCash = (index, totalPrice, cash, due, paymentHistory, val) => {
        let arr = []
        const obj = { index, totalPrice, cash, due, paymentHistory, val }
        pay[index] = obj
        setTCash(getTotalPay(pay))
        setPay(pay)
    }
    const searchByCustomer = () => {
        const url = `${process.env.REACT_APP_API_URL}daily-sell/customer-unpaid/${id}`;
        try {
            axios.get(url).then((res) => {
                setList(res?.data?.result);
            });
        } catch (error) { }
    };
    const submitPay = (index, id) => {
        const { paymentHistory, cash, due, val } = pay[index] || {}
        console.log('val', val)
        console.log('val.length', val?.length)
        if (val === undefined) {
            showToast("error", "Invalid Cash");
            return 0
        } else if (val > due || val <= 0) {
            showToast("error", "Over Cash");
            return 0
        }
        paymentHistory.push({ paymentDate: `${d.getFullYear()}-${twoDigit(d.getMonth() + 1)}-${twoDigit(d.getDate())}`, amount: val })
        const postData = {
            cash: cash + val,
            due: due - val,
            isPaid: val === due,
            paymentHistory
        };
        const url = `${process.env.REACT_APP_API_URL}daily-sell/${id}`;
        // console.log('postData', postData)
        // return 0
        try {
            axios.put(url, postData).then((res) => {
                if (res?.data?.status) {
                    let arr = [...alreadyPaid]
                    arr[index] = true
                    setAlreadyPaid(arr)
                    showToast("success", res?.data?.message);
                }
            });
        } catch (error) { }
    }
    useEffect(() => {
        searchByCustomer()
    }, [])

    // console.log('cash', (pay[0]?.totalPrice === (pay[0]?.due + pay[0]?.val)))
    // console.log('cash', pay)
    console.log('al', alreadyPaid)
    return (
        <>
            <div className="page_header">
                <h3>Customer Pay</h3>
                <a onClick={() => navigate("/customer")}>List</a>
            </div>
            <div className="page_header mt20">
                <h5>Nurislam</h5>
                <h5>Bagmara</h5>
                <h5>01753109207</h5>
            </div>
            <div className="list_table">
                <table>
                    <tr>
                        <th>Date</th>
                        <th>To</th>
                        <th>Pay</th>
                        <th>Due</th>
                        {/* <th>Sta</th> */}
                        <th>Cash</th>
                        <th>Pay</th>
                    </tr>
                    {list?.length > 0 &&
                        list.map(
                            (
                                {
                                    _id,
                                    date,
                                    totalPrice,
                                    cash,
                                    due,
                                    paymentHistory,
                                },
                                index
                            ) => (
                                <tr>
                                    <td>
                                        {date}
                                    </td>
                                    <td>{totalPrice}</td>
                                    <td>{cash}</td>
                                    <td>{due}</td>
                                    {/* <td>Paid</td> */}
                                    {/* <td>{pay.length > 0 && pay[index]?.due === pay[index]?.val ? "Paid" : "Un Paid"}</td> */}
                                    <td>
                                        <input
                                            className='pay_input'
                                            name=''
                                            id=''
                                            value={cash[0]}
                                            placeholder='type'
                                            type='number'
                                            disabled={alreadyPaid[index]}
                                            onChange={(e) => handleCash(index, totalPrice, cash, due, paymentHistory, isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value))}
                                        />
                                    </td>
                                    <td><a
                                        onClick={() =>
                                            alreadyPaid[index] ? {} : submitPay(index, _id)
                                        }

                                        className="submit_pay"
                                    >
                                        {alreadyPaid[index] ? "PAID" : "PAY"}

                                    </a></td>
                                </tr>

                            )
                        )}
                    <tr>
                        <td>
                            Total=
                        </td>
                        <td></td>
                        <td></td>
                        <td>{getTotalDue(list)}</td>
                        <td>{tCash}</td>
                        <td></td>
                        {/* <td></td> */}
                    </tr>
                </table>
            </div>
        </>
    )
}

export default CustomerPayment