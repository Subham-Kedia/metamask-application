import { LOCAL_STORAGE } from "./constants"
export const log = (...arg) => {
  if (process.env.NODE_ENV !== "production") console.log(...arg)
}

export const setDataInLocalStorage = (key, value) => {
  const json_data = JSON.stringify(value)
  localStorage.setItem(key, json_data)
}

export const clearAllDataFromLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE.THEME)
}

export const getDataFromLocalStorage = (key, defaultValue) => {
  const dataStr = localStorage.getItem(key)
  if (dataStr && dataStr !== undefined) {
    const data = JSON.parse(dataStr)
    return data
  }
  return defaultValue
}

export const getDeviceData = () => {
  const deviceData = {
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    orientation: window.matchMedia("(orientation:landscape)").matches
      ? "landscape"
      : "portrait",
  }
  return deviceData
}

export const formatBalance = (rawBalance) => {
  const balance = (parseInt(rawBalance, 16) / 1000000000000000000).toFixed(2)
  return balance.toString()
}

export const formatChainAsNum = (chainIdHex) => {
  const chainIdNum = parseInt(chainIdHex)
  return chainIdNum
}
