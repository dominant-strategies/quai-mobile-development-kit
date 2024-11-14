import { RegionT, ZoneT } from './types';

export enum ShardNameT {
  PRIME = 'Prime',
  CYPRUS = 'Cyprus',
  PAXOS = 'Paxos',
  HYDRA = 'Hydra',
  CYPRUS01 = 'Cyprus-01',
  CYPRUS02 = 'Cyprus-02',
  CYPRUS03 = 'Cyprus-03',
  PAXOS01 = 'Paxos-01',
  PAXOS02 = 'Paxos-02',
  PAXOS03 = 'Paxos-03',
  HYDRA01 = 'Hydra-01',
  HYDRA02 = 'Hydra-02',
  HYDRA03 = 'Hydra-03',
}

const shardNameUrlMap: Record<ShardNameT, string> = {
  [ShardNameT.PRIME]: 'prime',
  [ShardNameT.CYPRUS]: 'cyprus',
  [ShardNameT.PAXOS]: 'paxos',
  [ShardNameT.HYDRA]: 'hydra',
  [ShardNameT.CYPRUS01]: 'cyprus1',
  [ShardNameT.CYPRUS02]: 'cyprus2',
  [ShardNameT.CYPRUS03]: 'cyprus3',
  [ShardNameT.PAXOS01]: 'paxos1',
  [ShardNameT.PAXOS02]: 'paxos2',
  [ShardNameT.PAXOS03]: 'paxos3',
  [ShardNameT.HYDRA01]: 'hydra1',
  [ShardNameT.HYDRA02]: 'hydra2',
  [ShardNameT.HYDRA03]: 'hydra3',
};

const shardNamePortMap: Record<ShardNameT, string> = {
  [ShardNameT.PRIME]: 'prime',
  [ShardNameT.CYPRUS]: 'cyprus',
  [ShardNameT.PAXOS]: 'paxos',
  [ShardNameT.HYDRA]: 'hydra',
  [ShardNameT.CYPRUS01]: '9200',
  [ShardNameT.CYPRUS02]: '9201',
  [ShardNameT.CYPRUS03]: '9202',
  [ShardNameT.PAXOS01]: '9220',
  [ShardNameT.PAXOS02]: '9221',
  [ShardNameT.PAXOS03]: '9222',
  [ShardNameT.HYDRA01]: '9240',
  [ShardNameT.HYDRA02]: '9241',
  [ShardNameT.HYDRA03]: '9242',
};

export const zoneShardNameMap: Record<ZoneT, ShardNameT> = {
  [ZoneT['zone-0-0']]: ShardNameT.CYPRUS01,
  [ZoneT['zone-0-1']]: ShardNameT.CYPRUS02,
  [ZoneT['zone-0-2']]: ShardNameT.CYPRUS03,
  [ZoneT['zone-1-0']]: ShardNameT.PAXOS01,
  [ZoneT['zone-1-1']]: ShardNameT.PAXOS02,
  [ZoneT['zone-1-2']]: ShardNameT.PAXOS03,
  [ZoneT['zone-2-0']]: ShardNameT.HYDRA01,
  [ZoneT['zone-2-1']]: ShardNameT.HYDRA02,
  [ZoneT['zone-2-2']]: ShardNameT.HYDRA03,
};

export interface NodeDataT {
  url: string;
  provider: string;
  name: ShardNameT;
}

export interface AllNodeDataT {
  [key: string]: NodeDataT;
}

const getNodeDataContentFromShardName = (shardName: ShardNameT): NodeDataT => ({
 // url: `wss://rpc.${shardNameUrlMap[shardName]}.colosseum.quaiscan.io/ws`,
 // example url: `ws://rpc.sandbox.quai.network${shardNamePortMap[shardName]}`
// example proviver: `http://rpc.sandbox.quai.network:${shardNamePortMap[shardName]}`
// url: `ws://35.239.198.205:8611/`,
  url: `ws://rpc.sandbox.quai.network:${shardNamePortMap[shardName]}`,
  provider: `http://rpc.${shardNameUrlMap[shardName]}.colosseum.quaiscan.io`,
  name: shardName,
});

const zoneNodeData = (Object.keys(ZoneT) as ZoneT[]).reduce(
  (acc, zone) => ({
    ...acc,
    [zone]: getNodeDataContentFromShardName(zoneShardNameMap[zone]),
  }),
  {} as Record<RegionT, NodeDataT>,
);

export const allNodeData: AllNodeDataT = {
  prime: getNodeDataContentFromShardName(ShardNameT.PRIME),
  'region-0': getNodeDataContentFromShardName(ShardNameT.CYPRUS),
  'region-1': getNodeDataContentFromShardName(ShardNameT.PAXOS),
  'region-2': getNodeDataContentFromShardName(ShardNameT.HYDRA),
  ...zoneNodeData,
};