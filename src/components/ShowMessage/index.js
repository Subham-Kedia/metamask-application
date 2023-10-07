import PropTypes from "prop-types"
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"

const ShowMessage = ({
  message,
  title,
  containerProps,
  titleProps,
  sx,
  children,
  ...restProps
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width={1}
      height={1}
      {...containerProps}
    >
      <Avatar
        variant="square"
        src="/assets/empty.svg"
        alt="Info"
        sx={{
          height: 150,
          width: 150,
          my: 2,
          p: 1,
          opacity: 0.8,
          ...sx,
        }}
        {...restProps}
      />

      {title && (
        <Typography
          variant="h4"
          align="center"
          fontWeight="fontWeightBold"
          sx={{
            backgroundImage: (theme) =>
              `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          mb={2}
          {...titleProps}
        >
          {title}
        </Typography>
      )}
      {message && (
        <Typography align="center" color="text.disabled">
          {message}
        </Typography>
      )}
      {children}
    </Box>
  )
}

ShowMessage.propTypes = {
  message: PropTypes.string,
  title: PropTypes.string,
  sx: PropTypes.object,
  containerProps: PropTypes.object,
  titleProps: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

ShowMessage.defaultProps = {
  title: "Empty!!",
  message: "Result not found",
  sx: {},
  containerProps: {},
  titleProps: {},
  children: null,
}

export default ShowMessage
