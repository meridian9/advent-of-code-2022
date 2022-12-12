// AoC 2022, Day 07

import { loadData, isNumber } from "../tools.js";

class Directory{
    constructor(name, parent){
        this.name = name;
        this.parent = parent;
        this.entries = [];
        this.isDirectory = true;
    }

    addFile(name, size){
        this.entries.push(new File(name, size));
    }

    addDirectory(name){
        let d = new Directory(name, this);
        this.entries.push(d);

        return d;
    }

    goUp(){
        return this.parent;
    }

    findDirectory(name){
        var inthisdir = this.entries.filter(e => e.name == name);
    
        if (inthisdir.length == 1)
            return inthisdir[0];
        else {
            for(let i = 0; i < this.entries.length; i++){ 
                if (this.entries[i].hasOwnProperty('isDirectory') && this.entries[i].isDirectory)
                    return this.entries[i].findDirectory(name);
            }
        }
    }

    getSize(){
        let result = 0;
        this.entries.forEach(e => {
            if (e.isDirectory)
                result += e.getSize();
            else{
                result += e.size;  
            }
        });

        return result;
    }
}

class File{
    constructor(name, size){
        this.name = name;
        this.size = parseInt(size);
    }
}


let root;
let pwd;

(() => {
    root = new Directory("root");
    pwd = root;

    loadData('07/input.txt', null, '\n').then(data => {
        data.forEach(pathElement => {
            process(pathElement.trim().split(' '));
        });

        let result = walkDirectories(root);
        console.log(`Part 1 answer is ${result.map(d => d.size).filter(d => d <= 100000).reduce((sum, i) => sum + i)}`);
    });
})();

(() => {
    root = new Directory("root");
    pwd = root;

    loadData('07/input.txt', null, '\n').then(data => {

        data.forEach(pathElement => {
            process(pathElement.trim().split(' '));
        });

        var needed = 30000000 - (70000000 - root.getSize());
        let result = walkDirectories(root)
            .sort((a, b) => a.size < b.size ? 1 : a.size > b.size ? -1 : 0)
            .filter(d => d.size >= needed)
            .reduce((prev, curr) => prev.size < curr.size ? prev : curr);

        console.log(`Part 2 answer is '${result.name}, ${result.size}'`)
    });
})();

function process(elements){
    [ lsElement, isInput ].forEach(f => f(elements));
}

function isInput(elements){
    if (elements[0] == '$') [ changeDir ].forEach(f => f(elements));
}

function changeDir(path){
    if (path[0] == '$' && path[1] == 'cd'){
        if (path[2] == '/') 
            pwd = root;
        else if(path[2] ==  '..')
            pwd = pwd.parent;
        else{
            var x = pwd.entries.filter(e => e.name == path[2]);
            if (x.length == 0)
                pwd = pwd.addDirectory(path[2]);
            else
                pwd = x[0];
        }
    }
}

function lsElement(path){
    if (path[0] != '$'){
        if (path[0] == 'dir') pwd.addDirectory(path[1]);
        if (isNumber(path[0])) pwd.addFile(path[1], path[0]);
    }
}

function walkDirectories(start){
    let results = [];
    let n = start.getSize();
    results.push( { name: start.name, size: n });

    if (start.entries.length > 0){
        for(let i = 0; i < start.entries.length; i++){
            if (start.entries[i].hasOwnProperty('isDirectory') && start.entries[i].isDirectory) {
                results = results.concat(walkDirectories(start.entries[i]));
            }
        }
    }

    return results;
}