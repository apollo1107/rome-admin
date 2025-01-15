const navigation = auth => {
  if (auth.user.is_superuser == true) {
    return [
      {
        title: 'Home',
        path: '/home',
        icon: 'mdi:home-outline'
      },
      {
        title: 'Event',
        path: '/event',
        icon: 'mdi:event'
      },
      {
        title: 'User',
        path: '/user',
        icon: 'mdi:account-outline'
      },
      {
        title: 'Report',
        path: '/report',
        icon: 'mdi:report'
      },
      {
        title: 'Notification',
        path: '/notification',
        icon: 'mdi:bell'
      },
      {
        title: 'Setting',
        path: '/setting',
        icon: 'mdi:cog'
      }
    ]
  } else {
    return [
      {
        title: 'Home',
        path: '/home',
        icon: 'mdi:home-outline'
      },
      {
        title: 'User',
        path: '/user',
        icon: 'mdi:account-outline'
      }
    ]
  }
}

export default navigation
