# Event Creator

Usage:

```javascript

const eventCreator = require('event-creator')

const events = eventCreator({
    title: 'Beer time!',
    startTime: '16:30', // local time
    endTime: '18:00'    // local time
}, d => d.isFirst('friday') || d.isThird('friday') || d.isFifth('friday'))


console.log(events)
// times are in UTC
// [{
//    "title": "Beer time!",
//    "startTime": "2021-11-05T15:30:00.000Z", 
//    "endTime": "2021-11-05T17:00:00.000Z", 
//  },
//  {
//    "title": "Beer time!",
//    "startTime": "2021-11-19T15:30:00.000Z", 
//    "endTime": "2021-11-19T17:00:00.000Z", 
// }]

```