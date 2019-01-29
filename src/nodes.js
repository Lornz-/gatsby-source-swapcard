import createNodeHelpers from "gatsby-node-helpers"
import { createRemoteFileNode } from "gatsby-source-filesystem"

const TYPE_PREFIX = `Swapcard`

const { createNodeFactory } = createNodeHelpers({
  typePrefix: TYPE_PREFIX,
})

const handleMediaFile = async (
  { url, id },
  { createNode, createNodeId, touchNode, store, cache }
) => {
  let fileNodeID

  const mediaDataCacheKey = `${TYPE_PREFIX}__Media__${id}`
  const cacheMediaData = await cache.get(mediaDataCacheKey)

  if (cacheMediaData) {
    fileNodeID = cacheMediaData.fileNodeID
    touchNode({
      nodeId: fileNodeID,
    })
    return fileNodeID
  }

  const fileNode = await createRemoteFileNode({
    url,
    store,
    cache,
    createNode,
    createNodeId,
  })

  if (fileNode) {
    fileNodeID = fileNode.id
    await cache.set(mediaDataCacheKey, {
      fileNodeID,
    })

    return fileNodeID
  }

  return undefined
}

const downloadMediaFile = async (node, args, path) => {
  if (node[path]) {
    node.localFile___NODE = await handleMediaFile(
      {
        id: node.id,
        url: node[path],
      },
      args
    )
  }
  return node
}

export const EventNode = args =>
  createNodeFactory(`Event`, async node =>
    downloadMediaFile(node, args, `bannerUrl`)
  )

export const AttendeeNode = args =>
  createNodeFactory(`Attendee`, async node =>
    downloadMediaFile(node, args, `photoUrl`)
  )

export const SpeakerNode = args =>
  createNodeFactory(`Speaker`, async node =>
    downloadMediaFile(node, args, `photoUrl`)
  )

export const ExhibitorNode = args =>
  createNodeFactory(`Exhibitor`, async node =>
    downloadMediaFile(node, args, `logoUrl`)
  )

export const PlanningNode = () =>
  createNodeFactory(`Planning`, async node => {
    if (node.speakers) {
      node.speakers___NODE = node.speakers.map(
        speaker => `Swapcard__Speaker__${speaker.id}`
      )
    }
    return node
  })
