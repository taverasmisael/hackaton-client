
const APIURL = 'http://10.193.0.79:8888'
export const LoadMarkers = async () => {
  try {
    const response = await fetch(`${APIURL}/map`)
    const data = await response.json()
    return data
  } catch (err) {
    throw err
  }
}
