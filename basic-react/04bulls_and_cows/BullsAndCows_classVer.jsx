const React = require('react');
// const {Component, Fragment, createRef} = require('react');
const {PureComponent, Fragment, createRef} = require('react');
const TriesClassVer = require('./Tries_classVer');

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

// class BullsAndCowsClassVer extends Component {
class BullsAndCowsClassVer extends PureComponent {
    state = {
        strike: '0', ball: '0',
        value:  '',     // 추측한 값
        answer: getNumbers(),   // 실제 정답
        tries: [],
        // React는 예전 state와 현재 state가 다를 경우 렌더링을 하기 때문에,
        // state의 배열에 push를 하면 변화를 감지 못함
        // 따라서, tries: [...this.state. tries, {...}]와 같이 참조를 변경해야 함
    }

    onSubmitForm = (e)=>{
        e.preventDefault();
        const {value, answer, tries} = this.state;

        if (value === answer.join('')) {
            // 현재 설정된 state로 이제부터 설정할 state를 세팅하려면,
            // prevState를 활용해야 함
            this.setState((prevState)=>{
                return {
                    tries: [...prevState.tries, {
                        try: value, strike: '4', ball: '0', value: ''
                    }],
                };
            });
            alert(`H O M E R U N !`);
            this.setState({
                strike: '0', ball:'0',
                value: '',
                answer: getNumbers(),
                tries: [], 
            });
            this.inputRef.current.focus();
        }

        else {
            const answerArray = value.split('').map((v)=>parseInt(v));
            let strikes = 0;
            let balls = 0;
            // 10번 이상 실패한 경우
            if (tries.length >= 9) {
                alert(`RESET! The answer was ${this.state.answer}`);
                this.setState({
                    strike: '0', ball: '0',
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
                this.inputRef.current.focus();
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
                this.setState((prevState)=>{
                    return {
                        strike: strikes,
                        ball: balls,
                        tries: [...prevState.tries, {
                            try: value,
                            strike: strikes,
                            ball: balls,
                        }],
                        value: '',
                    };
                });
            }
            this.inputRef.current.focus();
        }
    };

    onChangeInput = (e)=>{
        this.setState({value: e.target.value});
    };

    inputRef = createRef();

    render() {
        const {strike, ball, value, tries} = this.state;
        return (
            <Fragment>
                <h1>Bulls and Cows</h1>
                <h3>{strike} STRIKES {ball} BALLS</h3>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.inputRef} maxLength={4} value={value}
                        onChange={this.onChangeInput} />
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
                            <TriesClassVer key={`${i+1}차 시도`} tries={v} index={i+1} />
                        );
                    })}
                </ul>
            </Fragment>
        );
    }
}

module.exports = BullsAndCowsClassVer;

/*
노드 모듈 시스템 기준 (1)과 (2)는 같은 코드
(1) module.exports = {hello:'a'};
(2) exports.hello = 'a';
그리고 브라우저 문법 기준으로 (3) 또한 같은 코드
(3) export const hello = 'a';
*/