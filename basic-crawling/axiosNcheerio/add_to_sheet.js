// https://github.com/SheetJS/sheetjs/wiki/General-Utility-Functions
// add_to_sheet.js
const xlsx = require('xlsx');

function range_add_cell(range, cell) {
    var rng = xlsx.utils.decode_range(range);
    var c = typeof cell === 'string' ? xlsx.utils.decode_cell(cell) : cell;
    if (rng.s.r > c.r) rng.s.r = c.r;
    if (rng.s.c > c.c) rng.s.c = c.c;
    
    if (rng.e.r < c.r) rng.e.r = c.r;
    if (rng.e.c < c.c) rng.e.c = c.c;
    return xlsx.utils.encode_range(rng);
}

//함수에 넣을 변수들: sheet, cell, type, raw
module.exports = function add_to_sheet(sheet, cell, type, raw) {
    sheet['!ref'] = range_add_cell(sheet['!ref'], cell);
    sheet[cell] = { t: type, v: raw };
};

/*
add_to_sheet 함수의 변수
sheet - 값을 입력할 시트
cell - 값을 입력할 셀
type - 셀의 타입(일반, 숫자, 통화, 시간 등)
raw - 넣어줄 값
*/