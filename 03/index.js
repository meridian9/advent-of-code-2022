// AoC 2022, Day 03

import { isUppercase, isLowercase, loadData, whatStringIsInBoth, commonCharacters } from '../tools.js'

(() => {
    loadData('03/input.txt',  null, '\n').then((data) => {
        let res = 0;
        data.forEach(items => {
            res += ExamineBackpack(items[0])
        });

        console.log(`Part 1 result = ${res}`);
    });
})();

(() => {
    var groups = [];
    var i = 1;
    loadData('03/input.txt',  '', '\n').then((data) => { 

        var group = { backpacks : [] }
        
        data.forEach(element => {
            group.backpacks.push(element);
            
            if (i == 3)
            {
                group.result = ExamineBackpackForBadge(group.backpacks);
                groups.push(group);
                group = { backpacks : [ ] }
                i = 1;
                return;
            }

            i++;
        });

        console.log(`Part 2 result = ${groups.map(g => g.result.priority).reduce((sum, e) => sum + e)}`);
    });
})();

function ExamineBackpackForBadge(backpacks){

    let results = commonCharacters(backpacks.map(b => b.join('')));
    let result;
    
    if (results[0]){
        if (isUppercase(results[0])) result = results[0].charCodeAt(0) - 64 + 26;
        if (isLowercase(results[0])) result = results[0].charCodeAt(0) - 96;
    }

    return { priority: result, item: results[0] };;
}

function ExamineBackpack(contents){
    let res = whatStringIsInBoth(contents.substring(0, contents.length / 2), contents.substring(contents.length / 2));
    let result = 0;
    
    if (isUppercase(res)) result = res.charCodeAt(0) - 64 + 26;
    if (isLowercase(res)) result = res.charCodeAt(0) - 96;

    return  result;
}