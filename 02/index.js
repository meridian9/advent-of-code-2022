// AoC 2022, Day 02

import { loadData} from '../tools.js'

(() => {
    loadData('02/input.txt',  ' ', '\n').then((data) => {
        let total = 0;
        data.forEach(d => total += Fight(d[1], d[0]), false);
        console.log(`Part 1 result = ${total}`);
    });
})();

(() => {
    loadData('02/input.txt',  ' ', '\n').then((data) => {
        let total = 0;
        data.forEach(d => total += Fight(d[1], d[0], true));
        console.log(`Part 2 result = ${total}`);
    });
})();

function Fight(p, opponent, alternaterules){    
    if (!alternaterules){
        let result = p.charCodeAt(0) - 87;
        result += p == 'X' && opponent == 'A' || p == 'Y' && opponent == 'B' || p == 'Z' && opponent == 'C' ? 3 : 0; 
        result += p == 'X' && opponent == 'C' || p == 'Y' && opponent == 'A' || p == 'Z' && opponent == 'B' ? 6 : 0;
        result += p == 'X' && opponent == 'B' || p == 'Y' && opponent == 'C' || p == 'Z' && opponent == 'A' ? 0 : 0;
        return result;
    } else {
        let result = p == 'X' ? 0 : p == 'Y' ? 3 : 6;
        result += p == 'X' && opponent == 'A' ? 3 : p == 'X' && opponent == 'B' ? 1 : p == 'X' && opponent == 'C' ? 2 : 0;
        result += p == 'Y' && opponent == 'A' ? 1 : p == 'Y' && opponent == 'B' ? 2 : p == 'Y' && opponent == 'C' ? 3 : 0;
        result += p == 'Z' && opponent == 'A' ? 2 : p == 'Z' && opponent == 'B' ? 3 : p == 'Z' && opponent == 'C' ? 1 : 0;
        return result;
    }
}