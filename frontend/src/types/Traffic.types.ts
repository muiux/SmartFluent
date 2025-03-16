export interface TrafficHistory {
    pageUrl: string;
    count: number
}

export interface Anomaly {
    isAnomaly: boolean,
    timestamp: string,
}

export interface AnomalyData {
    message: string,
    anomalies?: Anomaly[],
}