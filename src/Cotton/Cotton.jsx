import React, { useState } from 'react';
import './Cotton.css';
import html2canvas from 'html2canvas';
import { FaCircleArrowDown } from "react-icons/fa6";

function Cotton() {
    const [name, setName] = useState('');
    const [tokenNumber, setTokenNumber] = useState('');
    const [tokenStartNumber, setTokenStartNumber] = useState('');
    const [rows, setRows] = useState([]);
    const [inputValues, setInputValues] = useState({});
    const [totalMinusValue, setTotalMinusValue] = useState(0);
    const [totalInputBox1Sum, setTotalInputBox1Sum] = useState(0);
    const [totalInputBox2Sum, setTotalInputBox2Sum] = useState(0);
    const [totalSumt, setTotalSumtSum] = useState(0);
    const [totalThatu, setTotalThatuSum] = useState(0);
    const [totalMinusValueSum, setTotalMinusValueSum] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalMultiplied, setTotalMultiplied] = useState(0);

    const handleGenerateRows = () => {
        const startNumber = parseInt(tokenStartNumber, 10);
        const rowCount = parseInt(tokenNumber, 10);
        if (!isNaN(startNumber) && !isNaN(rowCount)) {
            const newRows = [];
            const newInputValues = {};
            for (let i = 0; i < rowCount; i++) {
                newRows.push({ sNo: i + 1, number: startNumber + i });
                newInputValues[i] = { first: '', second: '', rate: '', sum: '', minusTotalFirst: '', minusTotalSecond: '', minusValue:'', thatu:'', minusValueTotal: '', multipliedMinusValue: '', tolaAmount: '' };
            }
            setRows(newRows);
            setInputValues(newInputValues);
            setTotalMinusValue(0); 
            setTotalInputBox1Sum(0);
            setTotalInputBox2Sum(0);
            setTotalSumtSum(0);
            setTotalMinusValueSum(0);
            setTotalAmount(0);
            setTotalThatuSum(0);
            setTotalMultiplied(0);
        }
    };

    const getMinusValue = (value) => {
        if (value < 40) return 1;
        if (value >= 40 && value <= 80) return 2;
        if (value >= 81 && value <= 99) return 3;
        if (value >= 100) return 4;
        return 0;
    };

    const handleInputChange = (index, field, value) => {
        setInputValues((prevValues) => {
            const newValues = {
                ...prevValues,
                [index]: {
                    ...prevValues[index],
                    [field]: value,
                },
            };

            const firstValue = parseFloat(newValues[index].first || 0);
            const secondValue = parseFloat(newValues[index].second || 0);
            const rate = parseFloat(newValues[index].rate || 0);

            const sum = firstValue + secondValue;

            const firstMinusValue = getMinusValue(firstValue);
            const secondMinusValue = getMinusValue(secondValue);

            const minusTotalFirst = `${firstValue} - ${firstMinusValue} = ${firstValue - firstMinusValue}`;
            const minusTotalSecond = `${secondValue} - ${secondMinusValue} = ${secondValue - secondMinusValue}`;

            const minusValueTotal = firstValue - firstMinusValue + secondValue - secondMinusValue;
            const multipliedMinusValue1 = minusValueTotal * rate;
            const multipliedMinusValue = multipliedMinusValue1.toFixed(2);

            const thatu = 40;
            const totalAmount = parseFloat(multipliedMinusValue) + thatu;
            const tolaAmount = totalAmount.toFixed(2);

            const minusValue = firstMinusValue + secondMinusValue;

            newValues[index].sum = sum;
            newValues[index].minusTotalFirst = minusTotalFirst;
            newValues[index].minusTotalSecond = minusTotalSecond;
            newValues[index].minusValueTotal = minusValueTotal;
            newValues[index].multipliedMinusValue = multipliedMinusValue;
            newValues[index].tolaAmount = tolaAmount;
            newValues[index].minusValue = minusValue;
            newValues[index].thatu = thatu;

            const totalInputBox1 = Object.values(newValues).reduce((acc, curr) => acc + parseFloat(curr.first || 0), 0);
            const totalInputBox2 = Object.values(newValues).reduce((acc, curr) => acc + parseFloat(curr.second || 0), 0);
            const totalSumt = Object.values(newValues).reduce((acc, curr) => acc + parseFloat(curr.sum || 0), 0);
            const totalMinusValue = Object.values(newValues).reduce((acc, curr) => acc + parseFloat(curr.minusValue || 0), 0);
            const totalMinusValueTotal = Object.values(newValues).reduce((acc, curr) => acc + parseFloat(curr.minusValueTotal || 0), 0);
            const totalAmountSum = Object.values(newValues).reduce((acc, curr) => acc + parseFloat(curr.tolaAmount || 0), 0);
            const totalThatu = Object.values(newValues).reduce((acc, curr) => acc + parseFloat(curr.thatu || 0), 0);
            const totalMultiplied = Object.values(newValues).reduce((acc, curr) => acc + parseFloat(curr.multipliedMinusValue || 0), 0);

            setTotalInputBox1Sum(totalInputBox1);
            setTotalInputBox2Sum(totalInputBox2);
            setTotalSumtSum(totalSumt);
            setTotalMinusValue(totalMinusValue);
            setTotalMinusValueSum(totalMinusValueTotal);
            setTotalAmount(totalAmountSum);
            setTotalThatuSum(totalThatu);
            setTotalMultiplied(totalMultiplied);

            return newValues;
        });
    };

    const handleDownload = () => {
        const table = document.getElementById('table-to-download');
        html2canvas(table, { scale: 3 }).then(canvas => {
          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/jpeg', 1.0);
          link.download = 'table.jpg';
          link.click();
        });
      };

    return (
        <div>
            <nav>
                <h1>Cot<span>ton.</span></h1>
                <div className="nav2">
                <a href="#">Home</a>
                <a href="#table-to-download">Rate</a>
                </div>
            </nav>
            <div id='#' className='Main' >
                <div className='box'>
            <h1 style={{textAlign:'center', marginBottom:'20px'}}>Cotton Rate Finder</h1>
            <div style={{ marginBottom: '20px' }}>
                <h6>Enter Your Name:</h6>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='name'/>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h6>Number of Tokens:</h6>
                    <input
                        type="number"
                        value={tokenNumber}
                        onChange={(e) => setTokenNumber(e.target.value)} placeholder='Token'
                    />
            
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h6>
                    Token Starting Number:</h6>
                    <input
                        type="number"
                        value={tokenStartNumber}
                        onChange={(e) => setTokenStartNumber(e.target.value)} placeholder='Starting Number'
                    />
          
            </div>

            <button className='submit-btn' onClick={handleGenerateRows}>Submit <FaCircleArrowDown style={{color:'rgba(0, 0, 0, 0.59)', marginTop:'-2px', marginLeft:'5px'}} /></button>
            </div>
            </div>
            {rows.length > 0 && (
                <>
                <div className="table-main">
                    <div className="table-box">
                    <table id="table-to-download" style={{ marginTop: '20px', border: '1px solid #000', width: '100%' }}>
                        <thead>
                            <tr><th style={{padding: '10px'}} >{name}</th></tr>
                            <tr>
                                <th style={{ border: '1px solid #000', padding: '10px', width:'3%' }}>S.No</th>
                                <th style={{ border: '1px solid #000', padding: '10px', width:'4%' }}>Token Number</th>
                                <th style={{ border: '1px solid #000', padding: '10px', width:'7%' }}>KG Slot 1</th>
                                <th style={{ border: '1px solid #000', padding: '10px', width:'7%' }}>KG Slot 2</th>
                                <th style={{ border: '1px solid #000', padding: '10px', width:'7%' }}>Rate</th>
                                <th style={{ border: '1px solid #000', padding: '10px', width:'7%' }}>Kg</th>
                                <th style={{ border: '1px solid #000', padding: '10px', width:'7%' }}>Minus Kg 1 </th>
                                <th style={{ border: '1px solid #000', padding: '10px', width:'7%' }}>Minus Kg 2 </th>
                                <th style={{ border: '1px solid #000', padding: '10px', width:'5%' }}>Minus Kg </th>
                                <th style={{ border: '1px solid #000', padding: '10px', width:'7%' }}>Total Kg</th>
                                <th style={{ border: '1px solid #000', padding: '10px' }}>Kg * Rate</th>
                                <th style={{ border: '1px solid #000', padding: '10px' }}>Amount</th>
                                <th style={{ border: '1px solid #000', padding: '10px' }}>Thattu</th>
                                <th style={{ border: '1px solid #000', padding: '10px' }}>Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={row.sNo}>
                                    <td style={{ border: '1px solid #000', padding: '10px' }}>{row.sNo}</td>
                                    <td style={{ border: '1px solid #000', padding: '10px' }}>{row.number}</td>
                                    <td style={{ border: '1px solid #000', padding: '10px' }}>
                                        <input
                                            type="text"
                                            value={inputValues[index]?.first}
                                            onChange={(e) => handleInputChange(index, 'first', e.target.value)}
                                            style={{ padding: '5px', width: '60%', marginRight:'5px'}}
                                        />Kg
                                    </td>
                                    <td style={{ border: '1px solid #000', padding: '10px' }}>
                                        <input
                                            type="text"
                                            value={inputValues[index]?.second}
                                            onChange={(e) => handleInputChange(index, 'second', e.target.value)}
                                            style={{ padding: '5px', width: '60%', marginRight:'5px' }}
                                        
                                        />Kg
                                    </td>
                                    <td style={{ border: '1px solid #000', padding: '10px' }}>
                                    ₹ <input
                                            type="text"
                                            value={inputValues[index]?.rate}
                                            onChange={(e) => handleInputChange(index, 'rate', e.target.value)}
                                            style={{ padding: '5px', width: '60%' }}
                                        />
                                    </td>
                                    <td style={{ border: '1px solid #000', padding: '10px' }}>
                                        {inputValues[index]?.sum} Kg
                                    </td>
                                    <td style={{ border: '1px solid #000', padding: '10px' }}>
                                        {inputValues[index]?.minusTotalFirst}
                                    </td>
                                    <td style={{ border: '1px solid #000', padding: '10px' }}>
                                        {inputValues[index]?.minusTotalSecond}
                                    </td>
                                    <td style={{ border: '1px solid #000', padding: '10px' }}>
                                        - {inputValues[index]?.minusValue} Kg
                                    </td>
                                    <td style={{ border: '1px solid #000', padding: '10px' }}>
                                        {inputValues[index]?.minusValueTotal} Kg
                                    </td>
                                    <td style={{ border: '1px solid #000', padding: '10px' }}>
                                        {inputValues[index]?.minusValueTotal} * {inputValues[index]?.rate}
                                    </td>
                                    <td style={{ border: '1px solid #000', padding: '10px' }}>
                                    ₹ {inputValues[index]?.multipliedMinusValue}
                                    </td>
                                    <td style={{ border: '1px solid #000', padding: '10px' }}>
                                    ₹ {inputValues[index]?.thatu}
                                    </td>
                                    <td style={{ border: '1px solid #000', padding: '10px' }}>
                                    ₹ {inputValues[index]?.tolaAmount}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="2" style={{ border: '1px solid #000', padding: '10px' }}>Total</td>
                                <td style={{ border: '1px solid #000', padding: '10px' }}>{totalInputBox1Sum} Kg</td>
                                <td style={{ border: '1px solid #000', padding: '10px' }}>{totalInputBox2Sum} Kg</td>
                                <td style={{ border: '1px solid #000', padding: '10px' }}>---</td>
                                <td style={{ border: '1px solid #000', padding: '10px' }}>{totalSumt} Kg</td>
                                <td style={{ border: '1px solid #000', padding: '10px' }}>---</td>
                                <td style={{ border: '1px solid #000', padding: '10px' }}>---</td>
                                <td style={{ border: '1px solid #000', padding: '10px' }}>- {totalMinusValue} Kg</td>
                                <td style={{ border: '1px solid #000', padding: '10px' }}>{totalMinusValueSum} Kg</td>
                                <td style={{ border: '1px solid #000', padding: '10px' }}>---</td>
                                <td style={{ border: '1px solid #000', padding: '10px' }}>₹ {totalMultiplied}</td>
                                <td style={{ border: '1px solid #000', padding: '10px' }}>₹ {totalThatu}</td>
                                <td style={{ border: '1px solid #000', padding: '10px' }}>₹ {totalAmount}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className='download' onClick={handleDownload}>Download Table</button>
                    </div>
                    </div>
                </>
            )}
        </div>
        
    );
}

export default Cotton;
