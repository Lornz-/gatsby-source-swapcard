import React from "react"
import { Box, Grommet, Paragraph, Anchor } from "grommet"
import { Github, Install } from "grommet-icons"
import { customTheme } from "../theme"
import Logo from "!svg-react-loader!../images/logo.svg"
import Header from "../components/Header"

const IndexPage = () => (
  <Grommet fill full theme={customTheme}>
    <Box background="brand" fill>
      <Header />
      <Box
        align="center"
        justify="center"
        fill="vertical"
        margin={{ horizontal: `small` }}
      >
        <Box
          round="horizontal"
          elevation
          background="white"
          align="center"
          pad={{ horizontal: `medium` }}
        >
          <Paragraph size="medium" textAlign="left">
            This gatsby plugin enables you to pull in your Swapcard data in form
            of gatsby nodes.The plugin requires a valid <b>accessToken</b> and
            <b> eventId</b> to work.
          </Paragraph>
          <Paragraph size="medium" textAlign="left">
            Gatsby-source-swapcard makes use of the gatsby internal API in order
            for you to be able to run gatsby-plugin-sharp on the product images.
          </Paragraph>
          <Box
            flex={false}
            direction="row"
            align="center"
            justify="center"
            gap="small"
          >
            <Anchor
              target="_blank"
              a11yTitle="Look it up on NPM"
              href="https://www.npmjs.com/package/gatsby-source-swapcard"
              icon={<Install color="brand" size="large" />}
            />
            <Anchor
              target="_blank"
              a11yTitle="Share feedback on Github"
              href="https://github.com/oorestisime/gatsby-source-swapcard"
              icon={<Github color="brand" size="large" />}
            />
            <Anchor
              target="_blank"
              a11yTitle="Swapcard"
              href="https://www.swapcard.com/"
              icon={<Logo style={{ width: 100 }} />}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  </Grommet>
)

export default IndexPage
