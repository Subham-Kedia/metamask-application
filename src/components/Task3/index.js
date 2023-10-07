import { useState } from "react"
import { Box } from "@mui/material"
import { green } from "@mui/material/colors"

const Task3 = () => {
  const [bgColor, setBgColor] = useState(green[50])

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event

    const yInterval = Math.floor((window.innerHeight - 64) / 28)
    const xInterval = Math.floor(window.innerWidth / 28)

    const xposition = Math.floor(clientX / xInterval) % 14
    const yPosition = Math.floor((clientY - 64) / yInterval) % 14

    if (xposition > yPosition) {
      setBgColor(green[Object.keys(green)[xposition]])
    } else {
      setBgColor(green[Object.keys(green)[yPosition]])
    }
  }
  return (
    <Box
      bgcolor={bgColor}
      position="fixed"
      top={64}
      left={0}
      right={0}
      bottom={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
      onMouseMove={handleMouseMove}
    >
      Move Cursor to See Effects
    </Box>
  )
}

export default Task3
