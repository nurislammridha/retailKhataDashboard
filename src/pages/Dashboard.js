import React, { useEffect, useState } from 'react'
import { getBuyingInfo, getCrDrInfo, getMonth, getSellingInfo, twoDigit } from '../assets/Function';
import axios from 'axios';

const Dashboard = () => {
    const d = new Date();
    const [date, setDate] = useState(
        `${d.getFullYear()}-${twoDigit(d.getMonth() + 1)}-${twoDigit(d.getDate())}`
    );
    const [sellingInfo, setSellingInfo] = useState({ todaySell: 0, todayNagad: 0, todayBaki: 0, todayProfit: 0, monthlySell: 0, monthlyNagad: 0, monthlyBaki: 0, monthlyProfit: 0, totalSell: 0, totalNagad: 0, totalBaki: 0, totalProfit: 0 })
    const [crDr, setCrDr] = useState({ freshInvest: 0, internalIncome: 0, businessCost: 0 })
    const [buyingInfo, setBuyingInfo] = useState({ totalBuy: 0, totalNagad: 0, totalBaki: 0, totalCost: 0 })
    const allSellingData = () => {
        const url = `${process.env.REACT_APP_API_URL}daily-sell`;
        try {
            axios.get(url).then((res) => {
                setSellingInfo(getSellingInfo(res?.data?.result, date));
            });
        } catch (error) { }
    };
    const allBuyingData = () => {
        const url = `${process.env.REACT_APP_API_URL}daily-buy`;
        try {
            axios.get(url).then((res) => {
                setBuyingInfo(getBuyingInfo(res?.data?.result));
            });
        } catch (error) { }
    };
    const allCrDrData = () => {
        const url = `${process.env.REACT_APP_API_URL}crDr`;
        try {
            axios.get(url).then((res) => {
                setCrDr(getCrDrInfo(res?.data?.result));
            });
        } catch (error) { }
    };
    useEffect(() => {
        allSellingData()
        allCrDrData()
        allBuyingData()
    }, [])
    console.log('crDr', crDr)
    console.log('buyingInfo', buyingInfo)
    return (
        <>
            <div className="page_header">
                <h3>Balance</h3>
                <h2>00&#2547;</h2>
            </div>
            <div className="list_table">
                <table>
                    <tr>
                        <th>Fresh Investment</th>
                        <td>{crDr.freshInvest}&#2547;</td>
                    </tr>
                    <tr>
                        <th>Hand Cash</th>
                        <td>{(crDr.freshInvest + crDr.internalIncome + sellingInfo.totalNagad) - (buyingInfo.totalBuy + buyingInfo.totalCost + crDr.businessCost)}&#2547;</td>
                    </tr>
                </table>
            </div>
            <div className="page_header mt25">
                <h3>Daily Story</h3>
                <h2>{date}</h2>
            </div>
            <div className="list_table">
                <table>
                    <tr>
                        <th>Today Sell</th>
                        <td>{sellingInfo.todaySell}&#2547;</td>
                    </tr>
                    <tr>
                        <th>Today Nagad</th>
                        <td>{sellingInfo.todayNagad}&#2547;</td>
                    </tr>
                    <tr>
                        <th>Today Baki</th>
                        <td>{sellingInfo.todayBaki}&#2547;</td>
                    </tr>
                    <tr>
                        <th>Today Profit</th>
                        <td>{sellingInfo.todayProfit.toFixed(2)}&#2547;</td>
                    </tr>
                </table>
            </div>
            <div className="page_header mt25"></div>
            <div className="page_header mt25">
                <h3>Monthly Story</h3>
                <h2>{getMonth()[d.getMonth()]}</h2>
            </div>
            <div className="list_table">
                <table>
                    <tr>
                        <th>Monthly Sell</th>
                        <td>{sellingInfo.monthlySell}&#2547;</td>
                    </tr>
                    <tr>
                        <th>Monthly Nagad</th>
                        <td>{sellingInfo.monthlyNagad}&#2547;</td>
                    </tr>
                    <tr>
                        <th>Monthly Baki</th>
                        <td>{sellingInfo.monthlyBaki}&#2547;</td>
                    </tr>
                    <tr>
                        <th>Monthly Profit</th>
                        <td>{sellingInfo.monthlyProfit.toFixed(2)}&#2547;</td>
                    </tr>
                </table>
            </div>
            <div className="page_header mt25"></div>
            <div className="page_header mt25">
                <h3>Total Story</h3>
                <h2></h2>
            </div>
            <div className="list_table">
                <table>
                    <tr>
                        <th>Total Sell</th>
                        <td>{sellingInfo.totalSell}&#2547;</td>
                    </tr>
                    <tr>
                        <th>Total Nagad</th>
                        <td>{sellingInfo.totalNagad}&#2547;</td>
                    </tr>
                    <tr>
                        <th>Total Baki</th>
                        <td>{sellingInfo.totalBaki}&#2547;</td>
                    </tr>
                    <tr>
                        <th>Total Profit/Loss(Not Actual)</th>
                        <td>{sellingInfo.totalProfit.toFixed(2)}&#2547;</td>
                    </tr>
                    <tr>
                        <th>Net Profit/Loss(Stock and baki hisaber baire)</th>
                        <td>{(sellingInfo.totalSell + crDr.internalIncome) - (buyingInfo.totalBuy + buyingInfo.totalCost + crDr.businessCost)}&#2547;</td>
                    </tr>
                </table>
            </div>
        </>
    )
}

export default Dashboard