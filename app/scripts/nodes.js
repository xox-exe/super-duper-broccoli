'use strict';
var nodes = function() {}
nodes.customNode = require('./nodeHelpers/customNode');
nodes.infuraNode = require('./nodeHelpers/infura');
nodes.metamaskNode = require('./nodeHelpers/metamask');
nodes.nodeTypes = {
    ETH: "ETH",
    ETC: "ETC",
    MUS: "MUSIC",
    Ropsten: "ROPSTEN ETH",
    Kovan: "KOVAN ETH",
    Rinkeby: "RINKEBY ETH",
    RSK: "RSK",
    EXP: "EXP",
    UBQ: "UBQ",
    POA: "POA",
    TOMO: "TOMO",
    ELLA: "ELLA",
    ETSC: "ETSC",
    EGEM: "EGEM",
    CLO: "CLO",
    X888: "X88",
    MUSIC: "MUSIC",
    GO: "GO",
    EOSC: "EOSC",
    Custom: "CUSTOM ETH"
};
nodes.ensNodeTypes = [nodes.nodeTypes.ETH, nodes.nodeTypes.Ropsten];
nodes.ensSubNodeTypes = [nodes.nodeTypes.ETH];
nodes.domainsaleNodeTypes = [nodes.nodeTypes.ETH, nodes.nodeTypes.Ropsten];
nodes.customNodeObj = {
    'name': 'CUS',
    'blockExplorerTX': '',
    'blockExplorerAddr': '',
    'type': nodes.nodeTypes.Custom,
    'eip155': false,
    'chainId': '',
    'tokenList': [],
    'abiList': [],
    'service': 'Custom',
    'lib': null
};
nodes.nodeList = {
    'eth_mew': {
        'name': 'ETH',
        'blockExplorerTX': 'https://etherscan.io/tx/[[txHash]]',
        'blockExplorerAddr': 'https://etherscan.io/address/[[address]]',
        'type': nodes.nodeTypes.ETH,
        'eip155': true,
        'chainId': 1,
        'tokenList': require('./tokens/ethTokens.json'),
        'abiList': require('./abiDefinitions/ethAbi.json'),
        'service': 'myetherwallet.com',
        'lib': new nodes.customNode('https://api.myetherwallet.com/eth', '')
    },
    'eth_ethscan': {
        'name': 'ETH',
        'blockExplorerTX': 'https://etherscan.io/tx/[[txHash]]',
        'blockExplorerAddr': 'https://etherscan.io/address/[[address]]',
        'type': nodes.nodeTypes.ETH,
        'eip155': true,
        'chainId': 1,
        'tokenList': require('./tokens/ethTokens.json'),
        'abiList': require('./abiDefinitions/ethAbi.json'),
        'service': 'etherscan.io',
        'lib': require('./nodeHelpers/etherscan')
    },
    'eth_infura': {
        'name': 'ETH',
        'blockExplorerTX': 'https://etherscan.io/tx/[[txHash]]',
        'blockExplorerAddr': 'https://etherscan.io/address/[[address]]',
        'type': nodes.nodeTypes.ETH,
        'eip155': true,
        'chainId': 1,
        'tokenList': require('./tokens/ethTokens.json'),
        'abiList': require('./abiDefinitions/ethAbi.json'),
        'service': 'infura.io',
        'lib': new nodes.infuraNode('https://mainnet.infura.io/mew')
    },
    'eth_giveth': {
        'name': 'ETH',
        'blockExplorerTX': 'https://etherscan.io/tx/[[txHash]]',
        'blockExplorerAddr': 'https://etherscan.io/address/[[address]]',
        'type': nodes.nodeTypes.ETH,
        'eip155': true,
        'chainId': 1,
        'tokenList': require('./tokens/ethTokens.json'),
        'abiList': require('./abiDefinitions/ethAbi.json'),
        'service': 'giveth.io',
        'lib': new nodes.customNode('https://mew.giveth.io', '')
    },
    'etc_ethereum_commonwealth': {
        'name': 'ETC',
        'blockExplorerTX': 'https://gastracker.io/tx/[[txHash]]',
        'blockExplorerAddr': 'https://gastracker.io/addr/[[address]]',
        'type': nodes.nodeTypes.ETC,
        'eip155': true,
        'chainId': 61,
        'tokenList': require('./tokens/etcTokens.json'),
        'abiList': require('./abiDefinitions/etcAbi.json'),
        'service': 'Ethereum Commonwealth',
        'lib': new nodes.customNode('https://etc-geth.0xinfra.com', '')
    },
    'etc_epool': {
        'name': 'ETC',
        'blockExplorerTX': 'https://gastracker.io/tx/[[txHash]]',
        'blockExplorerAddr': 'https://gastracker.io/addr/[[address]]',
        'type': nodes.nodeTypes.ETC,
        'eip155': true,
        'chainId': 61,
        'tokenList': require('./tokens/etcTokens.json'),
        'abiList': require('./abiDefinitions/etcAbi.json'),
        'service': 'epool.io',
        'lib': new nodes.customNode('https://mew.epool.io', '')
    },
    'rop_mew': {
        'name': 'Ropsten',
        'type': nodes.nodeTypes.Ropsten,
        'blockExplorerTX': 'https://ropsten.etherscan.io/tx/[[txHash]]',
        'blockExplorerAddr': 'https://ropsten.etherscan.io/address/[[address]]',
        'eip155': true,
        'chainId': 3,
        'tokenList': require('./tokens/ropstenTokens.json'),
        'abiList': require('./abiDefinitions/ropstenAbi.json'),
        'service': 'myetherwallet.com',
        'lib': new nodes.customNode('https://api.myetherwallet.com/rop', '')
    },
    'rop_infura': {
        'name': 'Ropsten',
        'blockExplorerTX': 'https://ropsten.etherscan.io/tx/[[txHash]]',
        'blockExplorerAddr': 'https://ropsten.etherscan.io/address/[[address]]',
        'type': nodes.nodeTypes.Ropsten,
        'eip155': true,
        'chainId': 3,
        'tokenList': require('./tokens/ropstenTokens.json'),
        'abiList': require('./abiDefinitions/ropstenAbi.json'),
        'service': 'infura.io',
        'lib': new nodes.infuraNode('https://ropsten.infura.io/mew')
    },
    'kov_ethscan': {
        'name': 'Kovan',
        'type': nodes.nodeTypes.Kovan,
        'blockExplorerTX': 'https://kovan.etherscan.io/tx/[[txHash]]',
        'blockExplorerAddr': 'https://kovan.etherscan.io/address/[[address]]',
        'eip155': true,
        'chainId': 42,
        'tokenList': require('./tokens/kovanTokens.json'),
        'abiList': require('./abiDefinitions/kovanAbi.json'),
        'service': 'etherscan.io',
        'lib': require('./nodeHelpers/etherscanKov')
    },
    'kov_infura': {
        'name': 'Kovan',
        'type': nodes.nodeTypes.Kovan,
        'blockExplorerTX': 'https://kovan.etherscan.io/tx/[[txHash]]',
        'blockExplorerAddr': 'https://kovan.etherscan.io/address/[[address]]',
        'eip155': true,
        'chainId': 42,
        'tokenList': require('./tokens/kovanTokens.json'),
        'abiList': require('./abiDefinitions/kovanAbi.json'),
        'service': 'infura.io',
        'lib': new nodes.infuraNode('https://kovan.infura.io/mew')
    },
    'rin_ethscan': {
        'name': 'Rinkeby',
        'type': nodes.nodeTypes.Rinkeby,
        'blockExplorerTX': 'https://rinkeby.etherscan.io/tx/[[txHash]]',
        'blockExplorerAddr': 'https://rinkeby.etherscan.io/address/[[address]]',
        'eip155': true,
        'chainId': 4,
        'tokenList': require('./tokens/rinkebyTokens.json'),
        'abiList': require('./abiDefinitions/rinkebyAbi.json'),
        'service': 'etherscan.io',
        'lib': require('./nodeHelpers/etherscanRin')
    },
    'rin_infura': {
        'name': 'Rinkeby',
        'blockExplorerTX': 'https://rinkeby.etherscan.io/tx/[[txHash]]',
        'blockExplorerAddr': 'https://rinkeby.etherscan.io/address/[[address]]',
        'type': nodes.nodeTypes.Rinkeby,
        'eip155': true,
        'chainId': 4,
        'tokenList': require('./tokens/rinkebyTokens.json'),
        'abiList': require('./abiDefinitions/rinkebyAbi.json'),
        'service': 'infura.io',
        'lib': new nodes.infuraNode('https://rinkeby.infura.io/mew')
    },
    'exp': {
        'name': 'EXP',
        'blockExplorerTX': 'http://www.gander.tech/tx/[[txHash]]',
        'blockExplorerAddr': 'http://www.gander.tech/address/[[address]]',
        'type': nodes.nodeTypes.EXP,
        'eip155': true,
        'chainId': 2,
        'tokenList': require('./tokens/expTokens.json'),
        'abiList': require('./abiDefinitions/expAbi.json'),
        'estimateGas': true,
        'service': 'expanse.tech',
        'lib': new nodes.customNode('https://node.expanse.tech/', '')
    },
    'ubq': {
        'name': 'UBQ',
        'blockExplorerTX': 'https://ubiqscan.io/en/tx/[[txHash]]',
        'blockExplorerAddr': 'https://ubiqscan.io/en/address/[[address]]',
        'type': nodes.nodeTypes.UBQ,
        'eip155': true,
        'chainId': 8,
        'tokenList': require('./tokens/ubqTokens.json'),
        'abiList': require('./abiDefinitions/ubqAbi.json'),
        'estimateGas': true,
        'service': 'ubiqscan.io',
        'lib': new nodes.customNode('https://pyrus2.ubiqscan.io', '')
    },
    'poa': {
        'name': 'POA',
        'blockExplorerTX': 'https://poaexplorer.com/tx/[[txHash]]',
        'blockExplorerAddr': 'https://poaexplorer.com/address/[[address]]',
        'type': nodes.nodeTypes.POA,
        'eip155': true,
        'chainId': 99,
        'tokenList': require('./tokens/poaTokens.json'),
        'abiList': require('./abiDefinitions/poaAbi.json'),
        'estimateGas': true,
        'service': 'poa.infura.io',
        'lib': new nodes.infuraNode('https://poa.infura.io')
    },
    'tomo': {
        'name': 'TOMO',
        'blockExplorerTX': 'https://explorer.tomocoin.io/#/tx/[[txHash]]',
        'blockExplorerAddr': 'https://explorer.tomocoin.io/#/address/[[address]]',
        'type': nodes.nodeTypes.TOMO,
        'eip155': true,
        'chainId': 40686,
        'tokenList': require('./tokens/tomoTokens.json'),
        'abiList': require('./abiDefinitions/tomoAbi.json'),
        'estimateGas': true,
        'service': 'core.tomocoin.io',
        'lib': new nodes.customNode('https://core.tomocoin.io', '')
    },
    'ella': {
        'name': 'ELLA',
        'blockExplorerTX': 'https://explorer.ellaism.org/tx/[[txHash]]',
        'blockExplorerAddr': 'https://explorer.ellaism.org/addr/[[address]]',
        'type': nodes.nodeTypes.ELLA,
        'eip155': true,
        'chainId': 64,
        'tokenList': require('./tokens/ellaTokens.json'),
        'abiList': require('./abiDefinitions/ellaAbi.json'),
        'estimateGas': true,
        'service': 'ellaism.org',
        'lib': new nodes.customNode('https://jsonrpc.ellaism.org', '')
    },
    'etsc': {
        'name': 'ETSC',
        'blockExplorerTX': 'https://explorer.ethereumsocial.kr/tx/[[txHash]]',
        'blockExplorerAddr': 'https://explorer.ethereumsocial.kr/addr/[[address]]',
        'type': nodes.nodeTypes.ETSC,
        'eip155': true,
        'chainId': 28,
        'tokenList': require('./tokens/etscTokens.json'),
        'abiList': require('./abiDefinitions/etscAbi.json'),
        'estimateGas': true,
        'service': 'ethereumsocial.kr',
        'lib': new nodes.customNode('https://node.ethereumsocial.kr', '')
    },
    'egem': {
        'name': 'EGEM',
        'blockExplorerTX': 'https://explorer.egem.io/tx/[[txHash]]',
        'blockExplorerAddr': 'https://explorer.egem.io/addr/[[address]]',
        'type': nodes.nodeTypes.EGEM,
        'eip155': true,
        'chainId': 1987,
        'tokenList': require('./tokens/egemTokens.json'),
        'abiList': require('./abiDefinitions/egemAbi.json'),
        'estimateGas': true,
        'service': 'egem.io',
        'lib': new nodes.customNode('https://jsonrpc.egem.io/custom', '')
    },
    'clo': {
        'name': 'CLO',
        'blockExplorerTX': 'https://cloexplorer.org/tx/[[txHash]]',
        'blockExplorerAddr': 'https://cloexplorer.org/addr/[[address]]',
        'type': nodes.nodeTypes.CLO,
        'eip155': true,
        'chainId': 820,
        'tokenList': require('./tokens/cloTokens.json'),
        'abiList': require('./abiDefinitions/cloAbi.json'),
        'service': 'Callisto.network',
        'lib': new nodes.customNode('https://clo-geth.0xinfra.com/', '')
    },
    'x888': {
        'name': 'X888',
        'blockExplorerTX': 'https://myetherwallet.com/?[[txHash]]#check-tx-status',
        'blockExplorerAddr': 'https://myetherwallet.com/?[[address]]#view-wallet-info',
        'type': nodes.nodeTypes.X888,
        'eip155': true,
        'chainId': 888,
        'tokenList': require('./tokens/x888Tokens.json'),
        'abiList': require('./abiDefinitions/x888Abi.json'),
        'estimateGas': true,
        'service': 'eightereum',
        'lib': new nodes.customNode('https://eightereum.x888.io', '')
    },
    'music': {
        'name': 'MUSIC',
        'blockExplorerTX': 'https://explorer.musicoin.org/tx/[[txHash]]',
        'blockExplorerAddr': 'https://explorer.musicoin.org/account/[[address]]',
        'type': nodes.nodeTypes.MUSIC,
        'eip155': true,
        'chainId': 7762959,
        'tokenList': require('./tokens/musicTokens.json'),
        'abiList': require('./abiDefinitions/musicAbi.json'),
        'estimateGas': true,
        'service': 'musicoin.org',
        'lib': new nodes.customNode('https://mcdnode.trustfarm.io/api', '')
    },
    'go': {
        'name': 'GO',
        'blockExplorerTX': 'https://explorer.gochain.io/tx/[[txHash]]',
        'blockExplorerAddr': 'https://explorer.gochain.io/addr/[[address]]',
        'type': nodes.nodeTypes.GO,
        'eip155': true,
        'chainId': 60,
        'tokenList': require('./tokens/goTokens.json'),
        'abiList': require('./abiDefinitions/goAbi.json'),
        'estimateGas': true,
        'service': 'gochain.io',
        'lib': new nodes.customNode('https://rpc.gochain.io', '')
    },
    'eosc': {
        'name': 'EOSC',
        'blockExplorerTX': 'https://explorer.eos-classic.io/tx/[[txHash]]',
        'blockExplorerAddr': 'https://explorer.eos-classic.io/addr/[[address]]',
        'type': nodes.nodeTypes.EOSC,
        'eip155': true,
        'chainId': 20,
        'tokenList': require('./tokens/eoscTokens.json'),
        'abiList': require('./abiDefinitions/eoscAbi.json'),
        'estimateGas': true,
        'service': 'eos-classic.io',
        'lib': new nodes.customNode('https://node.eos-classic.io', '')
    }
};


nodes.ethPrice = require('./nodeHelpers/ethPrice');
module.exports = nodes;
