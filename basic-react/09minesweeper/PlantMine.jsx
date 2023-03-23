const {CODE} = require('./Code');

const plantMine = (row, cell, mine)=>{
    const candidate = Array(row*cell).fill().map((arr, i)=>{
        return i;
    });
    const shuffle = [];

    while (candidate.length > row*cell-mine) {
        const chosen = candidate.splice(Math.floor(Math.random()*candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    const data = [];
    for (let i=0; i<row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j=0; j<cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    for (let k=0; k<shuffle.length; k++) {
        const y = Math.floor(shuffle[k]/cell);
        const x = shuffle[k] % cell;
        data[y][x] = CODE.MINE;
    }

    return data;
};

exports.plantMine = plantMine;