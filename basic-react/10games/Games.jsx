const React = require('react');
const {Route, Link} = require('react-router-dom');
const {BrowserRouter} = require('react-router-dom');
// const {HashRouter} = require('react-router-dom');
const {GameMatcher} = require('./GameMatcher');

const Games = ()=>{
    
    // 사실 하나의 페이지이며, 여러 페이지를 각기 다른 주소로 사용하는 것처럼 보이도록 하는 것
    return (
        <BrowserRouter>
        {/* <HashRouter></HashRouter> 사용 가능 */}
            <div>
                1. <Link to='/game/number-baseball'>숫자야구</Link>
                <br />
                2. <Link to='/game/rock-paper-scissors'>가위바위보</Link>
                <br />
                3. <Link to='/game/lotto'>로또</Link>
            </div>
            <div>
                {/*
                <Route path='/bulls-and-cows' component={BullsAndCows}/>
                <Route path='/rock-paper-scissors' component={RPS}/>
                <Route path='/lotto' component={Lotto}/>
                위와 같이 라우트가 너무 늘어나면, 문제가 되기 때문에 다음과 같이 동적 매칭을 사용할 수 있음
                */}
                <Route path='/game/:name' component={GameMatcher} />
            </div>
        </BrowserRouter>
    );
}

exports.Games = Games;