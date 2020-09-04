export type UserInterface = {
  [key: string]: string | number | boolean | undefined
  id: number
  email: string
  password?: string
  login: boolean
}

/**
 * テスト用のユーザー
 */
export const Users: UserInterface[] = [
  {
    id: 1,
    email: 'test@example.com',
    password: 'password',
    login: true,
  },
  {
    id: 2,
    email: 'hello@example.com',
    password: 'password',
    login: true,
  },
]
export function authenticate(email: string, password: string): UserInterface {
  const user: UserInterface | undefined = Users.find((v) => {
    return v.email === email && v.password === password
  })
  if (!user) {
    return {
      id: 0,
      email: '',
      login: false,
    }
  }
  return user
}
