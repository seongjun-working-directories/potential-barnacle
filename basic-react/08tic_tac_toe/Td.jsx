const React = require('react');
const {useCallback, memo} = require('react');

const Td = memo(({rowIndex, cellIndex, cellData, dispatch})=>{

    const onClickTd = useCallback(()=>{
        console.log(rowIndex, cellIndex);
        if (cellData) {
            return;
        }
        // 칸을 클릭한 다음,
        dispatch({type: 'CLICK_CELL', row: rowIndex, cell:cellIndex});
        // 턴(차례)을 바꿈
        // dispatch({type: 'CHANGE_TURN'}); -> 비동기 문제 때문에 연달아 쓸 경우 문제 발생

        // useReducer는 비동기적으로 작동하기 때문에
        // dispatch가 비동기적이라고 볼 수 있는데 따라서,
        // 해당 주석 아래에 코드를 써도 위의 dispatch() 메서드보다 먼저 실행될 수 있음
        // ** 따라서, 비동기인 state에서 뭔가를 처리하려면, 항상 useEffect를 써야 함 **
    }, [cellData]);

    return (
        <td onClick={onClickTd}>{cellData}</td>
    );
});

module.exports = Td;