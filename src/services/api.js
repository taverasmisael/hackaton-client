import { get } from 'axios'
export const LoadMarkers = async filter => {
  try {
    const response = await get(`/map`, {
      params: {
        filter_by_id: filter
      }
    })
    return response
  } catch (err) {
    throw err
  }
}

export const FiltersCode = {
  ALL: 1,
  OUTDATED: 2,
  UPDATED: 3
}
