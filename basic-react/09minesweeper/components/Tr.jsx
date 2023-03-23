const React = require('react');
const {useContext, memo} = require('react');
const {TableContext} = require('../TableContext');
const {Td} = require('./Td');

const Tr = memo(({rowIndex})=>{
    const {tableData} = useContext(TableContext);

    return (
        <tr>
            {tableData[0] &&
                Array(tableData[0].length)
                    .fill()
                    .map((td, i)=>{
                        return (<Td rowIndex={rowIndex} cellIndex={i} />);
                    })
            }
        </tr>
    )
});

exports.Tr = Tr;