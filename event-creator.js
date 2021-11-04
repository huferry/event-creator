const dateSelector = require('./date-selector')
const dayjs = require('dayjs')

module.exports = eventCreator

function eventCreator(
    { title, startTime, endTime },
    selectorFunc) {

    const getIsoTime = (day, time) => dayjs(day.format('YYYY-MM-DD ') + time).toISOString()

    return dateSelector(selectorFunc)
        .map(day => {
            return {
                title,
                startTime: getIsoTime(day, startTime),
                endTime: getIsoTime(day, endTime)
            }
        })
}