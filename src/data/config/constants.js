export const THEME_TYPE = {
  DARK: "dark",
  LIGHT: "light",
}

export const LOCAL_STORAGE = {
  THEME: "automatedProsTheme",
}

export const METAMASK_METHODS = {
  CONNECTION: "eth_requestAccounts",
  ACCOUNTS: "eth_accounts",
  REQUEST_PERMISSION: "wallet_requestPermissions",
  GET_BALANCE: "eth_getBalance",
  CHAIN_ID: "eth_chainId",
  BLOCK_NUMBER: "eth_blockNumber"
}

export const METAMASK_EVENTS = {
  ACCOUNT_CHANGE: "accountsChanged",
  CHAIN_ID_CHANGE: "chainChanged",
}
