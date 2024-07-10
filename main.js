import workerpool from "workerpool";
import os from "os";
const pool = workerpool.pool();

const numberOfThreads = os.cpus().length;
//console.log("numberOfThreads:", numberOfThreads);

const numberOfThreadsWeUse = numberOfThreads - 2;
console.log("numberOfThreadsWeUse:", numberOfThreadsWeUse);

const initialValue = 10000000000;

const portionPerThread = Math.floor(initialValue / numberOfThreadsWeUse);
console.log("portionPerThread:", portionPerThread);

const valuesForTasks = [];

let start = 0;
let finish = portionPerThread - 1;
for (let i = 0; i < numberOfThreadsWeUse; i++) {
    const taskValue = [];
    if (i !== numberOfThreadsWeUse - 1) {
        taskValue[0] = start;
        taskValue[1] = finish;
        start = finish + 1;
        finish = start + portionPerThread - 1;
        console.log("i = " + i);
        console.log("taskValue:", taskValue);
        console.log("__________");
    } else {
        taskValue[0] = start;
        taskValue[1] = initialValue;
        console.log("i = " + i + " last");
        console.log("taskValue:", taskValue);
    }
    valuesForTasks.push(taskValue);
}

console.log("valuesForTasks:", valuesForTasks);

const heavyTask = (start, finish) => {
    let res = 0;
    for (let i = start; i < finish; i++) {
        res = res + i;
    }

    return res;
};

// const res1 = heavyTask(0, 10000000000);
// console.log("res1:", res1);

/*
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
*/
