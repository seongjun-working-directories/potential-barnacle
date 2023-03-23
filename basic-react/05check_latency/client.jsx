const React = require('react');
const ReactDom = require('react-dom');

const CheckLatency = require('./CheckLatency');

ReactDom.render(<CheckLatency />, document.querySelector('#root'));