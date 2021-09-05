import shorthash from 'shorthash'

const simpleMode = true

function simpleEncode(roomName){
  return `${roomName}/${roomName}`
}

function simpleDecode(roomCode){
  const [code, roomName] = roomCode.split('/')

  if (code !== roomName){
    throw 'Bad code!'
  }

  return roomName;
}

function getRoomHash(key, roomName) {
  return shorthash.unique(`${key}${roomName}`)
}

function encodeRoom(roomName) {

  if ( simpleMode){
    return simpleEncode(roomName)
  }

  const key = (+new Date).toString(36).slice(-5)
  const hash = getRoomHash(key, roomName)
  const roomCode = `${key}${hash}/${roomName}`

  return roomCode

}

function decodeRoom(roomCode) {

  if (simpleMode){
    return simpleDecode(roomCode)
  }

  try {

    const key = roomCode.substr(0, 5)
    const [hash, roomName] = roomCode.slice(5).split('/')

    const computedHash = getRoomHash(key, roomName)

    if (hash !== computedHash) {
      throw 'Bad room hash'
    }

    return roomName

  } catch(e) {

    console.error(e);
    throw 'Invalid room code'

  }

}

export {encodeRoom}
export {decodeRoom}
