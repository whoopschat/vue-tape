/* eslint-disable */
const multipage = require('vue3-multipage')
module.exports = multipage.create('./src', './' , (filename) => {
    let arr = filename.split('-');
    arr.shift();
    arr.pop();
    return arr.join('-');
})