import { EventEmitter } from 'events'
import { isOnline } from './online-status'

interface IMonitorOptions {
    timeout: number,
    callback(): boolean
}

interface IMonitor {
    start (): EventEmitter,
    stop (): EventEmitter
}

interface IStartBeat {
    (): EventEmitter
}

const TIMEOUT = 3000 // 3s
const DEFAULT_OPTIONS: IMonitorOptions = {
    timeout: TIMEOUT,
    callback: (): boolean => true
}
const notify: EventEmitter = new EventEmitter()
let timeoutId: number|undefined = undefined

function startBeat (options: IMonitorOptions = DEFAULT_OPTIONS): IStartBeat {
    if (options && (typeof options.callback === 'function')) {
        timeoutId = setTimeout((): void => {
            const isAlive = options.callback() === true
            notify.emit('status', isOnline() && isAlive)
            startBeat(options)
        }, options.timeout)
    }

    return function start (): EventEmitter {
        return notify
    }
}

function stopBeat (): EventEmitter {
    clearTimeout(timeoutId)
    return notify
}

export function monitor (options: IMonitorOptions = DEFAULT_OPTIONS): IMonitor {
    const start = startBeat(options)

    return {
        start,
        stop: stopBeat
    }
}
