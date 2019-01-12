export default interface RegisterData
{
  email: string,
  fullName: string,
  plainPassword: {
    password: string,
    passwordRepeat: string
  }
}
