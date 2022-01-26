class User {
  constructor(nombre, email, contraseña) {
    this.nombre = nombre;
    this.email = email;
    this.contraseña = contraseña;
  }
}

localStorage.removeItem('userLogged');
localStorage.removeItem('contador');
localStorage.removeItem('notes');

// let users = [
//   new User("Administrador", "admin@gmail.com", "Admin1234"),
//   new User("Usuario", "user@gmail.com", "User1234")
// ];

// let usersLS = JSON.stringify(users);
// localStorage.setItem('users', usersLS);

const url = 'http://127.0.0.1:3000';
const userEmail = document.getElementById('user-email');
const userPass = document.getElementById('user-pass');




const login = (event) => {
  event.preventDefault();
  
  //pedido de datos
  const getUsers = async () => {
    let response = await fetch(`${url}/users`);
    let users = await response.json();
  
    let userFilter = users.find(user => user.email === userEmail.value);
    if(userFilter !== undefined){
      if(userEmail.classList.contains('is-invalid')){
        userEmail.classList.remove('is-invalid')
      }
      userEmail.classList.add('is-valid')
      if(userFilter.password === userPass.value){
        if(userPass.classList.contains('is-invalid')){
          userPass.classList.remove('is-invalid')
        }
        userPass.classList.add('is-valid');
        let userLogged = userFilter.name;
        localStorage.setItem('userLogged', JSON.stringify(userLogged))
        //PEDIDO DE NOTAS DEL USUARIO
        const getNotes = async () => {
          let response = await fetch(`${url}/notes`);
          let notes = await response.json();
          let userNotes = notes.filter(note => note.creator === userLogged);
          localStorage.setItem('notes', JSON.stringify(userNotes));
        }

        getNotes();

        const getContador = async () => {
          let response = await fetch(`${url}/contador`);
          let contador = await response.json();
          localStorage.setItem('contador', JSON.stringify(contador[0].i))
        }

        getContador();

        setTimeout(() => {window.location.assign(window.location.origin + '/main.html')}, 1000)
      }else{
        userPass.classList.add('is-invalid')
      }
    }else{
      if(userEmail.classList.contains('is-valid')){
        userEmail.classList.remove('is-valid')
      }
      userEmail.classList.add('is-invalid')
    }
  }
getUsers();
}


const isValid = () => {
  if(userPass.classList.contains('is-invalid')){
    userPass.classList.remove('is-invalid')
  }
  if(userEmail.classList.contains('is-invalid')){
    userEmail.classList.remove('is-invalid')
  }
}


/*Para lograr lo que quiero hacer con el check debería resolver el problema de 
que al final de la función check se me borren los datos del LS cada vez que
presiono la tecla. Lo que me sucede ahora es que no se borra, es como si las fun-
ciones asincrónicas no siguiesen un orden de reproducción. */

// const check = () => {
//   pedidoDeDatos();
//   let users = JSON.parse(localStorage.getItem('users'));
//   let userFilter = users.find(user => user.email === userEmail.value);
//   if(userFilter === undefined){
//     userEmail.classList.add('is-invalid')
//   }else{
//     if(userEmail.classList.contains('is-invalid')){
//       userEmail.classList.remove('is-invalid');
//     }
//     userEmail.classList.add('is-valid')
//   }
//   remove();
// }

