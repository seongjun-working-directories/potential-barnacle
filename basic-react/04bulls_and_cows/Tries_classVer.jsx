const React = require('react');
// const {Component} = require('react');
const {PureComponent} = require('react');

// class TriesClassVer extends Component {
class TriesClassVer extends PureComponent {
    render() {
        return (
            <li>
                {/* 다른 컴포넌트로부터 props를 받은 경우, props를 준 컴포넌트가 부모 컴포넌트가 됨 */}
                <div>{this.props.index}차 시도: {this.props.tries.try}</div>
                <div>{this.props.tries.strike} 스트라이크 {this.props.tries.ball} 볼</div>
            </li>
        );
    }
}

module.exports = TriesClassVer;