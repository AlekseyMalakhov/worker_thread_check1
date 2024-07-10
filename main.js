import { Worker } from "worker_threads";

const worker = new Worker("./worker.js", { workerData: { num: 5 } });

const heavyTask = () => {
    let res = 0;
    for (let i = 0; i < 100000; i++) {
        for (let j = 0; j < 100000; j++) {
            const sum = i + j;
            res = res + sum;
        }
    }

    console.log(res);
};

heavyTask();

worker.on("message", (result) => {
    console.log("square of 5 is :", result);
});

worker.on("error", (msg) => {
    console.log(msg);
});
