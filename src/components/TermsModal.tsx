import React, {useState, useEffect} from 'react';

import './TermsModal.css';

interface TermsModalProps {
    onSubmit:()=>void;
    onClose:()=>void;
}

export const TermsModal:React.FC<TermsModalProps> = (props) => {
    
    const [allCheck, setAllCheck] = useState<boolean>(false);
    const [identiCheck, setIdentiCheck] = useState<boolean>(false);
    const [useCheck, setUseCheck] = useState<boolean>(false);
    const [idCheck, setIdCheck] = useState<boolean>(false);
    const [infoCheck, setInfoCheck] = useState<boolean>(false);
    
    const [isValid, setIsValid] = useState<boolean>(false);

    const onBtnAllCheck = () => {
        if (allCheck) {
            setIdentiCheck(false);
            setUseCheck(false);
            setIdCheck(false);
            setInfoCheck(false);
        } else {
            setIdentiCheck(true);
            setUseCheck(true);
            setIdCheck(true);
            setInfoCheck(true);
        }
    }

    const onBtnIdentiCheck = () => {
        setIdentiCheck((prevCheck)=>!prevCheck);
    }

    const onBtnUseCheck = () => {
        setUseCheck((prevCheck)=>!prevCheck);
    }

    const onBtnIdCheck = () => {
        setIdCheck((prevCheck)=>!prevCheck);
    }

    const onBtnInfoCheck = () => {
        setInfoCheck((prevCheck)=>!prevCheck);
    }

    const onClickMaskClose = (e:React.MouseEvent<HTMLElement>) => {
        if (e.currentTarget === e.target) {
            props.onClose();
        }
    }

    useEffect(()=>{
        if( identiCheck && useCheck && idCheck && infoCheck ){
            setAllCheck(true);
            setIsValid(true);
        } else {
            setAllCheck(false);
            setIsValid(false);
        }
    }, [identiCheck, useCheck, idCheck, infoCheck])

    return (
        <div className='modal-wrapper'
            onClick={onClickMaskClose}
        >
            <div className='modal-inner'>
                <div className='agree-all'>
                    <input type="checkbox" id="all-check" checked={allCheck} onChange={onBtnAllCheck}/>
                    <label htmlFor='all-check'> ????????? ?????? ??????</label>
                </div>
                <div className='agree-item'>
                    <input type='checkbox' id='check1' checked={identiCheck} onChange={onBtnIdentiCheck}/>
                    <label htmlFor='check1'> [??????] ???????????? ?????? ??????</label>
                </div>
                <div className='agree-item'>
                    <input type='checkbox' id='check2' checked={useCheck} onChange={onBtnUseCheck}/>
                    <label htmlFor='check2'> [??????] ????????? ?????? ?????? ??????</label>
                </div>
                <div className='agree-item'>
                    <input type='checkbox' id='check3' checked={idCheck} onChange={onBtnIdCheck}/>
                    <label htmlFor='check3'> [??????] ?????????????????? ?????? ??????</label>
                </div>
                <div className='agree-item'>
                    <input type='checkbox' id='check4' checked={infoCheck} onChange={onBtnInfoCheck}/>
                    <label htmlFor='check4'> [??????] ???3??? ???????????? ??????</label>
                </div>

                <div>
                    <button className={`button-agree ${ isValid && 'button-active'}`}
                        onClick={props.onSubmit}
                        disabled={!isValid}
                    >???????????? ???????????? ??????</button>
                </div>
            </div>
        </div>
    )
}