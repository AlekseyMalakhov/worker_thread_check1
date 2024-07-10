function loop1() {
    let res = 0;
    for (var i = 10000000000; i < 20000000000; i++) {
        res = res + i;
    }
    return res;
}
function loop2() {
    let res = 0;
    for (var i = 0; i < 10000000000; i++) {
        res = res + i;
    }
    return res;
}

//this code will run on 1 CPU core

//first loop1
const result1 = loop1();
console.log("result1:", result1); //result1: 149999999990002750000

//and then loop2
const result2 = loop2();
console.log("result2:", result2); //result2: 49999999990067860000
