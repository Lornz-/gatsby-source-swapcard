export const EVENT_QUERY = `
query GetEvent($eventId: [String!]) {
  events(ids: $eventId) {
    address{
      city
      country
      place
      state
      street
      type
      zipCode
    }
    bannerUrl
    beginsAt
    code
    description
    endsAt
    eventStatus
    exhibitorsTypes {
      color
      value
      position
      name
      id
      elements
    }
    htmlDescription
    id
    longitude
    latitude
    planningsCategories {
      color
      value
      position
      name
      id
      elements
    }
    planningsPlaces {
      color
      value
      position
      name
      id
      elements
    }
    planningsTypes {
      color
      value
      position
      name
      id
      elements
    }
    slug
    speakersTypes {
      color
      value
      position
      name
      id
      elements
    }
    sponsorsCategories {
      color
      value
      position
      name
      id
      elements
    }
    timezone
    title
    totalExhibitorMembers
    totalExhibitors
    totalAttendees
    totalPlannings
    totalSpeakers
    twitterHashtag
    visibility
    chatroomCount
  }
}
`

export const ATTENDEES_QUERY = `
query GetAttendees($eventId: String!, $page: Int!, $pageSize: Int!) {
  attendees (eventId: $eventId, page: $page, pageSize: $pageSize) {
    addresses{
      city
      country
      place
      state
      street
      type
      zipCode
    }
    biography
    email
    firstName
    id
    jobTitle
    lastName
    organization
    phoneNumbers {
      countryCode
      formattedNumber
      label
      number
      type
    }
    photoUrl
    secondJobTitle
    socialNetworks {
      profile
      type
    }
    status
    tags
    userId
    websiteUrl
  }
}
`

export const SPEAKERS_QUERY = `
query GetSpeakers($eventId: String!, $page: Int!, $pageSize: Int!) {
  speakers(eventId: $eventId, page: $page, pageSize: $pageSize) {
    biography
    addresses{
      city
      country
      place
      state
      street
      type
      zipCode
    }
    email
    firstName
    id
    jobTitle
    kind
    lastName
    organization
    phoneNumbers {
      countryCode
      formattedNumber
      label
      number
      type
    }
    photoUrl
    planningCount(eventId: $eventId)
    plannings(eventId: $eventId, page: 1, pageSize: 200) {
      beginsAt
      endsAt
    }
    secondJobTitle
    socialNetworks {
      profile
      type
    }
    tags
    websiteUrl
  }
}`

export const EXHIBITORS_QUERY = `
query GetExhibitors($eventId: String!, $page: Int!, $pageSize: Int!) {
  exhibitors(eventId: $eventId, page: $page, pageSize: $pageSize) {
    address{
      city
      country
      place
      state
      street
      type
      zipCode
    }
    booth
		categories
    description
    documents {
      description
      name
      type
      url
    }
    features {
      scanBadge
    }
    id
    logoUrl
    members(eventId: $eventId, page: 1, pageSize: 200) {
      addresses{
        city
        country
        place
        state
        street
        type
        zipCode
      }
      biography
      email
      firstName
      id
      jobTitle
      lastName
      organization
      phoneNumbers {
        countryCode
        formattedNumber
        label
        number
        type
      }
      photoUrl
      secondJobTitle
      socialNetworks {
        profile
        type
      }
      tags
      websiteUrl
    }
    name
    phoneNumbers {
      countryCode
      formattedNumber
      label
      number
      type
    }
    socialNetworks {
      profile
      type
    }
    totalMembers
    type
    typeLabel {
      color
      elements
      id
      name
      position
      value
    }
    websiteUrl
  }
}`

export const PLANNINGS_QUERY = `
query GetPlannings($eventId: String!, $page: Int!, $pageSize: Int!) {
  plannings(eventId: $eventId, page: $page, pageSize: $pageSize) {
    beginsAt
    categories
    configuration {
      buttons {
        backgroundColor
        id
        label {
          en
          es
          fr
        }
        options {
          appName
          badgeColor
          badgeSize
          badgeType
          chatChannels {
            id
          }
          hideCount
          href {
            android
            ios
            web
          }
        }
        picto {
          android
          ios
          web
        }
        textColor
        type
      }
      maxSeats
    }
    documents {
      description
      name
      type
      url
    }
    endsAt
    htmlDescription
    id
    latitude
    longitude
    place
    placeLabel {
      color
      elements
      id
      name
      position
      value
    }
    speakers {
      id
    }
    textDescription
    title
    totalAttendees
    twitterHashtag
    type
    typeLabel {
      color
      elements
      id
      name
      position
      value
    }
    visibility
    chatrooms {
      id
    }
  }
}`
