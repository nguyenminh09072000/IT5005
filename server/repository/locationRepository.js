import Location from '@root/models/Location';

export const getLocationList = filter => Location.find(filter);

export const findLocationAndUpdate = (filter, data) => Location.findOneAndUpdate(filter, data);
