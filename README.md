# gatsby-source-swapcard [![npm version](https://badge.fury.io/js/gatsby-source-swapcard.svg)](https://badge.fury.io/js/gatsby-source-swapcard)

A plugin for sourcing data from [Swapcard](https://www.swapcard.com/) API into your Gatsby project.

This plugin makes use of the gatsby internal API in order for you to be able to run gatsby-plugin-sharp on the available images.

See the [Swapcard API Docs](https://developer.swapcard.com/event-admin/graphql) for more information on their APIs.

## Install

`npm install --save gatsby-source-swapcard`

## How to use

Configure the plugin in your `gatsby-config.js`:

```
{
  resolve: `gatsby-source-swapcard`,
  options: {
    // Swapcard API accessToken
    accessToken: process.env.ACCESS_TOKEN,
    // Your event id
    eventId: `=====`,
  },
}
```

To retrieve these information you need to ask Swapcard for an API token and then
use it in the Playground in order to get the eventId of the event you wish.
Here's an example query to get this information:

```graphql
{
  events {
    id
    title
  }
}
```

**Note:** Don't forget to set the HTTP Headers into something like:

```graphql
{
  "Authorization": "accessToken"
}
```

## How to Query

Depending on your accessToken and your enabled features you will be able to
retrieve the following information:

- event details (`allSwapcardEvent` or `swapcardEvent`)
- speakers (`allSwapcardSpeakers` or `swapcardSpeaker`)
- planning (`allSwapcardPlanning` or `swapcardPlanning`)
- attendees (`allSwapcardAttendee` or `swapcardAttendee`)
- exhibitors (`allSwapcardExhibitor` or `swapcardExhibitor`)

The available fields on each resource are the same as retrieved from the API
Whenever a resource has an associated image you can run `gatsby-plugin-sharp` on
the node as the following example:

```graphql
{
  allSwapcardAttendee {
    edges {
      node {
        id
        lastName
        firstName
        localFile {
          childImageSharp {
            fluid(maxWidth: 600) {
              src
              srcSet
              ...
            }
          }
        }
      }
    }
  }
}
```
