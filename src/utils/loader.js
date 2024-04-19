const loader =
  (setLoader) =>
  (fn) =>
  async (...args) => {
    let ok
    let result
    setLoader.value = true
    try {
      ok = true
      result = await fn(...args)
    } catch (err) {
      ok = false
      result = err
      console.error(err)
    }
    setLoader.value = false
    return ok ? Promise.resolve(result) : Promise.reject(result)
  }

export default loader
