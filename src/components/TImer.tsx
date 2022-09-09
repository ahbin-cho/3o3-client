import moment from 'moment';
import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { EasySignRequest } from '../utils/request.module';
import './Timer.css';

export const Timer:React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);

    const getExpiredTimer = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/v1/easysign/request',
            {
                method:'POST'
            });
            const document:EasySignRequest = await response.json();
            const {data} = document;
            const {startedAt, expiredAt} = data;
            
            const subTime = moment.duration(moment(expiredAt).diff(startedAt));

            // setMinutes(subTime.minutes());
            // setSeconds(subTime.seconds());

            setMinutes(1);
            setSeconds(subTime.seconds());
        } catch (e:any) {
            console.error(e.message);
        }
    }

    const errorMessageAlert = (s: string, type: string) => {
        if (type === 'retry') {
            if (window.confirm(s)) {
                getExpiredTimer();
            } else {
                navigate('/',{replace:true, state:location.state});
            }
        } else {
            if (window.confirm(s)) {
                navigate('/',{replace:true, state:location.state});
            } 
        }
        
    }

    const onClickBtnCompleted = () => {
        if (minutes === 0 && seconds === 0) {
            errorMessageAlert(`인증 요청시간이 지났습니다.\n간편인증을 다시 시도해주세요.`, 'retry')
        } else {
            fetchAuthComplete();
        }
    }

    const fetchAuthComplete = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/v1/easysign/complete',
            {
                method:'POST',
                headers: {
                    'content-type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify(location.state)
            });

            const document:EasySignRequest = await response.json();

            if (document.ok) {

            } else {
                const {message} = document.error;
                errorMessageAlert(message,'');
            }

        } catch (e:any) {
            console.log(e)
        }
    }

    useEffect(() => {
        getExpiredTimer();
    }, []);

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
            <div className={`text-center timer ${(minutes===0 && seconds <= 10) && 'timer-end'}`}>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>

            <div className='hr-line'/>

            <div className='timer-info-item'>
                <div className='timer-info-img'>
                    <img alt='timer1' src='/Timer1.png'/>
                </div>
                <div className='timer-info'>
                    <div className='timer-info-title'>01. 카카오톡앱에서</div>
                    <div className='timer-info-description'>지갑 채팅방에서 ‘인증하기’버튼 선택하기</div>
                </div>
            </div>

            <div className='timer-info-item'>
                <div className='timer-info-img'>
                    <img alt='timer1' src='/Timer2.png'/>
                </div>
                <div className='timer-info'>
                    <div className='timer-info-description'>카카오 My 비밀번호 입력하기</div>
                </div>
            </div>

            <div className='timer-info-item'>
                <div className='timer-info-img'>
                    <img alt='timer1' src='/Timer3.png'/>
                </div>
                <div className='timer-info'>
                    <div className='timer-info-title'>02. 삼쩜삼에서</div>
                    <div className='timer-info-description'>아래 인증완료 버튼 선택하면 끝</div>
                </div>
            </div>

            <button className='button-submit button-active'
                onClick={onClickBtnCompleted}
            >인증완료</button>
        </div>
    )
}