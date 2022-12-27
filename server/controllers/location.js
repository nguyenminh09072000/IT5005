import {getLocationList} from '@root/repository/locationRepository';
import {findClass} from '@root/repository/classRepository';

export const getFreeLocation = async (req, res) => {
    try {
        const {credit} = req.body;
        const locationList = await getLocationList({});
        const freeLocation = [];
        const freeTime = [];
        locationList.forEach(location => {
            const busyTime = location.locationBusyTime;
            for (let i = 0; i < busyTime.length - 1; i++) {
                if (busyTime[i + 1] - busyTime[i] > credit) {
                    for (let j = busyTime[i] + 1; j < busyTime[i + 1]; j++) {
                        freeTime.push(j);
                    }
                }
            }
            if (60 - busyTime[busyTime.length - 1] > credit) {
                for (let k = busyTime[busyTime.length - 1] + 1; k <= 60; k++) {
                    freeTime.push(k);
                }
            }
            freeLocation.push({locationName: location.locationName, freeTime});
        });
        return res.json(freeLocation);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getAllLocation = async (req, res) => {
    try {
        const data = await getLocationList();
        return res.json(data);
    } catch (error) {
        res.status(500).json(error);
    }
};
