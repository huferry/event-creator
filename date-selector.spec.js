const dateSelector = require('./date-selector')

describe('dateSelector', () => {

    it('should returns every date in the coming two weeks', () => {
        // arrange/act
        const actual = dateSelector()
        
        // assert
        expect(actual).toHaveLength(14)
    })

    it('should returns Thursdays when filtered for Thursday', () => {
        // arrange/act
        const actual = dateSelector(d => d.is('thursday'))

        // assert
        expect(actual).toHaveLength(2)
        actual.map(d => d.get('day')).forEach(d => expect(d).toBe(4)) // 4 = thursday
    })

    it('should returns first Monday when filtered for first Monday', () => {
        // arrange/act
        const actual = dateSelector(38, d => d.isFirst('monday'))

        // assert
        expect(actual).toHaveLength(1)
        actual.map(d => d.get('day')).forEach(d => expect(d).toBe(1)) // 1 = monday
    })

    it('should returns last Tuesday when filtered for last Tuesday', () => {
        // arrange/act
        const actual = dateSelector(30, d => d.isLast('tuesday'))

        // assert
        expect(actual).toHaveLength(1)
        actual.map(d => d.get('day')).forEach(d => expect(d).toBe(2)) // 2 = tuesday
    })
})