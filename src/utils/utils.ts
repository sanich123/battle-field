export function parseReceivedData(receivedData: ArrayBuffer) {
  return JSON.parse(receivedData.toString());
}
