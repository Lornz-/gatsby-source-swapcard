import { forEach } from "p-iteration"
import { createClient, queryAll, queryOnce } from "./swapcard"
import {
  AttendeeNode,
  SpeakerNode,
  ExhibitorNode,
  PlanningNode,
  EventNode,
} from "./nodes"
import {
  SPEAKERS_QUERY,
  ATTENDEES_QUERY,
  EXHIBITORS_QUERY,
  PLANNINGS_QUERY,
  EVENT_QUERY,
} from "./queries"
import invariant from "invariant"
import { get } from "lodash/fp"

export const sourceNodes = async (
  { actions: { createNode, touchNode }, createNodeId, store, cache },
  {
    accessToken,
    eventId,
    baseUrl = `https://developer.swapcard.com/event-admin/graphql`,
  }
) => {
  invariant(
    accessToken && accessToken.length > 0,
    `gatsby-source-swapcard requires option \`accessToken\` to be specified`
  )
  const client = createClient(baseUrl, accessToken)

  const args = {
    eventId,
    client,
    createNode,
    createNodeId,
    touchNode,
    store,
    cache,
  }

  try {
    const event = await eventDetails(args)
    await Promise.all([
      createNodes(
        `attendees`,
        ATTENDEES_QUERY,
        AttendeeNode,
        event.totalAttendees,
        args
      ),
      createNodes(
        `speakers`,
        SPEAKERS_QUERY,
        SpeakerNode,
        event.totalSpeakers,
        args
      ),
      createNodes(
        `exhibitors`,
        EXHIBITORS_QUERY,
        ExhibitorNode,
        event.totalExhibitors,
        args
      ),
    ])
    // We need the speaker IDs for the foreign keys
    await Promise.all([
      createNodes(
        `plannings`,
        PLANNINGS_QUERY,
        PlanningNode,
        event.totalPlannings,
        args
      ),
    ])
  } catch (e) {
    console.error(`An error occured while sourcing data`)
    console.log(e)
  }
}

const eventDetails = async args => {
  const data = await queryOnce(args.client, EVENT_QUERY, args.eventId)
  const event = get(`events`, data)
  const node = await EventNode(args)(event[0])
  args.createNode(node)

  return node
}

/**
 *
 * @param {string} path path to the graphql query
 * @param {string} query the graphql query to execute
 * @param {func} nodeFactory the factory function for the running node
 * @param {number} total the expected total count of resources
 * @param {object} args necessary helper functions
 */
const createNodes = async (path, query, nodeFactory, total, args) => {
  const { client, createNode, eventId } = args
  await forEach(
    await queryAll(client, [path], query, eventId, total),
    async entity => {
      const node = await nodeFactory(args)(entity)
      createNode(node)
    }
  )
}
