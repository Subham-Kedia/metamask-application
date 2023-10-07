import { useState, useEffect } from "react"
import detectEthereumProvider from "@metamask/detect-provider"

import { formatBalance, formatChainAsNum } from "../../data/config/utils"

const initialState = {
  accounts: [],
  balance: {},
}

const Home = () => {
  const [hasProvider, setHasProvider] = useState(null)
  const [wallet, setWallet] = useState(initialState)
  const [isConnected, setIsConnected] = useState(false)

  // checking whether ethereum provider exist or not
  useEffect(() => {
    const refreshAccounts = (accounts) => {
      if (Array.isArray(accounts) && accounts?.length > 0) {
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

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      setHasProvider(Boolean(provider))

      if (provider) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        })
        refreshAccounts(accounts)
        // adding listener to any changes in accounts | chainId
        window.ethereum.on("accountsChanged", refreshAccounts)
        window.ethereum.on("chainChanged", refreshChain)
      }
    }

    getProvider()

    // adding cleanup code
    return () => {
      // removing listeners on component unmount
      window.ethereum?.removeListener("accountsChanged", refreshAccounts)
      window.ethereum?.removeListener("chainChanged", refreshChain)
    }
  }, [])

  console.log(wallet)

  const updateWallet = async (accounts) => {
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    })

    setWallet((prevState) => {
      return {
        ...prevState,
        accounts,
        chainId,
      }
    })
  }

  const fetchBalance = async (account) => {
    const balance = formatBalance(
      await window.ethereum.request({
        method: "eth_getBalance",
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

  const handleConnect = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })
    if (accounts && accounts?.length > 0) {
      updateWallet(accounts)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {hasProvider ? (
        <button
          className="border border-white py-2 px-4 rounded"
          onClick={handleConnect}
        >
          Connect Metamask
        </button>
      ) : (
        <h2>
          Metamask does not exist or It has been disabled. Please add/enable
          metamask extension in your browser.
        </h2>
      )}
      {wallet.accounts.length > 0 && (
        <div className="border mt-4 w-screen">
          <h2 className="mb-2">Accounts</h2>
          <ul>
            {wallet.accounts.map((item) => (
              <div className="flex justify-between" key={item}>
                <p>{item}</p>
                {wallet.balance?.[item] ? (
                  <p>{wallet.balance?.[item]} ETH</p>
                ) : (
                  <button onClick={() => fetchBalance(item)}>
                    Fetch balance
                  </button>
                )}
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Home
