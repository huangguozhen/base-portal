import { start } from 'single-spa'
import { registerApp } from './register'

async function bootstrap () {
    const config = await import('./distributor')
    console.log(config)
    // config.projects.forEach(params => registerApp(params))

    start()
}

bootstrap()