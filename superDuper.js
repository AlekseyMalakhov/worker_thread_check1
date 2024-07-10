import workerpool from "workerpool";
import os from "os";
const pool = workerpool.pool();

//get the number of threads for current CPU
const numberOfThreads = os.cpus().length;
//console.log("numberOfThreads:", numberOfThreads);

//we will use all threads - 2. Leave some free threads just in case
const numberOfThreadsWeUse = numberOfThreads - 2;
console.log("numberOfThreadsWeUse:", numberOfThreadsWeUse);

//initial data for a problem
const initialValue = 100000000000;

//amount of problem per thread
const portionPerThread = Math.floor(initialValue / numberOfThreadsWeUse);
console.log("portionPerThread:", portionPerThread);

//initial data for every thread
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
    } else {
        taskValue[0] = start;
        taskValue[1] = initialValue;
    }
    valuesForTasks.push(taskValue);
}

//console.log("valuesForTasks:", valuesForTasks);

//the piece of code for every thread to calculate
const heavyTask = (start, finish) => {
    let res = 0;
    for (let i = start; i <= finish; i++) {
        res = res + 1;
    }

    return res;
};

//task for every thread as a Promise
const tasks = [];
for (let i = 0; i < valuesForTasks.length; i++) {
    const value = valuesForTasks[i];
    const taskPromise = pool.exec(heavyTask, value);
    tasks.push(taskPromise);
}
//console.log("tasks:", tasks);

console.log("Turbo calculating...");

//start solving the problem using multithreading
Promise.all(tasks)
    .then((result) => {
        //console.log(result);
        const sum = result.reduce((a, b) => a + b);
        console.log(sum); //and here is a result
    })
    .catch(function (err) {
        console.error(err);
    })
    .then(function () {
        pool.terminate(); // terminate all workers when done
    });

// const res1 = heavyTask(0, 100);
// console.log("res1:", res1);
