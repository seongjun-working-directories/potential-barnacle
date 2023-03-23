const React = require('react');
const {Component} = require('react');

class CheckLatencyClassVer extends Component {
    state = {
        status: 'waiting',  // waiting, ready, now
        message: 'Click to start!',
        latencyRecords: [],
    };

    calcAvgLatency = (latencyRecords)=>{
        return latencyRecords.reduce((a,c)=>a+c)
            / latencyRecords.length;
    };

    // latencyRecords가 빈 배열일 때는 reduce 연산이 이뤄질 수 없음
    renderAvgLatency = (latencyRecords)=>{
        return latencyRecords.length === 0
            ? null
            : (
                <>
                    <div>
                        Average Time: {this.calcAvgLatency(latencyRecords)}ms
                    </div>
                    <button onClick={this.onReset}>RESET</button>
                </>
            );
    };

    onReset = ()=>{
        this.setState({
            latencyRecords: [],
        });
    };

    // 너무 빨리 눌렀을 경우, Waiting 상태로 돌아감
    timeout;
    startTime;
    endTime;

    onClickScreen = ()=>{
        const {status, message, latencyRecords} = this.state;
        if (status === 'waiting') {
            this.setState({
                status:'ready',
                message: 'Click if the screen becomes green!',
            });
            this.timeout = setTimeout(()=>{
                this.setState({
                    status: 'now',
                    message: 'Click!',
                });
                this.startTime = new Date();
            }, Math.floor(Math.random()*1000 + 1500));
        }
        else if (status === 'ready') {  // 너무 빨리 클릭한 경우
            clearTimeout(this.timeout);
            this.setState({
                status: 'waiting',
                message: 'Click too fast...',
            });
        }
        else if (status === 'now') {    // 반응속도 확인
            this.endTime = new Date();
            this.setState((prevState)=>{
                return {
                    status: 'waiting',
                    message: 'Click to start!',
                    latencyRecords: [
                        ...prevState.latencyRecords, this.endTime-this.startTime
                    ],
                };
            });
        }
    };

    render() {
        const {status, message, latencyRecords} = this.state;
        // render의 return 안에서 for문과 if문을 사용할 수 없기 때문에 대안 필요
        return (
            <>
                <div id='screen' className={status}
                    onClick={this.onClickScreen}>
                    {message}
                </div>
                {this.renderAvgLatency(latencyRecords)}
            </>
        );
    }
}

module.exports = CheckLatencyClassVer;