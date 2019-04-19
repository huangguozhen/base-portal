import { registerApplication } from 'single-spa'

export function pathPrefix (prefix) {
  return function (location) {
    return location.pathname.indexOf(prefix) === 0
  }
}

export async function registerApp (name, hash, appUrl, storeUrl, globalEventDistributor) {
  let storeModule = {}
  let customProps = { globalEventDistributor }

  try {
    storeModule = storeUrl ? await SystemJS.import(storeUrl) : { storeInstance: null }
  } catch (error) {
    console.error(`Could not load store of app ${name}.`, error)
    return
  }

  if (storeModule.storeInstance && globalEventDistributor) {
    customProps.store = storeModule.storeInstance

    globalEventDistributor.registerStore(storeModule.storeInstance)
  }

  const activityFn = pathPrefix(hash)
  registerApplication(name, () => SystemJS.import(appUrl), activityFn, customProps)
}
