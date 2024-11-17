import {fs} from "fs-extra";
import {User} from"./userModel";

const filePath = "./Data/users.json";

async function getUsers(): Promise<User[] | undefined> {
  try {
    const data = await fs.readJson(filePath)
    return data.map((user: any) => new User(
      user.id, 
      user.name, 
      user.email, 
      user.password, 
      user.phone, 
      user.type, 
      user.registration, 
      user.age, 
      user.city
    ))
  }
  catch (error) {
    console.error('Error reading users file:', error)
    return undefined
  }
}

async function postUsers(newUser: User): Promise<void> {
  try {
    const users = await getUsers() || []
    users.push(newUser)
    await fs.writeJson(filePath, users)
  }
  catch (error){
    console.error('Error adding user:', error)
  }
}

export { getUsers, postUsers}
