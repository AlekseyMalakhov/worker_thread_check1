import workerpool from "workerpool";

const pool = workerpool.pool();

const heavyTask = (a, b) => {
    let res = 0;
    for (let i = 0; i < a; i++) {
        for (let j = 0; j < b; j++) {
            const sum = i + j;
            res = res + sum;
        }
    }

    return res;
};

// const res1 = heavyTask(100000, 100000);
// console.log("res1:", res1);
// const res2 = heavyTask(100000, 100000);
// console.log("res1:", res2);

pool.exec(heavyTask, [100000, 100000])
    .then(function (result) {
        console.log("result1 = ", result);
    })
    .catch(function (err) {
        console.error(err);
    })
    .then(function () {
        pool.terminate(); // terminate all workers when done
    });
