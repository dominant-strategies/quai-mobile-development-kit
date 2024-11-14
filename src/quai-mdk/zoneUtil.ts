import { Zone, quais } from "quais";
import { ZoneT } from "./types";

export function stringToZone(zoneAsString: string){
    const zn = zoneAsString as unknown as ZoneT;
    const zoneT = ZoneT[zn];
    return zoneT;
}

export function zoneToString(zoneAsZone: ZoneT){
    const zoneAsStr = zoneAsZone.toString()
    return zoneAsStr
}

export function defaultZone(){
    const DEFAULT_ZONE: Zone = quais.Zone.Cyprus1;
    return DEFAULT_ZONE;
}

