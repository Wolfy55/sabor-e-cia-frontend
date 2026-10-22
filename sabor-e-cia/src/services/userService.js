import { delay, generateId, readCollection, writeCollection } from "./mockStorage";

const collection = 'usuarios'
const usersFixture = [
    {
        id: "usuario-1",
        name: 'Usuário Demo',
        email: 'demo@todolist.com',
        password: 'demo123',
        createdIn: '2026-01-01T000:00:00.000Z',
    },
]

function getAll(){
    return readCollection(collection, usersFixture)
}

async function lookById(id){
    await delay(200)
    return getAll().find((user) => user.id === id)
}

async function verifyCredentials(email, password){
    await delay(400)
    const user = getAll().find(
        (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password,
    )
    return user ?? null
}

async function create(datas){
    await delay(400)
    const users = getAll()

    if(users.some((user) => user.email.toLowerCase() === datas.email.toLowerCase())){
        throw new Error("Já existe uma conta com este e-mail.")
    }
    const newUser = {
        ...datas,
        id: generateId('user'),
        createdIn: new Date().toISOString(),
    }

    writeCollection(collection, [...users, newUser])
    return newUser
}

const userService = {
    lookById,
    verifyCredentials,
    create,
}

export {userService}