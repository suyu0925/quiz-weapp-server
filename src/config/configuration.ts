export default () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      port: 80,
      host: 'mongo'
    }
  } else {
    return {
      port: 2333,
      host: 'localhost'
    }
  }
}
