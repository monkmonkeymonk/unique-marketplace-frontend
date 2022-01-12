export type Chain = {
  id: string
  name: string
  clientEndpoint: string
  rpcEndpoint: string
}

const chains: Record<string, Chain> = {
  ['OPAL']: {
    id: 'OPAL',
    name: 'OPAL by UNIQUE',
    clientEndpoint: 'https://hasura-opal.unique.network/v1/graphql',
    rpcEndpoint: 'wss://opal.unique.network',
  },
  ['QUARTZ']: {
    id: 'QUARTZ',
    name: 'QUARTZ by UNIQUE',
    clientEndpoint: 'https://hasura-quartz.unique.network/v1/graphql',
    rpcEndpoint: 'wss://quartz.unique.network',
  },
}

const defaultChain = 'OPAL'

export { defaultChain }

export default chains