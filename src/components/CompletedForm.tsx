import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import { IncomeRequest, officeRequest } from '../utils/request.module';

import './CompletedForm.css';

export const CompletedForm:React.FC = () => {
    const location = useLocation();

    const {state}:any = location;
    const [officeName, setOfficeName] = useState<string>();
    const [officePhone, setOfficePhone] = useState<string>();
    const [prepaidAmount, setPrepaidAmount] = useState<number>();
    const [refundAmount, setRefundAmount] = useState<number>();

    const getTaxInfo = async () => {
        try {
            const incomeResponse = await fetch('http://localhost:3001/api/v1/tax/incomes');
            const incomeDocument:IncomeRequest = await incomeResponse.json();

            const officeResponse = await fetch('http://localhost:3001/api/v1/tax/office');
            const officeDocument:officeRequest = await officeResponse.json();

            const {data:incomeData} = incomeDocument;
            const {incomes} = incomeData.tax;
            let prepaidSum = 0;
            let refundSum = 0;
            incomes?.forEach(income=>{
                const {type, amount} = income;

                if (type === 'prepaid') {
                    prepaidSum += amount;
                } else {
                    refundSum += Math.abs(amount);
                }
            })
            setPrepaidAmount(prepaidSum);
            setRefundAmount(refundSum);

            const {data:officeData} = officeDocument;
            const {name, phone} = officeData.tax.office;

            setOfficeName(name);
            setOfficePhone(phone);

        } catch (e:any) {
            console.error(e.message);
        }
    };

    useEffect(()=>{
        getTaxInfo();
    },[])
    return (
        <div> 
            <div className='completed-form-upper'>
                <img alt='completed' src='/completed.png'/>
                <div className="completed-title">?????? ??????</div>
                <div>??????????????? ?????????????????????.</div>
            </div>
            <div className="completed-container basic-info">
                <div className='completed-form-title'>?????? ??????</div>
                <div className='completed-form-item'>
                    <div>??????</div>
                    <div>{state?.name}</div>
                </div>
                <div className='completed-form-item'>
                    <div>????????? ??????</div>
                    <div>{state?.phoneNumber}</div>
                </div>
                <div className='completed-form-item'>
                    <div>??????????????????</div>
                    <div>{`${state?.regNumber.substring(0,6)} - ${state?.regNumber.substring(6,7)}******`}</div>
                </div>
            </div>
            <div className="completed-container detail-info">
                <div className='completed-form-title'>?????? ??????</div>
                <div className='completed-form-item'>
                    <div>?????? ??? ??????</div>
                    <div>{prepaidAmount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}???</div>
                </div>
                <div className='completed-form-item'>
                    <div>???????????? ??????</div>
                    <div>{refundAmount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}???</div>
                </div>
            </div>
            <div className="completed-container cash-info">
                <div className='completed-form-title'>????????? ?????? ??????</div>
                <div className='completed-form-item'>
                    <div>?????? ?????????</div>
                    <div>{officeName}</div>
                </div>
                <div className='completed-form-item'>
                    <div>?????????</div>
                    <div>{officePhone}</div>
                </div>
            </div>
        </div>
    )
}