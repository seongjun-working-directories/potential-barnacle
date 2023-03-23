const React = require('react');
const ReactDom = require('react-dom');

const BullsAndCows = require('./BullsAndCows');

ReactDom.render(<BullsAndCows />, document.querySelector('#root'));