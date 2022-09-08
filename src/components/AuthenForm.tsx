import moment from 'moment';
import React,{useState, useRef,useEffect} from 'react';
import { validateFullRegNo, validateName, validatePhoneNumber } from '../utils/validationUtil';

import './AuthenForm.css';
import { CompletedForm } from './CompletedForm';
import { TermsModal } from './TermsModal';
import { Timer } from './TImer';

interface ErrorState {
    name?:string,
    phoneNumber?:string,
    juminNumber?:string,
}

interface EasySignRequest {
    ok: boolean,
    data: {
        expiredAt:string,
        startedAt:string,
    }
}
export const AuthenForm:React.FC = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);
    const juminNumber1Ref = useRef<HTMLInputElement>(null);
    const juminNumber2Ref = useRef<HTMLInputElement>(null);

    const [name, setName] = useState<string>();
    const [phoneNumber, setPhoneNumber] = useState<number>();
    const [juminNumber, setJuminNumber] = useState<number>();

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
            setPhoneNumber(Number(inputValue));
            setErrorState(prevState=>{return({...prevState, phoneNumber:''})})
        }
    }

    const onKeyDownInputPhoneNumber = (e:React.KeyboardEvent<HTMLInputElement>) => {
        const { keyCode } = e;
        if ( keyCode === 13 ) {
            juminNumber1Ref.current?.focus();
        }
    }

    const onChangeInputJuminNumber = (e:React.ChangeEvent<HTMLInputElement>) => {
        const inputValueJumin1 = juminNumber1Ref.current?.value;
        const inputValueJumin2 = juminNumber2Ref.current?.value;

        const jumin = (inputValueJumin1||'') + (inputValueJumin2||'');

        if (!validateFullRegNo(jumin || '')) {
            setJuminNumber(undefined);
            setErrorState(prevState=>{return({...prevState, juminNumber:'올바른 주민등록번호를 입력해주세요'})});
        } else {
            setJuminNumber(Number(jumin));
            setErrorState(prevState=>{return({...prevState, juminNumber:''})})
        }
    }

    const onKeyDownInputJuminNumber1 = (e:React.KeyboardEvent<HTMLInputElement>) => {
        const { keyCode } = e;
        if ( keyCode === 13 ) {
            juminNumber2Ref.current?.focus();
        }
    }

    const onSubmitHandler = async () => {
        console.log(name, phoneNumber, juminNumber)

        try {
            const response = await fetch('http://localhost:3001/api/v1/easysign/request',
            {
                method:'POST'
            });
            const document:EasySignRequest = await response.json();
            const {data} = document;
            const {startedAt, expiredAt} = data;
            
            const subTime = moment.duration(moment(expiredAt).diff(startedAt));

            setMinutes(subTime.minutes());
            setSeconds(subTime.seconds());
        } catch (e:any) {
            console.error(e.message);
        }
    }

    const onClickBtnNext = () => {
        setIsTermsModalVisible(true);
    }

    useEffect(()=>{
        if (nameRef.current) {
            nameRef.current.focus();
        }
    },[]);

    useEffect(()=>{
        if (name && phoneNumber && juminNumber) {
            setIsValidated(true)
        } else {
            setIsValidated(false)
        }
    },[name, phoneNumber, juminNumber])

    return (
        <div>
            {/* <div className='form-title'>
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
                        <input type='text' name='jumin1' className={`input-bottom-underline input-half ${errorState.juminNumber && 'error'}`}
                            ref={juminNumber1Ref}
                            onChange={onChangeInputJuminNumber}
                            onKeyDown={onKeyDownInputJuminNumber1}
                        /> 
                        <span style={{margin:'0px 15px'}}> - </span> 
                        <input type='password' name='jumin2' className={`input-bottom-underline input-half ${errorState.juminNumber && 'error'}`}
                            ref={juminNumber2Ref}
                            onChange={onChangeInputJuminNumber}
                        />
                    </div>
                    {
                        errorState.juminNumber && (
                            <span className='form-error'>{errorState.juminNumber}</span>
                        )
                    }
                </div>

                <button className={`button-submit ${isValidated && 'button-active'}`}
                    disabled={!isValidated}
                    onClick={onClickBtnNext}
                >다음</button>
            </div> */}

            {
                isTermsModalVisible && (
                    <TermsModal onSubmit={onSubmitHandler} onClose={()=>setIsTermsModalVisible(false)}/>
                )
            }
            {/* {
                <Timer mm={minutes} ss={seconds}/>
            } */}

            {
                <CompletedForm/>
            }
        </div>
    )
}