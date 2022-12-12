import { getLocationList } from '@root/repository/locationRepository'

export const getFreeLocation = async (req, res) => {
  try {
    const { credit } = req.body
    const locationList = await getLocationList({})
    const freeLocation = []
    const freeTime = []
    locationList.forEach((location) => {
      const busyTime = location.locationBusyTime
      for (let i = 0; i < busyTime.length - 1; i++) {
        if (busyTime[i + 1] - busyTime[i] > credit) {
          for (let j = busyTime[i] + 1; j < busyTime[i + 1]; j++) {
            freeTime.push[j]
          }
        }
      }
      freeLocation.push({ locationName: location.locationName, freeTime })
    })
    return { freeLocation }
  } catch (error) {
    res.status(500).json(error)
  }
}
