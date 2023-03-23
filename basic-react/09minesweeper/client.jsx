const React = require('react');
const ReactDom = require('react-dom');

const {Minesweeper} = require('./Minesweeper');

ReactDom.render(<Minesweeper />, document.querySelector('#root'));