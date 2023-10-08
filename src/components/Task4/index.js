import { Box, TextField } from "@mui/material"

const Task4 = () => {
  const handleInputChange = (event) => {
    const value = event.target.value
    if (value) {
      let count = 0
      let charsSet = new Set()
      let prevChar = ""
      let tempCount = 0
      for (const pos in value) {
        if (parseInt(pos) === 0) {
          prevChar = value.charAt(pos)
          tempCount++
        } else {
          if (value.charAt(pos) === prevChar) {
            tempCount++
          } else {
            if (tempCount >= count) {
              if (tempCount > count) {
                charsSet.clear()
                charsSet.add(prevChar)
              } else if (tempCount === count) {
                if (!charsSet.has(prevChar)) charsSet.add(prevChar)
              }
              prevChar = value.charAt(pos)
              count = tempCount
              tempCount = 1
            } else {
              prevChar = value.charAt(pos)
              tempCount = 1
            }
          }
        }
      }
      if (tempCount === count) {
        count = tempCount
        if (!charsSet.has(prevChar)) charsSet.add(prevChar)
      } else if (tempCount > count) {
        count = tempCount
        charsSet.clear()
        charsSet.add(prevChar)
      }
      console.log([...charsSet].join(", "), "--> ", count)
    }
  }

  return (
    <Box
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <TextField
        placeholder="Please Write Something..."
        onChange={handleInputChange}
        fullWidth
        sx={{ maxWidth: 400 }}
        helperText="Please check console for result"
      />
    </Box>
  )
}

export default Task4
