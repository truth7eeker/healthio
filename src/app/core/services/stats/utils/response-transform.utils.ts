import { IHealth } from 'src/app/core/models/health.model'
import { generatePeriod, timestampToDate } from './dates.utils'
import { goalsStats } from 'src/app/core/data/default-data'

export const modifyData = (data: IHealth[]) => {
   const daysInPeriod = generatePeriod(14)
   const modified = daysInPeriod.map((timestamp) => {
      const target = data.find((dailyLog) => dailyLog.date === timestamp)
      if (target) {
         return target
      }
      return { date: timestamp, emotions: [], goals: [] }
   })
   return modifyState(modified)
}

const modifyState = (state) => {
   const newGoals = { ...goalsStats }
   const newEmotions = []
 
   // reset before pushing
   Object.keys(newGoals).map((key) => (newGoals[key] = []))

   state.forEach((dailyLog) => {
      const newStateKeys = Object.keys(newGoals)

      if (dailyLog.goals.length > 0) {
         dailyLog.goals.forEach((g) => {
            if (newStateKeys.includes(g.name)) {
               newGoals[g.name].push({
                  date: timestampToDate(dailyLog.date),
                  current: g.current,
               })
            }
         })
      } else {
         newStateKeys.forEach((key) => {
            newGoals[key].push({
               date: timestampToDate(dailyLog.date),
               current: 0,
            })
         })
      }

      if (dailyLog.emotions.length > 0) {
         dailyLog.emotions.map((e) =>
            e.name === 'happy' && e.active ? newEmotions.push(e) : null
         )
      }
   })

   return { newGoals, newEmotions }
}
