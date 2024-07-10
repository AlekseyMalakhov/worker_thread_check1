import { parentPort, workerData } from "worker_threads";

const result = workerData.num * 2;

parentPort.postMessage(result);
