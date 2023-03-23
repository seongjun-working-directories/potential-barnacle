const React = require('react');
const {useContext, memo} = require('react');
const {TableContext} = require('../TableContext');
const {Tr} = require('./Tr');

const Table = memo(()=>{
    const {tableData} = useContext(TableContext);
    
    return (
        <table>
            {Array(tableData.length).fill().map((tr, i)=><Tr rowIndex={i} />)}
        </table>
    );
});

exports.Table = Table;