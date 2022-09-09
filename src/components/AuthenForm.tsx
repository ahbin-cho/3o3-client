import moment from 'moment';
import React,{useState, useRef,useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import { EasySignRequest } from '../utils/request.module';
import { validateFullRegNo, validateName, validatePhoneNumber } from '../utils/validationUtil';

import './AuthenForm.css';
import { CompletedForm } from './CompletedForm';
import { TermsModal } from './TermsModal';
import { Timer } from './TImer';

interface ErrorState {
    name?:string,
    phoneNumber?:string,
    regNumber?:string,
}

export const AuthenForm:React.FC = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);
    const regNumber1Ref = useRef<HTMLInputElement>(null);
    const regNumber2Ref = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const location = useLocation();

    const [name, setName] = useState<string>();
    const [phoneNumber, setPhoneNumber] = useState<string>();
    const [regNumber, setRegNumber] = useState<string>();

    const [errorState, setErrorState] = useState<ErrorState>({});
    const [isValidated, setIsValidated] = useState<boolean>(false);
    const [isTermsModalVisible, setIsTermsModalVisible] = useState<boolean>(false);

    const [minutes, setMinutes] = useState<number>(1);
    const [seconds, setSeconds] = useState<number>(0);

    const onChangeInputName = (e:React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = nameRef.current?.value;

        if (!validateName(inputValue || '')) {
            setName('');
            setErrorState(prevState=>{return({...prevState, name:'올바른 이름을 입력해주세요'})});
        } else {
            setName(inputValue?.trim());
            setErrorState(prevState=>{return({...prevState, name:''})})
        }
    }

    const onKeyDownInputName = (e:React.KeyboardEvent<HTMLInputElement>) => {
        const { keyCode } = e;
        if ( keyCode === 13 ) {
            phoneNumberRef.current?.focus();
        }
    }

    const onChangeInputPhoneNumber = (e:React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = phoneNumberRef.current?.value;

        if (!validatePhoneNumber(inputValue || '')) {
            setPhoneNumber(undefined);
            setErrorState(prevState=>{return({...prevState, phoneNumber:'올바른 전화번호를 입력해주세요'})});
        } else {
            setPhoneNumber(inputValue);
            setErrorState(prevState=>{return({...prevState, phoneNumber:''})})
        }
    }

    const onKeyDownInputPhoneNumber = (e:React.KeyboardEvent<HTMLInputElement>) => {
        const { keyCode } = e;
        if ( keyCode === 13 ) {
            regNumber1Ref.current?.focus();
        }
    }

    const onChangeInputRegNumber = (e:React.ChangeEvent<HTMLInputElement>) => {
        const inputValueJumin1 = regNumber1Ref.current?.value;
        const inputValueJumin2 = regNumber2Ref.current?.value;

        const jumin = (inputValueJumin1||'') + (inputValueJumin2||'');

        if (!validateFullRegNo(jumin || '')) {
            setRegNumber(undefined);
            setErrorState(prevState=>{return({...prevState, regNumber:'올바른 주민등록번호를 입력해주세요'})});
        } else {
            setRegNumber(jumin);
            setErrorState(prevState=>{return({...prevState, regNumber:''})})
        }
    }

    const onKeyDownInputRegNumber1 = (e:React.KeyboardEvent<HTMLInputElement>) => {
        const { keyCode } = e;
        if ( keyCode === 13 ) {
            regNumber2Ref.current?.focus();
        }
    }

    const onSubmitHandler = () => {
        navigate('/auth/timer',{ replace: true, state:{name, phoneNumber, regNumber}})
        // return (<Link to={'/auth/timer'} state={{name, phoneNumber, regNumber}}/>)
    }

    const onClickBtnNext = () => {
        setIsTermsModalVisible(true);
    }

    const setInitialize = () => {
        // const prevState:any = location.state;
        // setName(prevState.name);
        // setPhoneNumber(prevState.phoneNumber);
        // setRegNumber(prevState.regNumber.substring(0,6));

    }

    useEffect(()=>{
        if (nameRef.current) {
            nameRef.current.focus();
        }

        if (location.state) {
            setInitialize();
        }
    },[]);

    useEffect(()=>{
        if (name && phoneNumber && regNumber) {
            setIsValidated(true)
        } else {
            setIsValidated(false)
        }
    },[name, phoneNumber, regNumber])

    return (
        <div>
            <div className='form-title'>
                정확한 환급액 조회를 위해 <br/>
                아래 정보가 필요해요!
            </div>

            <div className='form-info'>
                <p>
                    고객님의 정보는 <strong>안전하게 보호</strong>되니<br/>안심하고 입력하세요!
                </p>
                <img alt='authen-icon' src='./authen-icon.png'/>
            </div>

            <div>
                <div className='form-item'>
                    <p>이름</p>
                    <input type='text' name='name' className={`input-bottom-underline ${errorState.name && 'error'}`}
                        maxLength={50}
                        ref={nameRef}
                        onChange={onChangeInputName}
                        onKeyDown={onKeyDownInputName}
                    />
                    {
                        errorState.name ? (
                            <span className='form-error'>{errorState.name}</span>
                        ) : (
                            <span><strong style={{color: '#4394F0'}}>TIP</strong> 닉네임이 아닌 실명인지 확인해주세요.</span>
                        )
                    }
                    
                </div>

                <div className='form-item'>
                    <p>휴대폰 번호</p>
                    <input type='text' name='phoneNumber' className={`input-bottom-underline ${errorState.phoneNumber && 'error'}`}
                        ref={phoneNumberRef}
                        onChange={onChangeInputPhoneNumber}
                        onKeyDown={onKeyDownInputPhoneNumber}
                    />
                    {
                        errorState.phoneNumber && (
                            <span className='form-error'>{errorState.phoneNumber}</span>
                        )
                    }
                </div>

                <div className='form-item'>
                    <p>주민등록번호</p>
                    <div style={{display:'flex'}}>
                        <input type='text' name='jumin1' className={`input-bottom-underline input-half ${errorState.regNumber && 'error'}`}
                            ref={regNumber1Ref}
                            onChange={onChangeInputRegNumber}
                            onKeyDown={onKeyDownInputRegNumber1}
                        /> 
                        <span style={{margin:'0px 15px'}}> - </span> 
                        <input type='password' name='jumin2' className={`input-bottom-underline input-half ${errorState.regNumber && 'error'}`}
                            ref={regNumber2Ref}
                            onChange={onChangeInputRegNumber}
                        />
                    </div>
                    {
                        errorState.regNumber && (
                            <span className='form-error'>{errorState.regNumber}</span>
                        )
                    }
                </div>

                <button className={`button-submit ${isValidated && 'button-active'}`}
                    disabled={!isValidated}
                    onClick={onClickBtnNext}
                >다음</button>
            </div>

            {
                isTermsModalVisible && (
                    <TermsModal onSubmit={onSubmitHandler} onClose={()=>setIsTermsModalVisible(false)}/>
                )
            }
            {/* {
                <Timer/>
            } */}

            {/* {
                <CompletedForm/>
            } */}
        </div>
    )
}