require(`dotenv`).config()

module.exports = {
  siteMetadata: {
    title: `gatsby example using swapcard`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-swapcard`,
      // resolve: require.resolve(`..`),
      options: {
        accessToken: process.env.ACCESS_TOKEN,
        eventId: `RXZlbnRfNTIwODk=`,
      },
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: `/images/`,
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
}
