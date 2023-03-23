const React = require('react');
const {useState, useRef, useEffect} = require('react');

const rpsCoords = { Rock: '0', Scissors: '-136px', Paper: '-280px' };
const scores = { Rock: 1, Scissors: 0, Paper: -1 };
const computerChoice = (imgCoord)=>{
    return Object.entries(rpsCoords)
        .find((v)=>v[1]===imgCoord)[0];
};

// React Hooks에 라이프사이클은 없지만, 흉내는 낼 수 있음
const RPS = ()=>{
    const [result, setResult] = useState('');
    const [score, setScore] = useState(0);
    const [imgCoord, setImgCoord] = useState(rpsCoords.Rock);
    const interval = useRef();

    const runHand = ()=>{
        if (imgCoord === rpsCoords.Rock) {
            setImgCoord(rpsCoords.Scissors);
        }
        else if (imgCoord === rpsCoords.Scissors) {
            setImgCoord(rpsCoords.Paper);

        }
        else if (imgCoord === rpsCoords.Paper) {
            setImgCoord(rpsCoords.Rock);
        }
    };

    const onClickBtn = (choice)=>()=>{
        clearInterval(interval.current);

        const myScore = scores[choice];
        const computerScore = scores[computerChoice(imgCoord)];
        const diff = myScore - computerScore;
        if (diff === 0) {
            setResult('비겼습니다');
        }
        else if ([-1, 2].includes(diff)) {
            setResult('졌습니다');
            setScore((prevScore)=>prevScore - 1);
        }
        else {
            setResult('이겼습니다');
            setScore((prevScore)=>prevScore + 1);
        }

        setTimeout(()=>{
            interval.current = setInterval(runHand, 100);
        }, 1000);
    };

    // 클래스 라이프 사이클의 REACT Hooks 버전 : useEffect
    useEffect(()=>{ // componentDidMount, componentDidUpdate 역할

        interval.current = setInterval(runHand, 100);

        return () => {  // componentWillUnmount 역할
            clearInterval(interval.current);
        }

    }, [imgCoord]);
    // 두 번째 인수 배열에 넣은 값들이 바뀔 때 useEffect가 실행되도록 함

    return (
        <>
            <div id='computer' style={{background: `url(./public/img/RPS_IMG.jpg) ${imgCoord} 0`}}></div>
            <div>
                <button id='rock' className='btn' onClick={onClickBtn('Rock')}>Rock</button>
                <button id='scissors' className='btn' onClick={onClickBtn('Scissors')}>Scissors</button>
                <button id='paper' className='btn' onClick={onClickBtn('Paper')}>Paper</button>
            </div>
            <div>{result}</div>
            <div>현재 점수: {score}</div>
        </>
    );
};

module.exports = RPS;