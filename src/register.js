import { registerApplication } from 'single-spa'
import { GlobalEventDistributor } from './distributor'

const globalEventDistributor = new GlobalEventDistributor()

export function hashPrefix (app) {
    return function (location) {
        if (Array.isArray(app.path)) {
            return app.path.some(path => location.hash.startsWith(`#${path}`))
        }
        
        return location.hash.startsWith(`#${app.path || app.url}`)
    }
}

export function pathPrefix (app) {
    return function (location) {
        if (Array.isArray(app.path)) {
            return app.path.some(path => location.pathname.indexOf(`${path}`) === 0)
        }

        return location.pathname.indexOf(`${app.path || app.url}`) === 0
    }
}

export async function registerApp (params) {
    let storeModule = {}
    let customProps = { globalEventDistributor }

    try {
        storeModule = params.store ? await import(params.store) : { storeInstance: null }
    } catch (error) {
        console.error(`Could not load store of app ${params.name}.`, error)
        return
    }

    if (storeModule.storeInstance && globalEventDistributor) {
        // 注册到全局
        globalEventDistributor.registerStore(storeModule.storeInstance)
    }

    customProps.store = storeModule
    const activityFn = params.base ? (() => true) : pathPrefix(params)
    registerApplication(params.name, () => import(params.main), activityFn, customProps)
}