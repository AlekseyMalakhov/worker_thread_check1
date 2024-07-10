import workerpool from "workerpool";

const pool = workerpool.pool();

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

const res1 = loop1();
console.log("res1:", res1);

const res2 = loop2();
console.log("res2:", res2);
