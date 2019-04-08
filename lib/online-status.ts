import { EventEmitter } from 'events'

const EVENTS = [
    'online',
    'offline',
    'load'
]

const offline = new EventEmitter()

export function isOnline (): boolean {
    const isOnline = window && window.navigator && window.navigator.onLine
    return isOnline || false
}

function emitStatus (): void {
    offline.emit('online-status', isOnline())
}

export function start (): EventEmitter {
    EVENTS.map((event): void => {
        window.addEventListener(event, emitStatus)
    })
    return offline
}

export function stop (): EventEmitter {
    EVENTS.map((event): void => {
        window.removeEventListener(event, emitStatus)
    })
    return offline
}
