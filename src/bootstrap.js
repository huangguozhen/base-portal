import { start } from 'single-spa'
import { registerApp } from './register'
import { GlobalEventDistributor } from './distributor'

function bootstrap () {
  const globalEventDistributor = new GlobalEventDistributor()
  // 以下注册子应用，如果多个子应用必须全部注册完成才start。
  // registerApp(${name}, ${path}, ${appUrl}, ${storeUrl}, globalEventDistributor)

  start()
}

bootstrap()
