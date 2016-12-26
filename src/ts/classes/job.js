import { jobStats } from '../constants/job-stats';

function getJobStats(job){
    let stats;

    stats = jobStats[job];

    if (stats === null) {
        console.error(`Unknown job: ${job}`);
    }

    return stats;
}

export class Job {
    constructor(jobName) {
        let stats;

        stats = getJobStats(jobName);

        this.name = jobName;
        this.strength = stats.strength;
        this.vitality = stats.vitality;
        this.agility = stats.agility;
        this.intelligence = stats.intelligence;
    }
}
