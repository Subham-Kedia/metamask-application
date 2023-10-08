import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@mui/material/styles"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import {
  IconButton,
  Typography,
  Box,
  Link,
  Menu,
  MenuItem,
} from "@mui/material"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"

import { ThemeModeContext } from "../../data/config/context"
import { THEME_TYPE } from "../../data/config/constants"
import MenuIcon from "@mui/icons-material/Menu"

const Navbar = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const themeHandler = useContext(ThemeModeContext)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
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
        <Box display={{ xs: "flex", sm: "none" }} gap={1} alignItems="center">
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
          <IconButton color="inherit" onClick={handleMenu}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Box display={{ xs: "none", sm: "flex" }} gap={2} alignItems="center">
          <Link
            color={window.location.pathname === "/" ? "primary" : "inherit"}
            sx={{
              cursor: "pointer",
              textDecoration: "none",
              "&:hover": { color: "primary.main" },
            }}
            onClick={() => navigate("/")}
          >
            Task1
          </Link>
          <Link
            color={window.location.pathname === "/task2" ? "primary" : "inherit"}
            onClick={() => navigate("/task2")}
            sx={{
              cursor: "pointer",
              textDecoration: "none",
              "&:hover": { color: "primary.main" },
            }}
          >
            Task2
          </Link>
          <Link
            color={window.location.pathname === "/task3" ? "primary" : "inherit"}
            onClick={() => navigate("/task3")}
            sx={{
              cursor: "pointer",
              textDecoration: "none",
              "&:hover": { color: "primary.main" },
            }}
          >
            Task3
          </Link>
          <Link
            color={window.location.pathname === "/task4" ? "primary" : "inherit"}
            onClick={() => navigate("/task4")}
            sx={{
              cursor: "pointer",
              textDecoration: "none",
              "&:hover": { color: "primary.main" },
            }}
          >
            Task4
          </Link>
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
      <Menu
        id="mobile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "mobile-menu",
          sx: {
            width: 120,
          },
          dense: true,
        }}
        onClick={handleClose}
      >
        <MenuItem onClick={() => navigate("/")}>Task 1</MenuItem>
        <MenuItem onClick={() => navigate("/task2")}>Task 2</MenuItem>
        <MenuItem onClick={() => navigate("/task3")}>Task 3</MenuItem>
        <MenuItem onClick={() => navigate("/task4")}>Task 4</MenuItem>
      </Menu>
    </AppBar>
  )
}

export default Navbar
