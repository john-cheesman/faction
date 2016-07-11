import { Stats } from './stats';
import { jobStats } from '../config';

function getJobStats(job){
    let stats;

    stats = jobStats[job];

    if (stats == null) {
        console.error(`Unknown job: ${job}`);
    }

    return stats;
}

export class Job {
    constructor(job) {
        this.name = job;
        this.stats = new Stats(getJobStats(job));
    }
}
