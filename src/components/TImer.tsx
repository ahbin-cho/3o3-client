import React, {useState, useEffect} from 'react';

import './Timer.css';

interface TimerProps {
    mm: number,
    ss: number,
}

export const Timer:React.FC<TimerProps> = (props) => {
    const [minutes, setMinutes] = useState<number>(props.mm);
    const [seconds, setSeconds] = useState<number>(props.ss);

    useEffect(() => {
        const countdown = setInterval(() => {
          if (seconds > 0) {
            setSeconds(seconds - 1);
          }
          if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(countdown);
            } else {
              setMinutes(minutes - 1);
              setSeconds(59);
            }
          }
        }, 1000);
        return () => clearInterval(countdown);
      }, [minutes, seconds]);

    return (
        <div>
            <div className='form-title text-center'>
                카카오 지갑으로<br/>
                간편인증 요청을 보냈습니다
            </div>
            <div className='text-center timer'>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>

            <div className='hr-line'/>

            <div className='timer-info-item'>
                <div className='timer-info-img'>
                    <img alt='timer1' src='./Timer1.png'/>
                </div>
                <div className='timer-info'>
                    <div className='timer-info-title'>01. 카카오톡앱에서</div>
                    <div className='timer-info-description'>지갑 채팅방에서 ‘인증하기’버튼 선택하기</div>
                </div>
            </div>

            <div className='timer-info-item'>
                <div className='timer-info-img'>
                    <img alt='timer1' src='./Timer2.png'/>
                </div>
                <div className='timer-info'>
                    <div className='timer-info-description'>카카오 My 비밀번호 입력하기</div>
                </div>
            </div>

            <div className='timer-info-item'>
                <div className='timer-info-img'>
                    <img alt='timer1' src='./Timer3.png'/>
                </div>
                <div className='timer-info'>
                    <div className='timer-info-title'>02. 삼쩜삼에서</div>
                    <div className='timer-info-description'>아래 인증완료 버튼 선택하면 끝</div>
                </div>
            </div>

            <button className={`button-submit`}
            >인증완료</button>
        </div>
    )
}