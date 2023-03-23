const React = require('react');
const {useState, useRef, useEffect, useMemo, useCallback} = require('react');
const Ball = require('./Ball');
const {getLottoNumbers} = require('./LottoMethod');
// 성능 최적화를 위해 연산된 값을 useMemo라는 Hook을 이용해 재사용 가능
// useMemo는 값을 기억하지만, useCallback은 함수 자체를 기억하고 있음

const Lotto = () => {
    // Hooks 선언 시에는 순서를 잘 지켜야 하며,
    // 조건문 또는 함수에 의한 선언은 절대 안됨
    
    // useMemo는 두 번째 인자로 들어간 배열의 요소가 바뀌면 재실행
    // 즉, useMemo는 복잡한 함수 결과값을 기억하고, useRef는 일반 값을 기억
    const randomNumbers = useMemo(()=>{
        return getLottoNumbers();
    }, []);
    const [lottoNumbers, setLottoNumbers] = useState(randomNumbers);
    const [lottoBalls, setLottoBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    const onClickRedo = useCallback(()=>{
        setLottoNumbers(getLottoNumbers());
        setLottoBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }, [lottoNumbers]);

    // useEffect의 두 번째 인자가 빈 배열이면 componentDidMount()와 같음
    // 두 번째 인자의 배열에 요소가 있다면 componentDidMount(), componentDidUpdate() 모두 수행
    useEffect(()=>{
        for (let i=0; i<lottoNumbers.length-1; i++) {
            timeouts.current[i] = setTimeout(()=>{
                setLottoBalls((prevLottoBalls)=>{
                    return [...prevLottoBalls, lottoNumbers[i]];
                })
            }, (i+1)*700);
        }
        timeouts.current[6] = setTimeout(()=>{
            setBonus(lottoNumbers[6]);
            setRedo(true);
        }, 4900);

        // componentWillUnmount()는 리턴 안에 들어감
        return ()=>{
            timeouts.current.forEach((v)=>{
                clearTimeout(v);
            });
        };
    }, [timeouts.current]);

    return (
        <>
            <div>Lotto Numbers</div>
            <div id="resultPage">
                {lottoBalls.map((v)=>{
                    return <Ball key={v} number={v} />;
                })}
            </div>
            <div>Bonus Number</div>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={onClickRedo}>Again?</button>}
        </>
    );
}

module.exports = Lotto;