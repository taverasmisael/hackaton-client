import { get } from 'axios'
export const LoadMarkers = async () => {
  try {
    const response = await get(`map`)
    return response
  } catch (err) {
    throw err
  }
}
