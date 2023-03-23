const React = require('react');
const {useReducer, useMemo, createContext, useEffect} = require('react');
const {Table} = require('./components/Table');
const {TableSetting} = require('./components/TableSetting');
const {plantMine} = require('./PlantMine');
const {CODE} = require('./Code');
const {TableContext} = require('./TableContext');

// 최초 상태 설정
const initialState = {
    tableData: [],
    data: { row: 0, cell: 0, mine: 0, },
    timer: 0,
    halted: true,
    result: '',
    openedCount: 0,
};

// state를 어떻게 바꿀지에 대한 내용
const reducer = (state, action)=>{
    switch (action.type) {
        case 'START_GAME':
            return {
                ...state,
                data: {
                    row: action.row,
                    cell: action.cell,
                    mine: action.mine
                },
                openedCount: 0,
                tableData: plantMine(action.row, action.cell, action.mine),
                halted: false,
                timer: 0,
            };

        case 'OPEN_CELL': {
            const tableData = [...state.tableData];
            // tableData[action.row] = [...state.tableData[action.row]];
            // tableData[action.row][action.cell] = CODE.OPENED;
            // 불변성을 위해 모든 칸을 다시 설정
            tableData.forEach((row, i)=>{
                tableData[i] = [...row];
            });

            // 검사된 칸들은 다시 검사하지 않음
            const checked = [];
            let openedCount = 0;

            // 특정 셀 주변에 몇 개의 지뢰가 있는지 알려줌
            const checkAround = (row, cell)=>{
                // 배열 범위를 넘어선 경우
                if (row<0 || row>tableData.length-1 || cell<0 || cell>tableData[0].length-1) {
                    return;
                }

                // 빈칸이 아닌 경우
                if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION]
                    .includes(tableData[row][cell])) {
                    return;
                }

                // 이미 검사한 칸인 경우
                if (checked.includes(row+'/'+cell)) {
                    return;
                }
                else {
                    checked.push(row+'/'+cell);
                }

                let around = [
                    tableData[row][cell-1], tableData[row][cell+1],
                ];
                if (tableData[row-1]) {
                    around = around.concat(
                        tableData[row-1][cell-1],
                        tableData[row-1][cell],
                        tableData[row-1][cell+1]
                    );
                }
                if (tableData[row+1]) {
                    around = around.concat(
                        tableData[row+1][cell-1],
                        tableData[row+1][cell],
                        tableData[row+1][cell+1]
                    )
                }

                const count = around.filter((v)=>{
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
                }).length;

                if (count === 0) {
                    if (row > -1) {
                        const near = [];
                        if (row-1 > -1) {
                          near.push([row-1, cell-1]);
                          near.push([row-1, cell]);
                          near.push([row-1, cell+1]);
                        }
                        near.push([row, cell-1]);
                        near.push([row, cell+1]);
                        if (row + 1 < tableData.length) {
                          near.push([row+1, cell-1]);
                          near.push([row+1, cell]);
                          near.push([row+1, cell+1]);
                        }
                        near.forEach((n) => {
                            if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                                checkAround(n[0], n[1]);
                            }
                        });
                    }
                }
                
                if (tableData[row][cell] === CODE.NORMAL) {
                    openedCount += 1;
                }
                tableData[row][cell] = count;
            };

            checkAround(action.row, action.cell);

            let halted = false;
            let result = '';
            if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {
                halted = true;
                result = 'WIN!!';
            }
            
            return {
                ...state,
                tableData,
                openedCount: state.openedCount + openedCount,
                halted,
                result,
            };
        }

        case 'CLICK_MINE': {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return {
                ...state,
                tableData,
                halted: true,
            };
        }

        case 'FLAG_CELL': {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.MINE) {
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            }
            else {
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return {
                ...state,
                tableData,
            };
        }

        case 'QUESION_CELL': {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            }
            else {
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData,
            };
        }

        case 'NORMALIZE_CELL': {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
                tableData[action.row][action.cell] = CODE.MINE;
            }
            else {
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData,
            };
        }

        case 'INCREMENT_TIMER': {
            return {
                ...state,
                timer: state.timer + 1,
            };
        }

        default:
            return state;
    }
};

// const [state, dispatch] = useReducer(reducer, initialState, lazyInitialize);
const Minesweeper = ()=>{
    const [state, dispatch] = useReducer(reducer, initialState);
    const {tableData, halted, timer, result} = state;
    const value = useMemo(()=>{
        // dispatch는 항상 같은 값으로 유지됨
        return { tableData, halted, dispatch };
    }, [tableData, halted]);

    useEffect(()=>{
        let timer;
        if (halted === false) {
            timer = setInterval(()=>{
                dispatch({type: 'INCREMENT_TIMER'});
            }, 1000);
        }
        return ()=>{
            clearInterval(timer);
        };
    }, [halted]);

    // TableContext.Provider로 묶어줘야 그 아래 컴포넌트에서 데이터에 접근 가능
    // (자식 컴포넌트에 바로 전달할) 데이터는 TableContext.Provider의 value 속성에 넣어줌
    return (
        <TableContext.Provider value={value}>
            <TableSetting />
            <div>경과시간: {timer}초</div>
            <Table />
            <div>{result}</div>
        </TableContext.Provider>
    );
};

exports.Minesweeper = Minesweeper;