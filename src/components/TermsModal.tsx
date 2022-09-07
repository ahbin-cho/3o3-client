import './TermsModal.css';

export const TermsModal = () => {
    return (
        <div className='modal-wrapper'>
            <div className='modal-inner'>
                <div className='agree-all'>
                    <input type="checkbox" id="all-check"/>
                    <label htmlFor='all-check'> 약관에 모두 동의</label>
                </div>
                <div className='agree-item'>
                    <input type='checkbox' id='check1'/>
                    <label htmlFor='check1'> [필수] 개인정보 이용 동의</label>
                </div>
                <div className='agree-item'>
                    <input type='checkbox' id='check2'/>
                    <label htmlFor='check2'> [필수] 서비스 이용 약관 동의</label>
                </div>
                <div className='agree-item'>
                    <input type='checkbox' id='check3'/>
                    <label htmlFor='check3'> [필수] 고유식별정보 처리 동의</label>
                </div>
                <div className='agree-item'>
                    <input type='checkbox' id='check4'/>
                    <label htmlFor='check4'> [필수] 제3자 정보제공 동의</label>
                </div>

                <div>
                    <button className='button-agree'>동의하고 간편인증 하기</button>
                </div>
            </div>
        </div>
    )
}