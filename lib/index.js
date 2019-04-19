import { start } from 'single-spa'
import { GlobalEventDistributor } from './distributor'
import { registerApp } from './register'

const registedApps = [];
const globalEventDistributor = new GlobalEventDistributor()

export function register (name, hash, app, storeFn) {
  registedApps.push(registerApp(name, hash, app, storeFn, globalEventDistributor))
}

export async function bootstrap () {
  await Promise.all(registedApps)

  start()
}
