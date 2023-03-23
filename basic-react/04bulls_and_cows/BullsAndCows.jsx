const React = require('react');
const {useState, memo, useRef} = require('react');
const Tries = require('./Tries');

// 랜덤한 숫자 네 개를 반환하는 함수
const getNumbers = ()=>{
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for (let i=0; i<4; i++) {
        const chosen = candidate.splice(Math.floor(Math.random()*(9-i)), 1)[0];
        array.push(chosen);
    }
    return array;
};

let BullsAndCows = ()=>{

    const [strike, setStrike] = useState('0');
    const [ball, setBall] = useState('0');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);
    const inputElement = useRef(null);

    const onSubmitForm = (e)=>{
        e.preventDefault();

        if (value === answer.join('')) {
            setStrike('4');
            setBall('0');
            setTries((prevTries)=>{
                return [...prevTries, {try:value, strike:'4', ball:'0'}];
            });
            alert(`H O M E R U N !`);

            // 다시 세팅
            setStrike('0');
            setBall('0');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);

            inputElement.current.focus();
        }

        else {
            const answerArray = value.split('').map((v)=>parseInt(v));
            let strikes = 0;
            let balls = 0;
            // 10번 이상 실패한 경우
            if (tries.length >= 9) {
                alert(`RESET! The answer was ${answer}`);
                setStrike('0');
                setBall('0');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);

                inputElement.current.focus();
            }
            // 10번 이내의 도전인 경우
            else {
                for (let i=0; i<4; i++) {
                    if (answerArray[i] === answer[i]) {
                        strikes += 1;
                    }
                    else if (answer.includes(answerArray[i])) {
                        balls += 1;
                    }
                }
                setStrike(strikes);
                setBall(balls);
                setTries((prevTries)=>{
                    return [...prevTries, {try: value, strike: strikes, ball: balls}];
                });
                setValue('');
            }
            inputElement.current.focus();
        }
    };

    const onChangeInput = (e)=>{
        setValue(e.target.value);
    };
    
    return (
        <>
            <h1>Bulls and Cows</h1>
            <h3>{strike} STRIKES {ball} BALLS</h3>
            <form onSubmit={onSubmitForm}>
                <input ref={inputElement} maxLength={4} value={value}
                    onChange={onChangeInput} />
                <button type='submit'>Enter</button>
            </form>
            <div>시도 횟수: {tries.length}</div>
            {/*
                배열.map(callback)은 반복문에 사용됨
                map 안에 key는 고유하게 반드시 뭐라도 들어가야 함
                리액트는 key를 보고 같은 컴포넌트인지 확인하므로, key 속성은 고유해야 함
                주의해야 할 점은, 성능의 관점에서 key에 i값(인덱스값)을 넣는 것은 좋은 선택이 아님
                단, 요소를 제거하지 않고 추가만 하는 경우에는 상관 없음    
            */}
            <ul>
                {tries.map((v, i)=>{
                    return (
                        /* 컴포넌트의 속성을 활용해 값을 해당 컴포넌트에 전달할 수 있음 */
                        /* 따로 분리시킨 컴포넌트가 값을 활용하기 위해서는 `this.props.속성명`과 같이 입력 */
                        <Tries key={`${i+1}차 시도`} tries={v} index={i+1} />
                    );
                })}
            </ul>
        </>
    );
};

BullsAndCows = memo(BullsAndCows);

module.exports = BullsAndCows;