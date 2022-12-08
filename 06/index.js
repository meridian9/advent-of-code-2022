// AoC 2022, Day 06

import { loadData } from "../tools.js";

(() => {
    loadData('06/input.txt', null, '\n').then(data => {
        for(let i = 0; i < data[0].length; i++){
            if (checkForUniqueness(data[0], i, 4) != null){
                console.log(`Part 1 result is ${i}`);
                break;
            }
        }
    });
})();

(() => {
    loadData('06/input.txt', null, '\n').then(data => {
        for(let i = 0; i < data[0].length; i++){
            if (checkForUniqueness(data[0], i, 14) != null){
                console.log(`Part 2 result is ${i}`);
                break;
            }
        }
    });
})();

function checkForUniqueness(data, i, length){
    if (i < length) return null;

    var result = [...data.substring(i - length, i)].reduce((a, e) => { a[e] = a[e] ? a[e] + 1 : 1; return a }, {}); 
    if (Object.keys(result).length == length)
        return i;

    return null;
}