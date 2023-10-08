import { useContext } from "react"
import { useTheme } from "@mui/material/styles"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import { IconButton, Typography, Box, Link } from "@mui/material"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"

import { ThemeModeContext } from "../../data/config/context"
import { THEME_TYPE } from "../../data/config/constants"

const Navbar = () => {
  const theme = useTheme()
  const themeHandler = useContext(ThemeModeContext)
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: "divider" }}
    >
      <Toolbar
        position="relative"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography
          variant="h6"
          fontWeight="fontWeightBold"
          textTransform="uppercase"
        >
          Metamask Wallet
        </Typography>
        <Box display="flex" gap={2} alignItems="center">
          <Link href="/">Task1</Link>
          <Link href="/task2">Task2</Link>
          <Link href="/task3">Task3</Link>
          <Link href="/task4">Task4</Link>
          {theme.palette.mode === THEME_TYPE.DARK ? (
            <IconButton
              color="inherit"
              onClick={() => themeHandler.changeThemeMode(THEME_TYPE.LIGHT)}
            >
              <Brightness7Icon color="warning" />
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              onClick={() => themeHandler.changeThemeMode(THEME_TYPE.DARK)}
            >
              <Brightness4Icon color="inherit" />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
