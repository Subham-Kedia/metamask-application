import { Box, Button, Typography } from "@mui/material"
import { useState } from "react"

const Task2 = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [count, setCount] = useState(0)

  const handleButtonClick = () => {
    setCurrentTime(new Date())
    setCount((prevState) => {
        console.log("Button Clicked %d times", prevState + 1)
        return prevState + 1
    })
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Typography variant="h3" fontWeight="fontWeightBold" mb={6}>
        {currentTime.toLocaleTimeString()}
      </Typography>
      <Button variant="contained" onClick={handleButtonClick}>
        Show Current Time
      </Button>
      <Typography variant="caption">Button Clicked {count} times</Typography>
    </Box>
  )
}

export default Task2
