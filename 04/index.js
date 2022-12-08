// AoC 2022, Day 04

import { isUppercase, isLowercase, loadData, whatStringIsInBoth, commonCharacters, range, isOneInsideAnother, findOverlaps } from '../tools.js'

(() => {
    loadData('04/input.txt',  ',', '\n').then((data) => { 
        let count = 0;
        data.forEach(element => count = count + (isOneInsideAnother(element[0], element[1]) ? 1 : 0));
        console.log(`Part 1 result: ${count} has jobs that overlap completely.`);
    });
})();

(() => {
    loadData('04/input.txt',  ',', '\n').then((data) => { 
        let count = 0;
        data.forEach(element => count = count + (findOverlaps(element[0], element[1]) ? 1 : 0));
        console.log(`Part 2 result: ${count} overlaps in any way.`)
    });
})();