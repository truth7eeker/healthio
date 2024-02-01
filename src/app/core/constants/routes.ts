import {
   faHome,
   faHeart,
   faGear,
   faChartSimple,
} from '@fortawesome/free-solid-svg-icons'

export const mainRoutes = {
   login: 'login',
   register: 'register',
   home: '',
}

export const homeRoutes = {
   today: {
      route: 'today',
      title: 'Today',
      icon: faHome,
   },
   // vital: {
   //     route: 'vital',
   //     title: 'Vital Signs',
   //     icon: faHeart
   // },
   stats: {
      route: 'stats',
      title: 'Stats',
      icon: faChartSimple,
   },
   settings: {
      route: 'settings',
      title: 'Settings',
      icon: faGear,
   },
}
