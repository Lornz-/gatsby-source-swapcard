import React from "react"
import { Box, Button, ResponsiveContext } from "grommet"
import { push } from "gatsby"
import Logo from "!svg-react-loader!../images/logo.svg"

const Header = () => (
  <ResponsiveContext.Consumer>
    {size => (
      <Box background="white">
        <Box direction="row" justify="center" align="center">
          <Button
            plain
            onClick={() => push(`/`)}
            label="gatsby-source-swapcard"
            icon={<Logo style={{ width: size === `small` ? 100 : 150 }} />}
          />
        </Box>
      </Box>
    )}
  </ResponsiveContext.Consumer>
)

export default Header
