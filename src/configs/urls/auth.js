export default {
  meEndpoint: '/profile',
  loginEndpoint: '/auth/login/',
  registerEndpoint: '/auth/register/',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken', // logout | refreshToken
  storageUserDataKeyName: 'userData'
}
