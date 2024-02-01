import * as moment from 'moment'

export const generatePeriod = (numOfDays: number) => {
   const currDay: moment.Moment = moment().startOf('day')
   let datesInPeriod: number[] = []

   for (let i = 0; i < numOfDays; i++) {
      const prevDay = currDay.clone().subtract(i, 'days').valueOf()
      datesInPeriod.unshift(prevDay)
   }
   return datesInPeriod
}

export const findStartEndTimestamps = (numOfDays: number) => {
   const startTimestamp: number = moment().startOf('day').valueOf()
   const endTimestamp: number = moment()
      .startOf('day')
      .subtract(numOfDays, 'days')
      .valueOf()

   return {
      startTimestamp,
      endTimestamp,
   }
}

export const timestampToDate = (timestamp: number) => {
   return moment(timestamp).format('DD MMM')
}
