import { GraphQLClient } from "graphql-request"
import { get } from "lodash/fp"

/**
 * Create a GraphQL client
 * @param {string} baseUrl Swapcard API url
 * @param {string} accessToken A token retrieved from the Swapcard
 */
export const createClient = (baseUrl, accessToken) =>
  new GraphQLClient(baseUrl, {
    headers: {
      Authorization: `${accessToken}`,
    },
  })

/**
 * Execute a graphql query and get results without paginating
 * @param {GraphQLClient} client
 * @param {string} query A graphql query to execute
 * @param {string} eventId The event id
 * @param {number} page number of page
 * @param {number} pageSize resources per page
 */

export const queryOnce = async (
  client,
  query,
  eventId,
  page = 1,
  pageSize = 100
) =>
  await client.request(query, {
    eventId,
    page,
    pageSize,
  })

/**
 * Get all paginated data from a query
 * @param {GraphQLClient} client
 * @param {string} path the path to the query
 * @param {string} query graphql query
 * @param {string} eventId the event id
 * @param {number} totalCount expected number of resources
 * @param {number} page number of page
 * @param {number} pageSize resources per page
 * @param {array} aggregatedResponse aggregator
 */
export const queryAll = async (
  client,
  path,
  query,
  eventId,
  totalCount,
  page = 1,
  pageSize = 100,
  aggregatedResponse
) => {
  console.log(path, page, pageSize)
  const data = await queryOnce(client, query, eventId, page, pageSize)

  const nodes = get([...path], data)

  aggregatedResponse
    ? (aggregatedResponse = aggregatedResponse.concat(nodes))
    : (aggregatedResponse = nodes)

  if (aggregatedResponse.length < totalCount)
    return queryAll(
      client,
      path,
      query,
      eventId,
      totalCount,
      page + 1,
      pageSize,
      aggregatedResponse
    )

  return aggregatedResponse
}
