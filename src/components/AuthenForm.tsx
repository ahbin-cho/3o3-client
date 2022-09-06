import React,{useState, useRef,useEffect} from 'react';
import { validateName } from '../utils/validationUtil';

import './AuthenForm.css';

interface ErrorState {
    name?:string,
    phoneNumber?:string,
    juminNumber?:string,
}

export const AuthenForm:React.FC = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);

    const [name, setName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<number>();
    const [juminNumber1, setJuminNumber1] = useState<number>();
    const [juminNumber2, setJuminNumber2] = useState<number>();

    const [errorState, setErrorState] = useState<ErrorState>({});

    const onChangeInputName = (e:React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = nameRef.current?.value;

        if (!validateName(inputValue || '')) {
            setErrorState(prevState=>{return({...prevState, name:'올바른 이름을 입력해주세요'})});
        } else {
            setErrorState(prevState=>{return({...prevState, name:''})})
        }

    }

    const onKeyDownInputName = (e:React.KeyboardEvent<HTMLInputElement>) => {
        const { keyCode } = e;
        if ( keyCode === 13 ) {
            phoneNumberRef.current?.focus();
        }
    }

    const onSubmitHandler = (e:React.FormEvent) => {
        e.preventDefault();
    }

    useEffect(()=>{
        if (nameRef.current) {
            nameRef.current.focus();
        }
    },[]);

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

            <form onSubmit={onSubmitHandler}>
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
                    <input type='text' name='phoneNumber' className='input-bottom-underline'
                        ref={phoneNumberRef}
                    />
                </div>

                <div className='form-item'>
                    <p>주민등록번호</p>
                    <div style={{display:'flex'}}>
                        <input type='text' name='jumin1' className='input-bottom-underline input-half'/> 
                        <span style={{margin:'0px 15px'}}> - </span> 
                        <input type='text' name='jumin2' className='input-bottom-underline input-half'/>
                    </div>
                </div>

                <button type='submit' className='button-submit'>다음</button>
            </form>
        </div>
    )
}