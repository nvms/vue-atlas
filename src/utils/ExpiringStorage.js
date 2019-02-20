class ExpiringStorage {
  get (key) {
    const cached = JSON.parse(window.localStorage.getItem(key))
    if (!cached) {
      return null
    }

    const expires = new Date(cached.expires)
    if (expires < new Date()) {
      window.localStorage.removeItem(key)
      return null
    }

    return cached.value
  }

  set (key, value, lifetimeInMinutes) {
    const currentTime = new Date().getTime()
    const expires = new Date(currentTime + lifetimeInMinutes * 60000)

    window.localStorage.setItem(key, JSON.stringify({ value, expires }))
  }
}

export default new ExpiringStorage()
