import './CompletedForm.css';

export const CompletedForm:React.FC = () => {
    return (
        <div> 
            <div className='completed-form-upper'>
                <img alt='completed' src='./completed.png'/>
                <div className="completed-title">인증 완료</div>
                <div>본인인증이 완료되었습니다.</div>
            </div>
            <div className="completed-container basic-info">
                <div>기본 정보</div>
                <div>
                    <div>이름</div>
                    <div></div>
                </div>
                <div>
                    <div>휴대폰 번호</div>
                    <div></div>
                </div>
                <div>
                    <div>주민등록번호</div>
                    <div></div>
                </div>
            </div>
            <div className="completed-container detail-info">
                <div>상세 정보</div>
                <div>
                    <div>이미 낸 세금</div>
                    <div></div>
                </div>
                <div>
                    <div>돌려받을 세금</div>
                    <div></div>
                </div>
            </div>
            <div className="completed-container cash-info">
                <div>환급액 입금 안내</div>
                <div>
                    <div>관할 세무서</div>
                    <div></div>
                </div>
                <div>
                    <div>연락처</div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}