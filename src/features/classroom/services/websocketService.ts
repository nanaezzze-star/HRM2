export const WS_URL = "wss://ws.ifelse.io";

let ws: WebSocket | null = null; // hold the single active connection

export const createWebSocket = (): WebSocket => {
  //create a new WebSocket connection or returns the active one
  if (ws?.readyState === WebSocket.OPEN) {
    return ws;
  }

  ws = new WebSocket(WS_URL);
  return ws;
};

export const getWebSocket = (): WebSocket | null => {
  return ws;
};

export const closeWebSocket = () => {
  //close active connection
  if (ws) {
    ws.close();
    ws = null;
  }
};
