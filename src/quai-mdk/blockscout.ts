import { allNodeData } from './nodeData';
import { quais } from 'quais';
import { ZoneT } from './types';
import { getStartTimestamp, Timeframe } from './dateUtil';
import { Zone } from '../types';

export type TransactionList = {
  message: string;
  result: Transaction[];
  status: string;
};

export type Recipient = {
  display: string;
  profilePicture?: string;
};

export type Transaction = {
  recipient: Recipient;
  blockHash: string;
  blockNumber: string;
  confirmations: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  from: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  hash: string;
  input: string;
  isError: string;
  nonce: string;
  timeStamp: string;
  to: string;
  transactionIndex: string;
  txreceipt_status: string;
  value: string;
  fiatAmount: number;
  quaiAmount: number;
};

type TransactionConfig = {
  sort?: string;
  page?: number;
  offset?: number;
  selectedTimeframe?: Timeframe;
  filterBy?: string;
};

export const getAccountTransactions = ({
  address,
  config,
  quaiRate,
  zone,
}: {
  address: string;
  config?: TransactionConfig;
  quaiRate: number;
  zone: ZoneT;
}): Promise<TransactionList> => {
  return new Promise(async (resolve, reject) => {
    const nodeData = allNodeData[zone];
    const startTimestamp =
      config?.selectedTimeframe && getStartTimestamp(config.selectedTimeframe);

    // Get the URL for the API
    const url =
      `${nodeData.provider.replace(
        'rpc.',
        '',
      )}/api?module=account&action=txlist&address=${address}` +
      `${config?.sort ? `&sort=${config.sort}` : ''}` +
      `${config?.page ? `&page=${config.page}` : ''}` +
      `${config?.offset ? `&offset=${config.offset}` : ''}` +
      `${startTimestamp ? `&start_timestamp=${startTimestamp}` : ''}` +
      `${config?.filterBy ? `&filter_by=${config.filterBy}` : ''}`;

    var myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => {
        const transactions: TransactionList = JSON.parse(result);
        transactions.result = transactions.result.map(transaction => {
          return {
            ...transaction,
            fiatAmount:
              Number(quais.formatQuai(transaction.value)) *
              1,
            quaiAmount: Number(quais.formatQuai(transaction.value)),
          };
        });
        resolve(transactions);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const getBalance = async (address: string, zone: Zone): Promise<any> => {
  console.log('get balance called');
  let resJson;
  try {
    resJson = await getBalanceFromBlockscout(address, zone);
    console.log('resJson', resJson);
    if (resJson.error === 'Balance not found') {
      return getBalanceFromNode(address, zone);
    } else {
      return resJson.result;
    }
  } catch (err) {
    console.log(err);
    return getBalanceFromNode(address, zone);
  }
};

async function getBalanceFromBlockscout(address: string, zone: Zone) {

  const myHeaders = new Headers();
  myHeaders.append('accept', 'application/json');

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  const url = `https://quaiscan.io/api?module=account&action=balance&address=${address}`

  const res = await fetch(url, requestOptions);
  const resString = await res.text();
  return JSON.parse(resString);
}

export async function getTransactionsFromBlockscout(address: string) {

  const myHeaders = new Headers();
  myHeaders.append('accept', 'application/json');

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };
  
  const url = `https://quaiscan.io/api?module=account&action=txlist&address=${address}`

  const res = await fetch(url, requestOptions);
  const resString = await res.text();
  return JSON.parse(resString);
}

async function getBalanceFromNode(address: string, zone: Zone) {
  console.log('getbalancefromnode called')
  const nodeData = allNodeData[zone];
  //const provider = new quais.JsonRpcProvider('http://rpc.sandbox.quai.network')

  console.log('nodedataprovider', nodeData.provider);
  //const provider = new quais.JsonRpcProvider(nodeData.provider);
  const provider = new quais.WebSocketProvider('wss://rpc.dev.quai.network')
  console.log('provider ready', provider.ready);
if(!provider.ready){
  return new Promise((resolve, reject) => {
    console.log('get balance from provider')
    provider.getBalance(address).then(async (value) => {
        resolve(value);
        console.log('getBalance', value);
      })
      .catch(error => {
        console.log('Error Getting Balance: ', error);
        reject(error);
      });
    });
  }
}
