const React = require('react');
const {useState, useRef} = require('react');

const CheckLatency = ()=>{
    const [status, setStatus] = useState('waiting');
    const [message, setMessage] = useState('Click to start!');
    const [latencyRecords, setLatencyRecords] = useState([]);

    // useRef를 사용해서, useRef의 current 속성 안에 값을 넣어줘야 함
    // useRef를 사용해서 값을 저장하고 변경하면, return 부분의 불필요한 렌더링을 막을 수 있음
    // 즉, 값이 바뀌기는 하지만, 화면에 영향을 미치지 않는 것일 때 사용
    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const calcAvgLatency = (latencyRecords)=>{
        return latencyRecords.reduce((a,c)=>a+c)
            / latencyRecords.length;
    };

    const renderAvgLatency = (latencyRecords)=>{
        return latencyRecords.length === 0
            ? null
            : (
                <>
                    <div>
                        Average Time: {calcAvgLatency(latencyRecords)}ms
                    </div>
                    <button onClick={onReset}>RESET</button>
                </>
            );
    };

    const onReset = ()=>{
        setLatencyRecords([]);
    };

    const onClickScreen = ()=>{
        if (status === 'waiting') {
            setStatus('ready');
            setMessage('Click if the screen becomes green!');
            
            timeout.current = setTimeout(()=>{
                setStatus('now');
                setMessage('Click!');
                startTime.current = new Date();
            }, Math.floor(Math.random()*1000 + 1500));
        }
        else if (status === 'ready') {  // 너무 빨리 클릭한 경우
            // Waiting 상태로 돌아감
            clearTimeout(timeout.current);
            setStatus('waiting');
            setMessage('Click too fast...');
        }
        else if (status === 'now') {    // 반응속도 확인
            endTime.current = new Date();
            setStatus('waiting');
            setMessage('Click to start!');
            setLatencyRecords((prevLatencyRecords)=>{
                return [...prevLatencyRecords, endTime.current-startTime.current];
            });
        }
    };

    return (
        <>
            <div id='screen' className={status}
                onClick={onClickScreen}>
                {message}
            </div>
            {renderAvgLatency(latencyRecords)}
        </>
        /*
        return문 안에서 for문이나 if문을 사용하지 못하는 데,
        react 안에서 중괄호({})를 이용하면 자바스크립트를 쓸 수 있다는 점과,
        jsx에서는 for문과 if문을 쓸 수 없지만,
        함수 안에서는 for문과 if문을 쓸 수 있다는 점을 사용해 for문과 if문을 쓸 수 있음
        이때, 함수는 즉시 실행 함수로 구현하면 됨
        ex1)
        {
            (()=>{
                if (latencyRecords.length === 0) {
                    return null
                }
                else {
                    return (
                        <>
                            <div>
                                Average Time: {calcAvgLatency(latencyRecords)}ms
                            </div>
                            <button onClick={onReset}>RESET</button>
                        </>
                    );
                }
            })();
        }
        ex2)
        {
            (()=>{
                const arr = [];
                for (let i=0; i<tries.length; i++) {
                    arr.push(<Tries key={`{${i+1}차 시도}`} tryInfo={v} />);
                }
                return arr;
            })();
        }
        */
    );
};

module.exports = CheckLatency;