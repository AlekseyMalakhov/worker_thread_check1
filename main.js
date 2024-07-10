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

    console.log(res);
};
