const React = require('react');
const {Component} = React;

class WordChainClassVer extends Component {
    state = {
        word: '시작',
        value: '',
        result: '',
    };

    onSubmitForm = (e)=>{
        e.preventDefault();
        if (this.state.word[this.state.word.length-1] === this.state.value[0]) {
            this.setState({
                result: 'Right Answer!',
                word: this.state.value,
                value: '',
            });
            this.input.focus();
        }
        else {
            this.setState({
                result: 'Try Again',
                value: '',
            });
            this.input.focus();
        }
    };

    onChangeInput = (e)=>{
        this.setState({value: e.target.value});
    };

    onRefInput = (c)=>{
        this.input = c;
    };


    render() {
        return (
            <>
                <div>{this.state.word}</div>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.onRefInput} value={this.state.value}
                        onChange={this.onChangeInput} />
                    <button type='submit'>Enter</button>
                </form>
                <div>{this.state.result}</div>
            </>
        );
    }
}

module.exports = WordChainClassVer;