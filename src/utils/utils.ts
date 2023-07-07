import { AddressInfo } from "ws";

export function parseReceivedData(receivedData: ArrayBuffer) {
  return JSON.parse(receivedData.toString());
}

export function getStatisticInfo(
  connections: number,
  ip: string | undefined,
  address: AddressInfo | string,
) {
  console.log(`Now we have ${connections} connections. ${ip}`, address);
}
