const React = require('react');
const Tr = require('./Tr');

const Table = ({tableData, dispatch})=>{
    return (
        <table>
            {Array(tableData.length)
                .fill()
                .map((tr, i)=>{
                    return (<Tr key={'tr'+i} dispatch={dispatch}
                        rowIndex={i} rowData={tableData[i]} />);
                })}
        </table>
    );
};

module.exports = Table;