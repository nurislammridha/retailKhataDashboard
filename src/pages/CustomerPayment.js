import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CustomerPayment = () => {
    const navigate = useNavigate()
    const [cash, setCash] = useState([])
    const handleCash = (index, val) => {
        cash[index] = val
        console.log('cash1', cash)
        setCash(cash)
    }
    console.log('cash', cash)
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
                        <th>Sta</th>
                        <th>Cash</th>
                        <th>Pay</th>
                    </tr>
                    {/* {list?.length > 0 &&
            list.map(
              (
                {
                  _id,
                  buyerName,
                  buyerAddress,
                  productName,
                  totalPrice,
                  cash,
                  due,
                  profit,
                },
                index
              ) => ( */}
                    <tr>
                        <td>
                            01-01-0000
                        </td>
                        <td>500</td>
                        <td>300</td>
                        <td>200</td>
                        <td>Paid</td>
                        <td>
                            <input
                                className='pay_input'
                                name=''
                                id=''
                                value={cash[0]}
                                placeholder='type'
                                type='number'
                                onChange={(e) => handleCash(0, e.target.value)}
                            />
                        </td>
                        <td><a
                            onClick={() => {
                                // submitSell();
                            }}

                            className="submit_pay"
                        >
                            PAY
                        </a></td>
                    </tr>
                    <tr>
                        <td>
                            01-01-0000
                        </td>
                        <td>500</td>
                        <td>300</td>
                        <td>200</td>
                        <td>Paid</td>
                        <td>
                            <input onChange={(e) => handleCash(1, e.target.value)} className='pay_input' name='' id='' value={cash[1]} placeholder='type' type='number' /></td>
                        <td><a
                            onClick={() => {
                                // submitSell();
                            }}

                            className="submit_pay"
                        >
                            PAY
                        </a></td>
                    </tr>
                    {/* )
            )} */}
                    <tr>
                        <td>

                        </td>
                        <td></td>
                        <td>to</td>
                        <td>223</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        </>
    )
}

export default CustomerPayment