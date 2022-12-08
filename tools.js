import fs from 'fs/promises'

export function loadData (file, fieldDelimiter, lineDelimiter) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8').then((data, err) => {
            if (err) {
                reject(err);
            }

            if (fieldDelimiter != null)
                resolve(data.split(lineDelimiter).map(l => l.trim().split(fieldDelimiter)));
            else
                resolve(data.split(lineDelimiter));

            reject();
        });
    });
}


export function isLowercase(str){
    return str.charCodeAt(0) >= 97 && str.charCodeAt(0) <= 122;
}
    
export function isUppercase(str){
    return str.charCodeAt(0) >= 65 && str.charCodeAt(0) <= 90;
}

export function whatStringIsInBoth(needle, haystack) {
    var count = 0;
    var common = ''

    for(let i in needle) {
        if (haystack.includes(needle[i])) {
            count++;
            return needle[i];
        }
    }

    return common;
}

const MAX_CHAR = 58
 
export function commonCharacters(strings, n) {
     
    let result = [];

    // primary array for common characters
    // we assume all characters are seen before.
    let prim = new Array(MAX_CHAR).fill(true)

    if (!n) n = strings.length;

    // for each strings
    for(let i = 0; i < n; i++){
         
        // secondary array for common characters
        // Initially marked false
        let sec = new Array(MAX_CHAR).fill(false)
 
        // for every character of ith strings
        for(let j = 0; j < strings[i].length; j++){
 
            // if character is present in all
            // strings before, mark it.
            if (prim[strings[i].charCodeAt(j) - ('A').charCodeAt(0)])
                sec[strings[i].charCodeAt(j) - ('A').charCodeAt(0)] = true
        }
 
        // copy whole secondary array
        // into primary
        for(let i = 0; i < MAX_CHAR; i++){
            prim[i] = sec[i]
        }
    }
 
    // displaying common characters
    for(let i = 0; i < MAX_CHAR; i++){
        if (prim[i])
            result.push(String.fromCharCode(i + ('A').charCodeAt(0)));
    }

    return result;
}

export function range(start, end){

    let result = [];
    let i = start;
    while (i <= end) {
        result.push(i++);
    }

    return result;
}

export function isOneInsideAnother(e1,e2){
    let assignment1 = e1.split('-').map(p => parseInt(p));
    let assignment2 = e2.split('-').map(p => parseInt(p));

    if (assignment1[0] <= assignment2[0])
        if (assignment1[1] >= assignment2[1])
            return assignment1;

    if (assignment2[0] <= assignment1[0])
        if (assignment2[1] >= assignment1[1])
            return assignment2;

    return null;
}

export function findOverlaps(e1, e2){
    let assignment1 = e1.split('-').map(p => parseInt(p));
    let assignment2 = e2.split('-').map(p => parseInt(p));

    let range1 = range(assignment1[0], assignment1[1]);
    let range2 = range(assignment2[0], assignment2[1]);

    let biggest = range1.length >= range2.length ? range1 : range2;
    let smallest = biggest == range1 ? range2 : range1;

    let overlap = false;
    for(let i = 0; i < biggest.length; i++){
        if (overlap) break;
        for(let j = 0; j < smallest.length; j++)
            if (biggest[i] == smallest[j])
            {
                overlap = true;
                break;
            }
    }

    return overlap;
}

