import { React, useMemo, useState, useRef, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { SnackbarProvider, closeSnackbar } from "notistack"
import IconButton from "@mui/material/IconButton"
import Box from "@mui/material/Box"
import CloseIcon from "@mui/icons-material/Close"

import themeConfig from "../data/theme"
import { ThemeModeContext, DeviceContext } from "../data/config/context"
import {
  setDataInLocalStorage,
  getDataFromLocalStorage,
  getDeviceData,
} from "../data/config/utils"
import { LOCAL_STORAGE, THEME_TYPE } from "../data/config/constants"

import Navbar from "../components/Navbar"
import Home from "../components/Home"
import Task2 from "../components/Task2"
import Task3 from "../components/Task3"
import Task4 from "../components/Task4"

const themeType = getDataFromLocalStorage(
  LOCAL_STORAGE.THEME,
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? THEME_TYPE.DARK
    : THEME_TYPE.LIGHT
)

function App() {
  const [themeMode, setThemeMode] = useState(themeType)
  const [deviceData, setDeviceData] = useState(getDeviceData())
  const resizeTimerRef = useRef(null)
  let theme = useMemo(() => createTheme(themeConfig[themeMode]), [themeMode])
  theme = responsiveFontSizes(theme)

  useEffect(() => {
    const handleDeviceStatusChange = () => {
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current)
      resizeTimerRef.current = setTimeout(
        () => setDeviceData(getDeviceData()),
        500
      )
    }
    window.addEventListener("resize", handleDeviceStatusChange)

    return () => {
      window.removeEventListener("resize", handleDeviceStatusChange)
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current)
    }
  }, [])

  const themeHandler = useMemo(
    () => ({
      changeThemeMode: (mode) => {
        if (mode) {
          setThemeMode(mode)
          setDataInLocalStorage(LOCAL_STORAGE.THEME, mode)
        }
      },
    }),
    []
  )

  const deviceHandler = useMemo(
    () => ({
      deviceData,
    }),
    [deviceData]
  )
  return (
    <DeviceContext.Provider value={deviceHandler}>
      <ThemeModeContext.Provider value={themeHandler}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider
            style={{
              maxWidth: 400,
            }}
            autoHideDuration={2000}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            action={(snackbarId) => (
              <IconButton
                size="small"
                onClick={() => closeSnackbar(snackbarId)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            )}
            preventDuplicate
          />
          <Navbar />
          <Box height="calc(100vh - 64px)" p={2}>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/task2" element={<Task2 />} />
                <Route path="/task3" element={<Task3 />} />
                <Route path="/task4" element={<Task4 />} />
              </Routes>
            </Router>
          </Box>
        </ThemeProvider>
      </ThemeModeContext.Provider>
    </DeviceContext.Provider>
  )
}

export default App
