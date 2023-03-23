const React = require('react');
const {useState, useRef} = React;

const WordChain = ()=>{
    const [word, setWord] = useState('시작');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onSubmitForm = (e)=>{
        e.preventDefault();
        if (word[word.length-1] === value[0]) {
            setResult('Right Answer');
            setWord(value);
            setValue('');
            inputRef.current.focus();
        }
        else {
            setResult('Try Again');
            setValue('');
            inputRef.current.focus();
        }
    };
    
    const onChangeInput = (e)=>{
        setValue(e.target.value);
    };

    return (
        <>
            <div>{word}</div>
            <form onSubmit = {onSubmitForm}>
                <label htmlFor='enterButton'>Input words.</label>
                <input ref={inputRef} value={value} onChange={onChangeInput} />
                <button id='enterButton' className='enterButton'>Enter</button>
            </form>
            <div>{result}</div>
        </>
    );
};

module.exports = WordChain;