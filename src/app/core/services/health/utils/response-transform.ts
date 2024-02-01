import {
   IGoal,
   IHealth,
   IEmotion,
   IGoalsForm,
} from 'src/app/core/models/health.model'

export const modifyGetDesiredResponseData = (data) => {
   const { desiredGoals, goals } = data

   const valuesByName = desiredGoals.reduce(
      (result, goal) => ({
         ...result,
         [goal.name]: goal.value,
      }),
      {}
   )

   const updatedGoals = goals.map((goal: IGoal) => ({
      ...goal,
      desired: valuesByName[goal.name],
   }))

   desiredGoals.map((g) => localStorage.setItem(g.name, g.value))

   return updatedGoals
}

export const modifyGetResponseData = (data) => {
   const { day, withDesiredGoals, parsedGoals, parsedEmotions } = data

   let updatedGoals

   if (parsedGoals) {
      updatedGoals = withDesiredGoals.map((dg: IGoal) => {
         const matchingGoal =
            parsedGoals && parsedGoals.find((g: IGoal) => g.name === dg.name)
         return {
            ...dg,
            current: matchingGoal ? matchingGoal.current : 0,
         }
      })
   }
   return {
      date: day,
      emotions: parsedEmotions && parsedEmotions,
      goals: updatedGoals && updatedGoals,
   }
}

export const modifyPostResponseData = (data: IHealth) => {
   const modifiedGoals = data.goals.map((g: IGoal) => ({
      name: g.name,
      current: g.current,
   }))

   const modifiedEmotions = data.emotions.map((e: IEmotion) => ({
      id: e.id,
      name: e.name,
      active: e.active,
   }))

   const dailyLog = {
      day: data.date,
      goals: JSON.stringify(modifiedGoals),
      emotions: JSON.stringify(modifiedEmotions),
   }

   return dailyLog
}

export const modifyPostDesiredResponse = (desiredGoals: IGoalsForm) => {
   const modified = Object.keys(desiredGoals).reduce((acc, curr) => {
      return [...acc, { name: curr, value: +desiredGoals[curr] }]
   }, [])

   const res = {
      value: JSON.stringify(modified),
   }

   return res
}
