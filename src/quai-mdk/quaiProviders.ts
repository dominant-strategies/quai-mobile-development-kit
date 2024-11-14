import { quais } from 'quais';
import { allNodeData } from './nodeData';

export const getProvider = (zone: string) => {
    const nodeData = allNodeData[zone];
    console.log('get RPC provider with url', nodeData.url);
    return new quais.JsonRpcProvider(nodeData.provider);
  };
  
  export const getWebSocketsProvider = (zone: string) => {
    const nodeData = allNodeData[zone];
    console.log('get web socket provider with url', nodeData.url);
    return new quais.WebSocketProvider(nodeData.url);
  };
