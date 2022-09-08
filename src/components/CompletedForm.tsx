import React, {useEffect, useState} from 'react';
import { IncomeRequest, officeRequest } from '../utils/request.module';

import './CompletedForm.css';

export const CompletedForm:React.FC = () => {

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
                <img alt='completed' src='./completed.png'/>
                <div className="completed-title">인증 완료</div>
                <div>본인인증이 완료되었습니다.</div>
            </div>
            <div className="completed-container basic-info">
                <div className='completed-form-title'>기본 정보</div>
                <div className='completed-form-item'>
                    <div>이름</div>
                    <div></div>
                </div>
                <div className='completed-form-item'>
                    <div>휴대폰 번호</div>
                    <div></div>
                </div>
                <div className='completed-form-item'>
                    <div>주민등록번호</div>
                    <div></div>
                </div>
            </div>
            <div className="completed-container detail-info">
                <div className='completed-form-title'>상세 정보</div>
                <div className='completed-form-item'>
                    <div>이미 낸 세금</div>
                    <div>{prepaidAmount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</div>
                </div>
                <div className='completed-form-item'>
                    <div>돌려받을 세금</div>
                    <div>{refundAmount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</div>
                </div>
            </div>
            <div className="completed-container cash-info">
                <div className='completed-form-title'>환급액 입금 안내</div>
                <div className='completed-form-item'>
                    <div>관할 세무서</div>
                    <div>{officeName}</div>
                </div>
                <div className='completed-form-item'>
                    <div>연락처</div>
                    <div>{officePhone}</div>
                </div>
            </div>
        </div>
    )
}