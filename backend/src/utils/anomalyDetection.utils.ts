import * as tf from "@tensorflow/tfjs-node";
import { TrafficStats } from "../types/traffic.types";

// Normalize the data using MinMaxScaler (you can implement this using any scaling technique)
class MinMaxScaler {
  fit(data: number[]) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    return { min, max };
  }

  transform(data: number[], { min, max }: { min: number; max: number }) {
    return data.map((value) => (min === max ? 0 : (value - min) / (max - min)));
  }
}

const calculatePercentile = (tensor: tf.Tensor, percentile: number): number => {
  const values = tensor.arraySync() as number[]; // Convert tensor to a regular array
  values.sort((a, b) => a - b); // Sort in ascending order

  const index = Math.floor((percentile / 100) * values.length); // Calculate the index for the desired percentile
  return values[index];
};

export const detectAnomalies = async (data: TrafficStats[]) => {
  // Extract the visit counts and prepare them for anomaly detection
  const visitCounts = data.map((row) => row.count as number); // Ensure visit_count exists in the data

  const scaler = new MinMaxScaler();
  const { min, max } = scaler.fit(visitCounts);
  const scaledData = scaler.transform(visitCounts, { min, max });

  // Prepare the data for anomaly detection (time window of 24, for example)
  const windowSize = 24;
  const X: number[][] = [];
  const y: number[] = [];

  for (let i = 0; i < scaledData.length - windowSize; i++) {
    X.push(scaledData.slice(i, i + windowSize));
    y.push(scaledData[i + windowSize]);
  }

  if (X.length === 0 || y.length === 0) {
    console.warn("Insufficient data for training.");
    return [];
  }

  // Convert to tensors
  const X_tensor = tf.tensor2d(X);
  const y_tensor = tf.tensor1d(y);

  // Build the autoencoder model
  const model = tf.sequential();
  model.add(
    tf.layers.dense({
      units: 64,
      activation: "relu",
      inputShape: [X_tensor.shape[1]],
    })
  );
  model.add(tf.layers.dropout({ rate: 0.2 }));
  model.add(tf.layers.dense({ units: 1, activation: "linear" }));

  model.compile({ optimizer: "adam", loss: "meanSquaredError" });

  // Train the model
  await model.fit(X_tensor, y_tensor, {
    epochs: 50,
    batchSize: 32,
    validationSplit: 0.2,
  });

  // Make predictions and calculate reconstruction errors
  const predictions = model.predict(X_tensor) as tf.Tensor;
  const reconstructionError = predictions.sub(y_tensor).square().mean(-1); // MSE across all features

  // Detect anomalies (e.g., errors greater than the 95th percentile)
  const threshold = calculatePercentile(reconstructionError, 95);
  const anomalyIndices = reconstructionError.greater(threshold);

  // Get the anomaly indices as a boolean array
  const anomalyIndicesArray: boolean[] = Array.from(
    anomalyIndices.dataSync() as unknown as number[] // Cast to unknown and then to number[]
  ).map((value) => value === 1); // Convert numerical values to boolean

  // Return anomalies in a structured format
  return anomalyIndicesArray
    .map((isAnomaly: boolean, index: number) => {
      return {
        isAnomaly,
        timestamp: data[index + windowSize]?.visitDate || "Unknown", // Adjust if necessary
      };
    })
    .filter((result: { isAnomaly: boolean }) => result.isAnomaly); // Filter only the anomalies
};
