class Note {
  constructor(creator, content, id) {
    this.creator = creator;
    this.content = content;
    this.date = new Date().toDateString();
    this.id = id;
  }
}

let containerBox = document.getElementById('container-box');
const noteExample = document.getElementById('note-ex');
const noteContent = document.getElementById('note-content');
let contador = Number(localStorage.getItem('contador'));

const url = 'http://127.0.0.1:3000';

let notes = [];
let deleteNotes = [];

let userLogged = JSON.parse(localStorage.getItem('userLogged'));

//GET
if(localStorage.getItem('notes') !== null){
  notes = JSON.parse(localStorage.getItem('notes'))
  notes.forEach(note => {
    let noteContainer = document.createElement('div');
    noteContainer.innerHTML = `
    <div class="d-flex justify-content-between bg-transparent">
      <img class="m-1 bg-transparent" src="../assets/img/chinche.png" width="30px" height="30px" alt="chinche">
      <button class="m-1 btn btn-danger px-1" onclick="deleteNote(event)">X</button>
    </div>
    <div class="px-2 bg-transparent d-flex justify-content-center align-items-center">${note.content}</div>
    <div class="date-style bg-transparent text-center">${note.date}</div>
    `;
    noteContainer.classList.add('note-style', 'm-2', 'd-flex', 'flex-column', 'justify-content-between');
    noteContainer.setAttribute('id', `${note.id}`);
    containerBox.appendChild(noteContainer);

  })
}


//POST
const addNote = async (event) => {
  event.preventDefault();
  let noteContent = document.getElementById("note-content").value;
  let newNote = new Note (userLogged, noteContent, contador+1);
  contador++;
  console.log(contador);
  notes.push(newNote);

  let notesLS = JSON.stringify(notes);
  localStorage.setItem('notes', notesLS);

  document.getElementById('note-form').reset()

  let noteContainer = document.createElement('div');
  noteContainer.innerHTML = `
  <div class="d-flex justify-content-between bg-transparent">
    <img class="m-1 bg-transparent" src="../assets/img/chinche.png" width="30px" height="30px" alt="chinche">
    <button class="m-1 btn btn-danger px-1" onclick="deleteNote(event)">X</button>
  </div>
  <div class="px-2 bg-transparent d-flex justify-content-center align-items-center">${noteContent}</div>
  <div class="date-style bg-transparent text-center">${newNote.date}</div>
  `;
  noteContainer.classList.add('note-style', 'm-2', 'd-flex', 'flex-column', 'justify-content-between');
  noteContainer.setAttribute('id', `${newNote.id}`);
  containerBox.appendChild(noteContainer);

  noteExample.innerText = "Escriba una nota ..."
}

const typing = () => {
  noteExample.innerText = `${noteContent.value}`

  if(noteContent.value === ''){
    noteExample.innerText = 'Escriba una nota ...'
  }
};


//DELETE
const deleteNote = (event) => {
  let noteToDelete = event.target.parentElement.parentElement;
  containerBox.removeChild(noteToDelete);

  notes = JSON.parse(localStorage.getItem('notes'));
  deleteNotes.push(notes.find(note => note.id == noteToDelete.id));
  localStorage.setItem('deleteNotes', JSON.stringify(deleteNotes));
  notes = notes.filter(note => note.id != noteToDelete.id);
  localStorage.setItem('notes', JSON.stringify(notes));
}

//POST
const saveChanges = () => {
  notes = JSON.parse(localStorage.getItem('notes'));
  deleteNotes = JSON.parse(localStorage.getItem('deleteNotes'));
  const postNote = async (character) => {
    const response = await fetch(`${url}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(character)
    });
    // const data = await response.json();
    // console.log(data);
  }

  const notesToDelete = async (id) => {
    const response = await fetch (`${url}/notes/${id}`, {
      method: 'DELETE'
    })
  }

  if(deleteNotes !== null){
    deleteNotes.forEach(note => {
    // console.log(note.id);
    notesToDelete(note.id)
    })
  };

  localStorage.removeItem('deleteNotes');

  notes.forEach(note => {
    postNote(note)
  })

  const postContador = async (updateContador) => {
    const response = await fetch(`${url}/contador/1`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateContador)
    })
  }

  postContador({
    i: contador,
    id: 1
  })

  localStorage.setItem('contador', JSON.stringify(contador));
};

const endSesion = () => {
  window.location.assign(window.location.origin + '/index.html')
}