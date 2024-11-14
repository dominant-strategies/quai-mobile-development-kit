import { generateSecureRandom } from 'react-native-securerandom';
import buffer from 'buffer';
import { pKeyT } from './types';

export function isUniq(arr: any): boolean {
    return arr.length === new Set(arr).size;
  }

export async function generatePKey () {

      let privKey: Uint8Array = await generateSecureRandom(32);
      while (!isUniq(privKey)) {
        privKey = await generateSecureRandom(32);
      }
    const encodedPrivKey = buffer.Buffer.from(privKey).toString('hex');
    let keyObject:pKeyT = {
        pKey: privKey,
        encodedPKey: encodedPrivKey
    }
    return keyObject;
}