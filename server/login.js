class login {
  makeSound(num) {
    return 'Meowww ' + num;
  }//
  getLog(user,pass) {
    return {user,pass}
  }//
}
module.exports = login;