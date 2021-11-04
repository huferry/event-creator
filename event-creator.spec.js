const eventCreator = require('./event-creator')

describe('eventCreator', () => {

    it('should', () => {

        const actual = eventCreator({
            title: 'the title',
            startTime: '16:30',
            endTime: '18:00'
        }, d => d.is('tuesday'))

        expect(actual).toHaveLength(2)
    })

})