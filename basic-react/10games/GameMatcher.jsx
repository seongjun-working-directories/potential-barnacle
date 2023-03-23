const React = require('react');
const {Component} = require('react');
const BullsAndCows = require('../04bulls_and_cows/BullsAndCows');
const RPS = require('../06rock_paper_scissors/RPS');
const Lotto = require('../07lotto/Lotto');

class GameMatcher extends Component {
    render() {
        if (this.props.match.params.name === 'bulls-and-cows') {
            return <BullsAndCows />;
        }
        else if (this.props.match.params.name === 'rock-paper-scissors') {
            return <RPS />;
        }
        else if (this.props.match.params.name === 'lotto') {
            return <Lotto />;
        }
        return (
            <div>
                일치하는 게임이 없습니다.
            </div>
        );
    }
}

exports.GameMatcher = GameMatcher;