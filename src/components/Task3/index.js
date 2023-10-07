import { Box } from "@mui/material"
import { green } from "@mui/material/colors"

const Task3 = () => {
  return (
    <Box
      bgcolor={green[50]}
      position="fixed"
      top={64}
      left={0}
      right={0}
      bottom={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      Move Cursor to See Effects
    </Box>
  )
}

export default Task3
