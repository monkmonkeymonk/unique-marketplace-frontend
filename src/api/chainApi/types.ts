import { ChainData } from '../ApiContext';
import { ApiPromise } from '@polkadot/api';
import { AddressOrPair, SubmittableExtrinsic } from '@polkadot/api/types';
import { Settings } from '../restApi/settings/types';
import { BN } from '@polkadot/util';
import { Balance } from '@polkadot/types/interfaces';

export interface IRpc {
  rpcEndpoint: string
  isApiConnected: boolean
  isApiInitialized: boolean
  isKusamaApiConnected: boolean
  apiConnectionError?: string
  rawUniqRpcApi?: ApiPromise // allow access to the raw API for exceptions in the future
  rawKusamaRpcApi?: ApiPromise
  setOnChainReadyListener(callback: (chainData: ChainData) => void): void
  changeEndpoint(endpoint: string, options?: IRpcClientOptions): void
}

export interface IRpcClient extends IRpc {
  initialize(config: IRpcConfig, options?: IRpcClientOptions): Promise<void>
  nftController?: INFTController<any, any>
  collectionController?: ICollectionController<any, any>
  marketController?: IMarketController
  chainData: any
}

export type IRpcConfig = Settings;

export interface IRpcClientOptions {
  onChainReady?: (chainData: ChainData) => void
}

export interface INFTController<Collection, Token> {
  getToken(collectionId: number, tokenId: number): Promise<Token | null>
  getAccountTokens(account: string): Promise<Token[]>
}

export interface ICollectionController<Collection, Token> {
  getCollection(collectionId: number): Promise<Collection | null>
  getCollections(): Promise<Collection[]>
  getFeaturedCollections(): Promise<Collection[]>
  getTokensOfCollection(collectionId: number, ownerId: string): Promise<Token[]>
}

export interface IAccountController<Collection, Token> {
  getAccounts: any
}

export type TTransaction = SubmittableExtrinsic<'promise'>

export type TransactionOptions = {
  // this function will be called after transaction is created and awaited before proceeding
  sign: (tx: TTransaction) => Promise<TTransaction>
  // if not provided, signed.send() will be called instead
  send?: (signedTx: TTransaction) => Promise<any | void>
};

export interface IMarketController {
  kusamaDecimals: number
  // substrate address
  addToWhiteList: (account: string, options: TransactionOptions) => Promise<void>
  checkWhiteListed: (account: string) => Promise<boolean>
  lockNftForSale: (account: string, collectionId: string, tokenId: string, options: TransactionOptions) => Promise<void>
  sendNftToSmartContract: (account: string, collectionId: string, tokenId: string, options: TransactionOptions) => Promise<void>
  setForFixPriceSale: (account: string, collectionId: string, tokenId: string, price: string, options: TransactionOptions) => Promise<void>
  cancelSell: (account: string, collectionId: string, tokenId: string, options: TransactionOptions) => Promise<void>
  unlockNft: (account: string, collectionId: string, tokenId: string, options: TransactionOptions) => Promise<void>
  getUserDeposit: (account: string) => Promise<BN>
  addDeposit: (account: string, collectionId: string, tokenId: string, options: TransactionOptions) => Promise<void>
  withdrawDeposit: (account: string, options: TransactionOptions) => Promise<void>
  buyToken: (account: string, collectionId: string, tokenId: string, options: TransactionOptions) => Promise<void>
  transferToken: (from: string, to: string, collectionId: string, tokenId: string, options: TransactionOptions) => Promise<void>
  transferToAuction: (owner: string, collectionId: string, tokenId: string, options: TransactionOptions) => Promise<void>
  transferBidBalance: (from: string, amount: string, options: TransactionOptions) => Promise<void>
  transferBalance: (from: string, to: string, amount: string, options: TransactionOptions) => Promise<void>
  getKusamaFee: (sender: AddressOrPair, recipient?: string, value?: BN) => Promise<Balance>
}

export type Chain = {
  network: string
  name: string
  apiEndpoint: string
}
