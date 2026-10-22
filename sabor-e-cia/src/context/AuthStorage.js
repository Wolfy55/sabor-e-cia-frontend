const key_section = 'todolist:section'

function readPersistedUserId(){
    return localStorage.getItem(key_section)
}

function persistUserId(userId){
    if(userId){
        localStorage.setItem(key_section, userId)
    }
    else{
        localStorage.removeItem(key_section)
    }
}

export { readPersistedUserId, persistUserId }