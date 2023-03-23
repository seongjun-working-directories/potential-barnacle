const React = require('react');
const {useEffect, useReducer, useCallback} = require('react');
const Table = require('./Table');

// const [state, dispatch] = useReducer(reducer, initialState, lazyInitialize);
// useReducer를 활용하면, state의 개수를 줄일 수 있음
// useReducer는 state가 비동기적으로 바뀜
// 비동기인 state에서 뭔가를 처리하려면, 항상 useEffect를 써야 함

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    recentCell: [-1, -1],
    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('0');
    // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
    // const [recentCell, setRecentCell] = useState([-1, -1]);
};

// reducer 메서드 안에서는 state를 어떻게 바꿀지에 대한 내용이 담겨 있음
const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_WINNER':
            // 리턴문 안에는 state를 어떻게 바꿀지에 대해 기술함
            return {
                ...state,
                winner: action.winner,
            };
        case 'CLICK_CELL': {
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]];
            tableData[action.row][action.cell] = state.turn;

            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell],
            };
        }
        case 'CHANGE_TURN': {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            }
        }
        case 'RESET_TABLE': {
            return {
                ...state,
                turn: 'O',
                tableData: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', '']
                ],
                recentCell: [-1, -1],
            };
        }
        default: 
            return state;
    }
};

const TTT = ()=>{

    const [state, dispatch] = useReducer(reducer, initialState);
    const {winner, tableData, turn, recentCell} = state;
    // 컴포넌트에 넣는 이벤트 함수들은 모두 useCallback 사용을 권장
    // const onClickTable = useCallback(()=>{
        // dispatch 함수의 인자는 action 객체임
        // dispatch 함수는 해당 action을 실행함
        // 즉, dispatch 함수는 설정해놓은 reducer 대로 action을 실행함
        // dispatch({
        //     type: '...', someAttribute: '...', ...
        // });
    // }, []);

    useEffect(()=>{
        const [row, cell] = recentCell;

        // 가장 처음인 경우에는 검사하지 않도록 함
        if (row < 0) { return; }

        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true;
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true;
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true;
        }
        if (tableData[2][0] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
            win = true
        }

        if (win) {
            dispatch({type: 'SET_WINNER', winner: turn});
            dispatch({type: 'RESET_TABLE'});
        }
        else {
            let all = true; // all이 true일 경우, 무승부
            tableData.forEach((row)=>{  // 무승부 검사
                row.forEach((cell)=>{
                    if (!cell) {
                        all = false;
                    }
                });
            });
            if (all) {
                dispatch({type: 'SET_WINNER', winner: null});
                dispatch({type: 'RESET_TABLE'});
            }
            else {
                dispatch({type: 'CHANGE_TURN'});
            }
        }
    }, [recentCell]);

    return (
        <>
            <Table tableData={tableData} dispatch={dispatch}/>
            {winner && <div>{winner} Wins!</div>}
        </>
    );
};

module.exports = TTT;