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

//this code will run using 2 CPU cores simultaneously

//loop1 on one core
pool.exec(loop1, [])
    .then(function (result) {
        console.log("result1:", result);
    })
    .catch(function (err) {
        console.error(err);
    })
    .then(function () {
        pool.terminate(); // terminate all workers when done
    });

//and loop2 on another core
pool.exec(loop2, [])
    .then(function (result) {
        console.log("result2: ", result);
    })
    .catch(function (err) {
        console.error(err);
    })
    .then(function () {
        pool.terminate(); // terminate all workers when done
    });
