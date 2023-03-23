const React = require('react');
const {Component} = React;

// client.jsx에 모든 컴포넌트를 넣을 경우,
// 가독성이 나빠지기 때문에 이와 같이 컴포넌트를 분리.
// 단, 이때 꼭 react 패키지를 import 해줘야 함.

const MultiTable = ()=>{

    // state(상태) 초기값 설정
    const [firstNum, setFirstNum] = React.useState(Math.ceil(Math.random()*19));
    const [secondNum, setSecondNum] = React.useState(Math.ceil(Math.random()*19));
    const [value, setValue] = React.useState('');
    const [result, setResult] = React.useState('');

    // ref의 달라진 사용방법
    const inputRef = React.useRef(null);

    const onChangeInput = (e)=>{
        // setValue는 value라는 상태(state)를 Setting할 때 사용
        setValue(e.target.value);
    }

    const onSubmitForm = (e)=>{
        e.preventDefault();
        if (parseInt(value) === firstNum * secondNum) {
            setResult(
                `Right Answer! `
                + `${firstNum} * ${secondNum} = ${value}`
            );
            setFirstNum(Math.ceil(Math.random()*19));
            setSecondNum(Math.ceil(Math.random()*19));
            setValue('');
            // ref의 달라진 사용 방법
            // React Hooks에서는 직접 DOM에 접근하는 것이 아닌 useRef()를 통해 DOM에 접근
            inputRef.current.focus();
        }
        else {
            setResult('Try Again');
            setValue('');
            inputRef.current.focus();
        }
    }

    return (
        <React.Fragment>
            <div>
                {firstNum} * {secondNum} =
            </div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} type='number' value={value}
                    onChange={onChangeInput} />
                <button type='submit'>Enter</button>
            </form>
            <div>{result}</div>
        </React.Fragment>
    );
};

module.exports = MultiTable;