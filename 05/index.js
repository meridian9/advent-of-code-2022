// AoC 2022, Day 05

// pseudocode
/*
[F]         [L]     [M]            
[T]     [H] [V] [G] [V]            
[N]     [T] [D] [R] [N]     [D]    
[Z]     [B] [C] [P] [B] [R] [Z]    
[M]     [J] [N] [M] [F] [M] [V] [H]
[G] [J] [L] [J] [S] [C] [G] [M] [F]
[H] [W] [V] [P] [W] [H] [H] [N] [N]
[J] [V] [G] [B] [F] [G] [D] [H] [G]
 1   2   3   4   5   6   7   8   9 

start at top, for each row
- start at 1 
- take box
- insert into LILO queue for 
- skip 4 chars, inc queue number
- repeat

just add to dictionary, then reverse the dictionary?
*/
import { loadData } from '../tools.js';

(() => {
    loadData('05/input.txt', null, '\n').then(data => {

        let queueCount = 9;
        let queue = loadQueues(data, queueCount);
        let commands = parseCommands(data);

        executeMovements(queue, commands);

        let result = '';
        for (let n = 1; n <= queueCount; n++)
            result = result + queue[`queue_${n}`].pop();

        console.log(`Part 1 result is '${result}'`);
    });
})();

(() => {
    loadData('05/input.txt', null, '\n').then(data => {

        let queueCount = 9;
        let queue = loadQueues(data, queueCount, true);
        let commands = parseCommands(data);

        executeMovements(queue, commands, true);

        let result = '';
        for (let n = 1; n <= queueCount; n++)
            result = result + queue[`queue_${n}`].pop();

        console.log(`Part 2 result is '${result}'`);
    });
})();

function loadQueues(data, queueCount) {
    let queuenumber = 1;
    let queue = {};

    for (let i = 1; i <= queueCount; i++) queue[`queue_${i}`] = [];

    for (let linePos = 0; linePos < 8; linePos++) {
        queuenumber = 1;
        for (let queuePos = 1; queuePos <= data[linePos].length; queuePos += 4) {
            let entry = data[linePos][queuePos] != ' ' ? data[linePos][queuePos] : null;
            if (entry != null) queue[`queue_${queuenumber.toString()}`].splice(0, 0, entry);
            queuenumber++;
        }
    }

    return queue;
}

function parseCommands(data) {
    let instructions = [];
    data = data.splice(10);
    data.forEach(l => {
        let x = l.trim().split(' ');
        instructions.push({ qty: parseInt(x[1]), src: parseInt(x[3]), dst: parseInt(x[5]) }
        );
    });

    return instructions;
}

function executeMovements(queue, commands, maxAtOnce = null) {
    commands.forEach(c => {
        if (!maxAtOnce) {
            for (let i = 0; i < c.qty; i++) {
                let box = queue[`queue_${c.src}`].pop();
                queue[`queue_${c.dst}`].push(box);
            }
        } else {
            let tempQueue = [];

            //console.log(`Src Before: ${queue[`queue_${c.src}`]}`)
            
            for (let i = 0; i < c.qty; i++) 
                tempQueue.push(queue[`queue_${c.src}`].pop());
                //console.log(`Src After: ${queue[`queue_${c.src}`]}`)

            //console.log(`Temp: ${tempQueue}`);
            //console.log(`Dst Before: ${queue[`queue_${c.dst}`]}`)
            for (let i = 0; i < c.qty; i++) 
                queue[`queue_${c.dst}`].push(tempQueue.pop());
            //console.log(`Dst After: ${queue[`queue_${c.dst}`]}`)
        }
    });
}