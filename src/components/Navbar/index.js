import { useContext } from "react"
import { useTheme } from "@mui/material/styles"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import { IconButton, Typography } from "@mui/material"
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
      <Toolbar position="relative" sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          fontWeight="fontWeightBold"
          textTransform="uppercase"
        >
          Metamask Wallet
        </Typography>
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
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
