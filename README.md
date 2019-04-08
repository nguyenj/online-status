# online-status-event

Wrapper around
[`window.navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine)
to let you know when your network is up or down.

## Install

```
$ npm online-status-event
```

## Usage

```
import { isOnline, start, stop } from 'online-status-event'

function handleOnlineStatus (status) {
    if (status) {
        // do something if online
    } else {
        // do something if offline
    }
}

// Manual check if the status is online or offline
handleOnlineStatus(isOnline())

// Listen to status changes and handle it accordingly
const statusEvent = start()
statusEvent.on('status', handleOnlineStatus)
```

## API

### Functions

| Function | Arguments | Returns | Description |
===
| `isOnline` | none | boolean | Checks network status |
| `start` | none | object | Starts listening to status changes |
| `stop` | none | object | Stops listening to status changes |

### Events
| Name | Params | Description |
===
| `status` | status(boolean) | Emits a status event with one boolean param value to indicate network status |

## License

MIT Copyright (c) 2019 [John Nguyen](https://jnguyen.me)
