import {
   faHome,
   faHeart,
   faGear,
   faChartSimple,
} from '@fortawesome/free-solid-svg-icons'

// Тут лучше подошла бы Enum. Если у тебя объект используется только в качестве "словаря" то лучше использовать Enum
export const mainRoutes = {
   login: 'login',
   register: 'register',
   home: '',
}

// Здесь хорошо было бы создать интерфейс, для свойств todayб stats и settings они имеют одинаковую структуру. Так шанс опечатки будет нулевой
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
