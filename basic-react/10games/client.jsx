const React = require('react');
const ReactDom = require('react-dom');

const {Games} = require('./Games');

ReactDom.render(<Games />, document.querySelector('#root'));