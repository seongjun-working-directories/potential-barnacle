const React = require('react');
const {memo} = require('react');

// Hooks가 아닌 함수 컴포넌트 : 상태(state)를 사용하지 않기 때문
const Ball = memo(({number})=>{
    let background;
    if (number <= 10) { background = 'red'; }
    else if (number <= 20) { background = 'orange'; }
    else if (number <= 30) { background = 'yellow'; }
    else if (number <= 40) { background = 'blue'; }
    else { background = 'green'; }

    return (
        <div className='ball' style={{background}}>
            {number}
        </div>
    );
});

module.exports = Ball;