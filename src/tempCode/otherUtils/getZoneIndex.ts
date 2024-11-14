import { Zone } from 'src/types';

export const getZoneIndex = (ind: number): Zone =>
  `zone-${Math.floor(ind / 3)}-${ind % 3}` as Zone;
