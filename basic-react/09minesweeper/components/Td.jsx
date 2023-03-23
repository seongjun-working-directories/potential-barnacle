const React = require('react');
const {useContext, useCallback, memo, useMemo} = require('react');
const {TableContext} = require('../TableContext');
const {CODE} = require('../Code');

const getTdStyle = (code)=>{
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#444',
            };
        case CODE.OPENED:
        case CODE.CLICKED_MINE:
            return {
                background: 'white',
            };
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return {
                background: 'red',
            };
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return {
                background: 'yellow',
            };
        default :
            return {
                background: 'white',
            };
    }
};

const getTdText = (code)=>{
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.CLICKED_MINE:
            return 'BOM';
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return '!';
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return '?';
        default:
            return code||'';
    }
};

const Td = memo(({rowIndex, cellIndex})=>{
    const {tableData, dispatch, halted} = useContext(TableContext);

    const onClickTd = useCallback(()=>{
        if (halted) {
            return;
        }
        switch(tableData[rowIndex][cellIndex]) {
            case CODE.OPENED:
            case CODE.FLAG:
            case CODE.FLAG_MINE:
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                return;
            case CODE.NORMAL:
                dispatch({type:'OPEN_CELL', row:rowIndex, cell:cellIndex});
                return;
            case CODE.MINE:
                dispatch({type:'CLICK_MINE', row:rowIndex, cell:cellIndex});
                return;
            default:
                return;
        }
        
    }, [tableData[rowIndex][cellIndex], halted]);

    const onRightClickTd = useCallback((e)=>{
        e.preventDefault(); // 클릭에 걸려있는 기본 설정값을 없앰
        if (halted) {
            return;
        }
        switch(tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({type:'FLAG_CELL', row:rowIndex, cell:cellIndex});
                return;
            case CODE.FLAG:
            case CODE.FLAG_MINE:
                dispatch({type:'QUESION_CELL', row:rowIndex, cell:cellIndex});
                return;
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                dispatch({type:'NORMALIZE_CELL', row:rowIndex, cell:cellIndex});
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex]]);

    return useMemo(()=>(
        <td
            style={getTdStyle(tableData[rowIndex][cellIndex])}
            onClick={onClickTd}
            onContextMenu={onRightClickTd}
        >{getTdText(tableData[rowIndex][cellIndex])}</td>
    ), [tableData[rowIndex][cellIndex]]);
});

exports.Td = Td;