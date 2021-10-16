const host = window.location.hostname
const port = 3312
const reconnectInterval = 1000

const url = `ws://${host}:${port}`

let socket = null

const subscriptions = new Map()

export const subscribe = (sub) => {
  subscriptions.set(sub.id, sub)
  console.log("subscribing", sub.id)
  window.socket = socket
  if (socket.readyState === socket.OPEN) {
    socket.send(JSON.stringify(sub))
  }
}

export const unsubscribe = (sub) => {
  subscriptions.delete(sub.id)
  console.log("unsubscribing", sub.id)
}

const onSocketOpen = () => {
  console.log("Websocket connected")
  subscriptions.forEach((sub) => {
    sub.action = 'subscribe'
    socket.send(JSON.stringify(sub))
  })
}

const onSocketMessage = (event) => {
  const {id, text} = JSON.parse(event.data)
  const subscription = subscriptions.get(id)
  if (subscription && typeof subscription.handle === 'function') {
    subscription.handle(text)
  }
}

const onSocketClose = () => {
  console.log("socket closed, retrying connection...")
  setTimeout(initSocket, reconnectInterval)
}

const destroySocket = () => {
  socket.removeEventListener('open', onSocketOpen)
  socket.removeEventListener('message', onSocketMessage)
  socket.removeEventListener('close', onSocketClose)
  socket = null
}

const initSocket = () => {
  if (socket != null) { destroySocket() }
  socket = new WebSocket(url)
  socket.addEventListener('open', onSocketOpen)
  socket.addEventListener('message', onSocketMessage)
  socket.addEventListener('close', onSocketClose)
}

initSocket()
