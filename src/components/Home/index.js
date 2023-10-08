import { useState, useEffect } from "react"
import detectEthereumProvider from "@metamask/detect-provider"
import { enqueueSnackbar } from "notistack"
import {
  Button,
  IconButton,
  Paper,
  Typography,
  Box,
  Tooltip,
  CircularProgress,
} from "@mui/material"
import { lighten, darken } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import PublicIcon from "@mui/icons-material/Public"

import {
  copyToClipboard,
  formatBalance,
  convertToNumber,
  log,
} from "../../data/config/utils"
import {
  METAMASK_EVENTS,
  METAMASK_METHODS,
  THEME_TYPE,
} from "../../data/config/constants"
import ShowMessage from "../ShowMessage"

const initialState = {
  accounts: [],
  balance: {},
  chainId: "",
  blockNumber: "",
}

const Home = () => {
  const [hasProvider, setHasProvider] = useState(null)
  const [wallet, setWallet] = useState(initialState)
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)

  // checking whether ethereum provider exist or not
  useEffect(() => {
    const refreshAccounts = (accounts) => {
      if (Array.isArray(accounts) && accounts?.length > 0) {
        setIsConnected(true)
        updateWallet(accounts)
      } else setWallet(initialState)
    }

    const refreshChain = (chainId) => {
      setWallet((prevState) => {
        return {
          ...prevState,
          chainId,
        }
      })
    }

    // function to check if metamask provider exist or not
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      setHasProvider(Boolean(provider))

      // if already exists and connected, fetching all related Data
      if (provider) {
        try {
          setPageLoading(true)
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          })
          setPageLoading(false)
          refreshAccounts(accounts)
        } catch (err) {
          setPageLoading(false)
          if (err.code === 4001)
            enqueueSnackbar("User Denied the Request", { variant: "error" })
        }

        // adding listener to any changes in accounts | chainId
        window.ethereum.on(METAMASK_EVENTS.ACCOUNT_CHANGE, refreshAccounts)
        window.ethereum.on(METAMASK_EVENTS.CHAIN_ID_CHANGE, refreshChain)
      }
    }

    getProvider()

    // adding cleanup code
    return () => {
      // removing listeners on component unmount
      window.ethereum?.removeListener(
        METAMASK_EVENTS.ACCOUNT_CHANGE,
        refreshAccounts
      )
      window.ethereum?.removeListener(
        METAMASK_EVENTS.CHAIN_ID_CHANGE,
        refreshChain
      )
    }
  }, [])

  // getting all data of all connected accounts
  const updateWallet = async (accounts) => {
    const balance = {}
    accounts.forEach(async (account) => {
      try {
        const result = await window.ethereum.request({
          method: METAMASK_METHODS.GET_BALANCE,
          params: [account],
        })
        if (result) balance[account] = formatBalance(result)
      } catch (err) {
        log("getBalanceError", err)
      }
    })
    const chainId = await window.ethereum.request({
      method: METAMASK_METHODS.CHAIN_ID,
    })

    const blockNumber = await window.ethereum.request({
      method: METAMASK_METHODS.BLOCK_NUMBER,
    })

    setWallet((prevState) => {
      return {
        ...prevState,
        accounts,
        balance,
        chainId,
        blockNumber,
      }
    })
  }

  // getting balance for an account
  const fetchBalance = async (account) => {
    const balance = formatBalance(
      await window.ethereum.request({
        method: METAMASK_METHODS.GET_BALANCE,
        params: [account],
      })
    )

    if (balance) {
      setWallet((prevState) => ({
        ...prevState,
        balance: {
          ...prevState.balance,
          [account]: balance,
        },
      }))
    }
  }

  // initial connection
  const handleConnect = async () => {
    setLoading(true)
    try {
      const accounts = await window.ethereum.request({
        method: METAMASK_METHODS.CONNECTION,
      })
      setLoading(false)
      setIsConnected(true)
      if (accounts && accounts?.length > 0) {
        updateWallet(accounts)
      }
    } catch (err) {
      if (err.code === 4001) {
        setLoading(false)
        enqueueSnackbar("User Denied the Request", { variant: "error" })
      }
    }
  }

  // manage accounts
  const handleReconnect = async () => {
    setLoading(true)
    window.ethereum
      .request({
        method: METAMASK_METHODS.REQUEST_PERMISSION,
        params: [
          {
            [METAMASK_METHODS.ACCOUNTS]: {},
          },
        ],
      })
      .then((res) => {
        setLoading(false)
        // any change in accounts will reflected by event listener
      })
      .catch((err) => {
        setLoading(false)
        if (err.code === 4001) {
          enqueueSnackbar("User Denied the Request", { variant: "error" })
        } else
          enqueueSnackbar("Something went wrong Please try again later", {
            variant: "error",
          })
      })
  }

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {hasProvider ? (
        <>
          {isConnected ? (
            <Paper sx={{ p: 2, width: "100%", maxWidth: 500, minHeight: 400 }}>
              {pageLoading ? (
                <CircularProgress />
              ) : (
                <>
                  <Box
                    component="img"
                    src="/assets/metamask.svg"
                    width="100px"
                    mx="auto"
                    display="block"
                    sx={{ backgroundSize: "cover" }}
                  />
                  <Typography variant="h6" align="center" mt={2}>
                    Welcome to Metamask Wallet
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                  >
                    ChainID:{" "}
                    {wallet.chainId ? convertToNumber(wallet.chainId) : ""}
                    <Tooltip title="Copy Hex value">
                      <IconButton
                        size="small"
                        sx={{ ml: 0.5 }}
                        onClick={() => {
                          copyToClipboard(wallet.chainId)
                        }}
                      >
                        <ContentCopyIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    mb={2}
                  >
                    Block Number:{" "}
                    {wallet.blockNumber
                      ? convertToNumber(wallet.blockNumber)
                      : ""}
                    <Tooltip title="Copy Hex value">
                      <IconButton
                        size="small"
                        sx={{ ml: 0.5 }}
                        onClick={() => copyToClipboard(wallet.blockNumber)}
                      >
                        <ContentCopyIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <Typography
                      variant="subttile1"
                      fontWeight="fontWeightMedium"
                    >
                      Connected Accounts
                    </Typography>
                    <LoadingButton
                      size="small"
                      loading={loading}
                      onClick={handleReconnect}
                    >
                      Manage Accounts
                    </LoadingButton>
                  </Box>
                  {wallet.accounts.length > 0 ? (
                    wallet.accounts.map((item) => (
                      <Box
                        position="relative"
                        bgcolor={(theme) =>
                          theme.palette.mode === THEME_TYPE.DARK
                            ? darken(theme.palette.primary.dark, 0.4)
                            : lighten(theme.palette.primary.light, 0.7)
                        }
                        key={item}
                        py={1}
                        px={2}
                        mb={1}
                        borderRadius={2}
                      >
                        <Tooltip title="Copy Public Address">
                          <IconButton
                            size="small"
                            sx={{ position: "absolute", top: 4, right: 8 }}
                            onClick={() => copyToClipboard(item)}
                          >
                            <ContentCopyIcon fontSize="inherit" />
                          </IconButton>
                        </Tooltip>
                        <Box display="flex" gap={0.5} mb={1}>
                          <PublicIcon fontSize="small" color="info" />
                          <Typography
                            variant="subtitle2"
                            sx={{ wordBreak: "break-all", pr: 3 }}
                          >
                            {item}
                          </Typography>
                        </Box>
                        {wallet.balance[item] ? (
                          <Box display="flex" gap={0.5} alignItems="center">
                            <AccountBalanceWalletIcon
                              fontSize="small"
                              color="secondary"
                            />
                            <Typography variant="h6">
                              {wallet.balance[item]} ETH
                            </Typography>
                          </Box>
                        ) : (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => fetchBalance(item)}
                          >
                            Fetch Balance
                          </Button>
                        )}
                      </Box>
                    ))
                  ) : (
                    <Typography>No Connected Accounts</Typography>
                  )}
                </>
              )}
            </Paper>
          ) : (
            <Paper sx={{ py: 4, px: 2, width: "100%", maxWidth: 400 }}>
              <Box
                component="img"
                src="/assets/metamask.png"
                width="200px"
                mx="auto"
                display="block"
                sx={{ backgroundSize: "cover" }}
              />
              <Typography align="center" mt={4} mb={2}>
                Please connect your MetaMask account
              </Typography>
              <LoadingButton
                variant="contained"
                onClick={handleConnect}
                loading={loading}
                disabled={loading}
                fullWidth
              >
                Connect To Metamask
              </LoadingButton>
            </Paper>
          )}
        </>
      ) : (
        <ShowMessage
          src="/assets/metamask.png"
          sx={{ height: 144, width: 256 }}
          title="Welcome to our Application"
          message="Please install MetaMask Extension in your
        browser or if already installed, Please enabled it under manage extension"
        >
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => window.location.reload()}
          >
            Refresh
          </Button>
        </ShowMessage>
      )}
    </Box>
  )
}

export default Home
