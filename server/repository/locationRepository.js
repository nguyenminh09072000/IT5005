import Location from '@root/models/Location'

export const getLocationList = (filter) => Location.find({ filter })
