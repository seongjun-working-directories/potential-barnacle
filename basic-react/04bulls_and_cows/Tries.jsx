const React = require('react');
const {memo} = require('react');

/*
const Tries = (props)=>{
    return (
        <li>
            <div>{props.index}차 시도: {props.tries.try}</div>
            <div>{props.tries.strike} 스트라이크 {props.tries.ball} 볼</div>
        </li>
    );
}
*/

const Tries = memo((props)=>{
    /*
    props는 부모 컴포넌트에서만 바꿀 수 있음
    props.strike += 1; 과 같은 코드를 여기에 쓸 수 없음
    그런데 props를 어쩔 수 없이 바꿔야 하는 경우 다음과 같이 사용
    const [strike, setStrike] = useState(props.tries.strike);
    const onClick = ()=>{ setStrike('1'); } 등과 같이 변경
    그리고, <div onClick={onClick}> 안에서 {props.tries.strike}를 strike와 같이 변경
    */
    // 정리: props를 변경하고자 하는 경우, props를 state로 만든 후 그 state를 바꿔야 함
    return (
        <li>
            <div>{props.index}차 시도: {props.tries.try}</div>
            <div>{props.tries.strike} 스트라이크 {props.tries.ball} 볼</div>
        </li>
    );
});

module.exports = Tries;