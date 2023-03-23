const React = require('react');
const {Component} = require('react');

/*
클래스 라이프 사이클
constructor -> render -> ref -> componentDidMount
-> {`setState`/`props갸 바뀔때`} -> shouldComponentUpdate -> render -> componentDidUpdate
-> 상위 컴포넌트에서 하위 컴포넌트 삭제 시 componentWillUnmount -> 소멸
*/

const rpsCoords = { Rock: '0', Scissors: '-136px', Paper: '-280px' };
const scores = { Rock: 1, Scissors: 0, Paper: -1 };
const computerChoice = (imgCoord)=>{
    return Object.entries(rpsCoords)
        .find((v)=>v[1]===imgCoord)[0];
};
// Object.keys(obj) – 객체의 키만 담은 배열을 반환합니다.
// Object.values(obj) – 객체의 값만 담은 배열을 반환합니다.
// Object.entries(obj) – [키, 값] 쌍을 담은 배열을 반환합니다.

class RPSClassVer extends Component {
    state = {
        result: '',
        score: 0,
        imgCoord: '0',
    };

    interval;

    runHand = ()=>{
        const {imgCoord} = this.state;

        if (imgCoord === rpsCoords.Rock) {
            this.setState({
                imgCoord: rpsCoords.Scissors
            });
        }
        else if (imgCoord === rpsCoords.Scissors) {
            this.setState({
                imgCoord: rpsCoords.Paper
            });
        }
        else if (imgCoord === rpsCoords.Paper) {
            this.setState({
                imgCoord: rpsCoords.Rock
            });
        }
    };

    /*
    [componentDidMount()]
    render 함수가 렌더링이 되면 컴포넌트(또는 jsx)가 특정 순간에 DOM에 달라붙음
    해당 순간에 특정한 동작을 하도록 만들 수 있음
    componentDidMount()는 처음 render() 함수가 실행되었을 때 할 동작을 지정할 수 있음
    그 후 리렌더링 상황에서는 compoenentDidMount()가 실행되지 않음
    */
    componentDidMount() {
        // componentDidMount()로 비동기 `요청`을 많이 함
        this.interval = setInterval(this.runHand, 100);
    }
    
    /*
    [componentDidUpdate()]
    render 함수가 재호출되어 리렌더링될 때 실행될 내용을 담음
    */
    // componentDidUpdate() { }

    /*
    [componentWillMount()]
    컴포넌트가 제거되기 직전 특정한 동작을 하도록 만들 수 있음
    상위 컴포넌트가 해당 컴포넌트를 지울 경우 지우기 전에 실행
    */
    componentWillUnmount() {
        // componentWillUnmount()로 비동기 `요청 정리`를 많이 함
        clearInterval(this.interval);
    }

    // 고차 함수
    // onClick={()=>this.onClickBtn('Rock')} --> onClickBtn=(choice)=>{...}
    // onClick={this.onClickBtn('Rock')} --> onClickBtn=(choice)=>()=>{...}
    onClickBtn = (choice)=>()=>{
        clearInterval(this.interval);

        const {imgCoord} = this.state;
        const myScore = scores[choice];
        const computerScore = scores[computerChoice(imgCoord)];
        const diff = myScore - computerScore;
        if (diff === 0) {
            this.setState({
                result: '비겼습니다',
            });
        }
        else if ([-1, 2].includes(diff)) {
            this.setState((prevState)=>{
                return {
                    result: '졌습니다',
                    score: prevState.score - 1,
                };
            });
        }
        else {
            this.setState((prevState)=>{
                return {
                    result: '이겼습니다',
                    score: prevState.score + 1,
                }
            });
        }

        setTimeout(()=>{
            this.interval = setInterval(this.runHand, 100);
        }, 1000);
    };

    render() {
        const {result, score, imgCoord} = this.state;
        return (
            <>
                <div id='computer' style={{background: `url(./public/img/RPS_IMG.jpg) ${imgCoord} 0`}}></div>
                <div>
                    <button id='rock' className='btn' onClick={this.onClickBtn('Rock')}>Rock</button>
                    <button id='scissors' className='btn' onClick={this.onClickBtn('Scissors')}>Scissors</button>
                    <button id='paper' className='btn' onClick={this.onClickBtn('Paper')}>Paper</button>
                </div>
                <div>{result}</div>
                <div>현재 점수: {score}</div>
            </>
        );
    }
}

module.exports = RPSClassVer;

/*
[setInterval 함수]
일정한 시간 간격으로 작업을 수행하기 위해서 사용합니다.
clearInterval 함수를 사용하여 중지할 수 있습니다.
주의할 점은 일정한 시간 간격으로 실행되는 작업이
그 시간 간격보다 오래걸릴 경우 문제가 발생할 수 있습니다.
*/