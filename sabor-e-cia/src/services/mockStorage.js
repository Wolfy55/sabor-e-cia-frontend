const PREFIX = 'todolist:mock:'

function keyOf(collection){
    return `${PREFIX}${collection}`
}

function readCollection(collection, fixture){
    const key = keyOf(collection)
    const brute = localStorage.getItem(key)
    if(brute === null){
        const sown = [...fixture]
        localStorage.setItem(key, JSON.stringify(sown))
        return sown
    }

    return JSON.parse(brute)
}

function writeCollection(collection, datas){
    localStorage.setItem(keyOf(collection), JSON.stringify(datas))
}

function delay(ms){
    return new Promise((resolve) => setTimeout(resolve, ms))
}

function generateId(prefix){
    return `${prefix}-${Date.now()}-${Math.random().toString(36)}`
}

export {readCollection, writeCollection, delay, generateId}