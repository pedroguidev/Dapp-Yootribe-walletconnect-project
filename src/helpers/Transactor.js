import { hexlify } from '@ethersproject/bytes';
import { parseUnits } from '@ethersproject/units';
import Notify from 'bnc-notify';
import { BLOCKNATIVE_DAPPID } from '../constants';

// this should probably just be renamed to 'notifier'
// it is basically just a wrapper around BlockNative's wonderful Notify.js
// https://docs.blocknative.com/notify

export default function Transactor(provider, gasPrice, etherscan) {
  if (typeof provider !== 'undefined') {
    // eslint-disable-next-line consistent-return
    return async tx => {
      const signer = provider.getSigner();
      const network = await provider.getNetwork();
      
      const options = {
        dappId: BLOCKNATIVE_DAPPID, // GET YOUR OWN KEY AT https://account.blocknative.com
        system: 'ethereum',
        networkId: network.chainId,
        // darkMode: Boolean, // (default: false)
        transactionHandler: txInformation => {
          console.log('HANDLE TX', txInformation);
        },
      };
      const notify = Notify(options);

      let etherscanNetwork = '';
      if (network.name && network.chainId > 1) {
        etherscanNetwork = network.name + '.';
      }

      let etherscanTxUrl = 'https://' + etherscanNetwork + 'etherscan.io/tx/';
      if (network.chainId === 100) {
        etherscanTxUrl = 'https://blockscout.com/poa/xdai/tx/';
      }

      try {
        let result;
        
        if (tx instanceof Promise) {
          result = await tx;
        } else {
          if (!tx.gasPrice) {
            tx.gasPrice = gasPrice || parseUnits('4.1', 'gwei');
          }
          if (!tx.gasLimit) {
            tx.gasLimit = hexlify(120000);
          }
          
          result = await signer.sendTransaction(tx);
        }
        
        // if it is a valid Notify.js network, use that, if not, just send a default notification
        if ([1, 3, 4, 5, 42, 100].indexOf(network.chainId) >= 0) {
          const { emitter } = notify.hash(result.hash);
          emitter.on('all', transaction => {
            return {
              onclick: () => window.open((etherscan || etherscanTxUrl) + transaction.hash),
            };
          });
        } else {
          // notification.info({
          //   message: 'Local Transaction Sent',
          //   description: result.hash,
          //   placement: 'bottomRight',
          // });
        }

        return result;
      } catch (e) {

        console.log(e);
        console.log('Transaction Error:', e.message);
  
      }
    };
  }
}
