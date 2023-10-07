import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Link from "@mui/material/Link"
import Box from "@mui/material/Box"
import { Typography } from "@mui/material"

const Navbar = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar position="relative" sx={{ justifyContent: "space-between" }}>
        <Typography textTransform="uppercase">Metamask Wallet</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
