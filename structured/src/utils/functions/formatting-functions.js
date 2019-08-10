import {calendarAvailabilityColors, colors} from "./styles-base";

export const getIntensityFromLevel = level => {
    switch (level) {
        case 0:
            return "Low intensity";
        case 1:
            return "Medium intensity";
        case 2:
            return "High intensity";
        default:
            return "Medium intensity";
    }
};

export const getComplexityFromLevel = level => {
    switch (level) {
        case 0:
            return "Beginner";
        case 1:
            return "Intermediate";
        case 2:
            return "Advanced";
        default:
            return "Intermediate";
    }
};

const MONDAY = 1;
const SUNDAY = 0;

export const formatFromSecondsHMS = timeInSeconds => {
    let hours = ~~(timeInSeconds / 3600);
    let minutes = ~~((timeInSeconds % 3600) / 60);
    let seconds = ~~timeInSeconds % 60;
    let returnValue = "";
    if (hours > 0) {
        returnValue += "" + hours + ":" + (minutes < 10 ? "0" : "");
    }
    returnValue += "" + minutes + ":" + (seconds < 10 ? "0" : "");
    returnValue += "" + seconds;
    return returnValue;
};

export const dateToIsoStringShort = date => {
    const dateVar = new Date(date);
    return dateVar.toISOString().split("T")[0];
};

const isLastDayOfMonth = date => {
    let dateObject = new Date(date.day);
    dateObject.setDate(dateObject.getDate() + 1);
    return dateObject.getDate() === 1;
};

export const formatDayToCalendarMarkedDate = date => {
    let dateObject = new Date(date.day);
    let today = new Date();
    let startingDay = false;

    if (
        (dateObject.getUTCDate() === today.getUTCDate() &&
            dateObject.getUTCMonth() === today.getUTCMonth()) ||
        dateObject.getDay() === MONDAY ||
        dateObject.getUTCDate() === 1
    ) {
        startingDay = true;
    }
    let endingDay = false;

    if (isLastDayOfMonth(date) || dateObject.getDay() === SUNDAY) {
        endingDay = true;
    }
    let textColor = getColorFromAvailability(date.availableAppointmentsInPerc);
    if (startingDay === endingDay) {
        return {
            startingDay: startingDay,
            endingDay: endingDay,
            textColor: textColor,
            color: colors.calendarHighlightColor
        };
    } else if (startingDay && !endingDay) {
        return {
            startingDay: startingDay,
            textColor: textColor,
            color: colors.calendarHighlightColor
        };
    } else {
        return {
            endingDay: endingDay,
            textColor: textColor,
            color: colors.calendarHighlightColor
        };
    }
};

const getColorFromAvailability = availableAppointmentsInPercentages => {
    let {
        highAvailability,
        mediumAvailability,
        lowAvailability,
        noAvailability
    } = calendarAvailabilityColors;
    if (availableAppointmentsInPercentages > 70) {
        return highAvailability;
    } else if (availableAppointmentsInPercentages > 40) {
        return mediumAvailability;
    } else if (availableAppointmentsInPercentages > 0) {
        return lowAvailability;
    } else if (availableAppointmentsInPercentages === 0) {
        return noAvailability;
    } else {
        return noAvailability;
    }
};
