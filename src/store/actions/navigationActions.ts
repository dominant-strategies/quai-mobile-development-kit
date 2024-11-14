/*
 * Reducer actions related with navigation
 */
import {RootNavigator} from 'src/navigation/utils';

export function navigateToHome(params: any) {
  RootNavigator.goHome();
}

export function navigateToNameAndPFP(params: any){
  RootNavigator.nameAndPFP();
}
