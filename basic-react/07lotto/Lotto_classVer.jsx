const React = require('react');
const {Component} = require('react');
const Ball = require('./BallClassVer');
const {getLottoNumbers} = require('./LottoMethod');

class LottoClassVer extends Component {
    state = {
        lottoNumbers: getLottoNumbers(),
        lottoBalls: [],
        bonus: null,
        redo: false,
    };

    timeouts = [];

    runTimeouts = ()=>{
        const {lottoNumbers} = this.state;
        for (let i=0; i<lottoNumbers.length-1; i++) {
            this.timeouts[i] = setTimeout(()=>{
                this.setState((prevState)=>{
                    return {
                        lottoBalls: [...prevState.lottoBalls, lottoNumbers[i]]
                    };
                });
            }, (i+1)*500);
        }
        this.timeouts[6] = setTimeout(()=>{
            this.setState({
                bonus: lottoNumbers[6],
                redo: true
            });
        }, 3500);
    }

    componentDidMount() {
        this.runTimeouts();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.lottoBalls.length === 0) {
            this.runTimeouts();
        }
    }

    componentWillUnmount() {
        this.timeouts.forEach((v)=>{
            clearTimeout(v);
        });
    }

    onClickRedo = ()=>{
        this.setState({
            lottoNumbers: getLottoNumbers(),
            lottoBalls: [],
            bonus: null,
            redo: false,
        });
        this.timeouts = [];
    }

    render() {
        const {lottoBalls, bonus, redo} = this.state;
        return (
            <>
                <div>Lotto Numbers</div>
                <div id="resultPage">
                    {lottoBalls.map((v)=>{
                        return <BallClassVer key={v} number={v} />;
                    })}
                </div>
                <div>Bonus Number</div>
                {bonus && <BallClassVer number={bonus} />}
                {redo && <button onClick={this.onClickRedo}>Again?</button>}
            </>
        );
    }
}

module.exports = LottoClassVer;