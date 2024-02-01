export const getLocalStorage = (params: string[]) => {
   const mergedParams = params.reduce(
      (acc, curr) => {
         acc[curr] = localStorage.getItem(curr)
         return acc
      },
      {} as Record<string, string | null>
   )

   return mergedParams
}
