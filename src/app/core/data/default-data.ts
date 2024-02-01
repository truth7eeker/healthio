import {
   faDroplet,
   faMoon,
   faVolleyball,
   faSun,
   faFaceSmileBeam,
   faFaceMeh,
   faFaceFrown,
   faFaceAngry,
   faFaceTired,
} from '@fortawesome/free-solid-svg-icons'

export const healthData = {
   date: new Date(),
   goals: [
      {
         id: '8C',
         name: 'water',
         metrics: 'glass',
         current: 0,
         desired: 0,
      },
      {
         id: 'F8',
         name: 'sleep',
         metrics: 'hour',
         current: 0,
         desired: 0,
      },
      {
         id: '31',
         name: 'exercise',
         metrics: 'hour',
         current: 0,
         desired: 0,
      },
      {
         id: '2F',
         name: 'outdoor',
         metrics: 'hour',
         current: 0,
         desired: 0,
      },
   ],
   emotions: [
      {
         id: 'CD',
         name: 'happy',
         active: false,
      },
      {
         id: 'B6',
         name: 'neutral',
         active: false,
      },
      {
         id: 'F0',
         name: 'sad',
         active: false,
      },
      {
         id: 'C7',
         name: 'angry',
         active: false,
      },
      {
         id: 'E7',
         name: 'tired',
         active: false,
      },
   ],
}

export const goalDescription = {
   water: {
      color: '87CBFF',
      icon: faDroplet,
      iconColor: '#14AEF9',
   },
   sleep: {
      color: 'B286FD',
      icon: faMoon,
      iconColor: '#FBF19C',
   },
   exercise: {
      color: 'B2F042',
      icon: faVolleyball,
      iconColor: '#DE6F38',
   },
   outdoor: {
      color: 'E55733',
      icon: faSun,
      iconColor: '#FBEF5C',
   },
}

export const emotionIcons = {
   happy: faFaceSmileBeam,
   neutral: faFaceMeh,
   sad: faFaceFrown,
   angry: faFaceAngry,
   tired: faFaceTired,
}

export const goalsStats = {
   water: [],
   exercise: [],
   sleep: [],
   outdoor: [],
}

export const stats = {
   water: {
      actual: 0,
      expected: 0,
   },
   sleep: {
      actual: 0,
      expected: 0,
   },
   outdoor: {
      actual: 0,
      expected: 0,
   },
   exercise: {
      actual: 0,
      expected: 0,
   },
}
