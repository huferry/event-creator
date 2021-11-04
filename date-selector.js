const dayjs = require('dayjs')
const localeData = require('dayjs/plugin/localeData')

dayjs.extend(localeData)

module.exports = dateSelector


function dateSelector(...args) {

    const daysInFuture = getDaysInFuture(arguments)
    const selectorFn = getSelectorFn(arguments)

    return getFutureDays(daysInFuture)
        .filter(d => !selectorFn || selectorFn(getProps(d)))
}

function getDaysInFuture(args) {
    if (args && args.length == 1 && typeof args[0] === 'number') 
        return args[0]

    if (args && args.length == 2 && typeof args[0] === 'number') 
        return args[0]

    return 14
}

function getSelectorFn(args) {
    if (args && args.length > 0 && typeof args[0] === 'function') 
        return args[0]

    if (args && args.length == 2 && typeof args[1] === 'function') 
        return args[1]

    return undefined
}


function getFutureDays(numberOfDays) {

    const today = getToday()

    return Array.from(
        {length: numberOfDays}, 
        (_, i) => today.add(i + 1, 'days'))
}

function getToday() {
    const d = new Date()
    d.setHours(0)
    d.setMinutes(0)
    d.setSeconds(0)
    d.setMilliseconds(0)

    return dayjs(d)
}

function isDayOfWeek(day, dayOfWeekName) {
    return dayjs
        .weekdays()
        .map(m => m.toLocaleLowerCase())
        .indexOf(dayOfWeekName.toLocaleLowerCase()) == day.get('day')
}

function isNthDayOfMonth(day, dayOfWeekName, n) {
    if (!isDayOfWeek(day, dayOfWeekName)) return false;

    let count = 1
    while (day.subtract(count * 7, 'days').get('month') === day.get('month')) {
        count++
    }

    return n == count
}

function isLastOfMonth(day, dayOfWeekName) {
    return isDayOfWeek(day, dayOfWeekName)
        && day.add(7, 'days').get('month') !== day.get('month')
}

function getProps(day) {
    return {
        value: day,
        is: dayOfWeekName => isDayOfWeek(day, dayOfWeekName),
        isFirst: dayOfWeekName => isNthDayOfMonth(day, dayOfWeekName, 1),
        isSecond: dayOfWeekName => isNthDayOfMonth(day, dayOfWeekName, 2),
        isThird: dayOfWeekName => isNthDayOfMonth(day, dayOfWeekName, 3),
        isFourth: dayOfWeekName => isNthDayOfMonth(day, dayOfWeekName, 4),
        isFifth: dayOfWeekName => isNthDayOfMonth(day, dayOfWeekName, 5),
        isLast: dayOfWeekName => isLastOfMonth(day, dayOfWeekName)
    }
}