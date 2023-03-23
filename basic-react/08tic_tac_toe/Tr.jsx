const React = require('react');
const {memo} = require('react');
const Td = require('./Td');

const Tr = memo(({rowData, rowIndex, dispatch})=>{
    return (
        <tr>
            {Array(rowData.length)
                .fill()
                .map((td, i)=>{
                    return (<Td key={'td'+i} dispatch={dispatch}
                        rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>);
                })}
        </tr>
    );
});

module.exports = Tr;