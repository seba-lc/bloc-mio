class User {
  constructor(nombre, email, contraseña) {
    this.nombre = nombre;
    this.email = email;
    this.contraseña = contraseña;
  }
}

let users = [
  new User("Administrador", "admin@gmail.com", "Admin1234"),
  new User("Usuario", "user@gmail.com", "User1234")
];

let usersLS = JSON.stringify(users);
localStorage.setItem('users', usersLS);

const userEmail = document.getElementById('user-email');
const userPass = document.getElementById('user-pass');

const login = (event) => {
  event.preventDefault();
  let userFilter = users.find(user => user.email === userEmail.value);
  if(userFilter){
    userEmail.classList.add('is-valid')
    if(userFilter.contraseña === userPass.value){
      localStorage.setItem('userLogged', JSON.stringify(userFilter))
      window.location.assign(window.location.origin + '/main.html')
    }else{
      userPass.classList.add('is-invalid')
    }
  }
}

// userEmail.addEventListener('click', isValid)

const isValid = () => {
  if(userPass.classList.contains('is-invalid')){
    userPass.classList.remove('is-invalid')
  }
  if(userEmail.classList.contains('is-invalid')){
    userEmail.classList.remove('is-invalid')
  }
}

const check = () => {
  let userFilter = users.find(user => user.email === userEmail.value);
  if(userFilter === undefined){
    userEmail.classList.add('is-invalid')
  }else{
    if(userEmail.classList.contains('is-invalid')){
      userEmail.classList.remove('is-invalid');
    }
    userEmail.classList.add('is-valid')
  }
}

