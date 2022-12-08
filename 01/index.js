// AoC 2022, Day 01

import { loadData } from '../tools.js';

(() => {
    elfdata().then((data) => {
        var res = data.find(function (o) { return o.total == Math.max(...data.map(o => o.total)); })
        console.log(`Elf ${res.id + 1} has ${res.total}`);
    });
})();

(() => {
    elfdata().then((data) => {
        data.sort((a, b) => b.total - a.total);
        console.log(`Total for top 3 elves is ${data.slice(0, 3).reduce((sum, e) => sum + e.total, 0)}`);
    });
})();

function elfdata() {
    return new Promise((resolve, reject) => {

        loadData('01/input.txt', ' ', '\n').then(data =>
        {
            let elf = 0;
            let elves = [];
    
            data.forEach(element => {
                if (element != '') {
                    if (!elves[elf])
                        elves.push({ id: elf, total: 0 })

                    elves[elf].total = elves[elf].total + parseInt(element);
                }
                else {
                    elf++;
                    elves.push({ id: elf, total: 0 })
                }
            });

            return resolve(elves);
        });
    });
}