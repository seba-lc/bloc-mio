class Note {
  constructor(creator, content, id) {
    this.creator = creator;
    this.content = content;
    this.date = new Date().toDateString();
    this.id = id;
  }
}

let containerBox = document.getElementById('container-box')

let notes = [];

if(localStorage.getItem('notes') !== null){
  notes = JSON.parse(localStorage.getItem('notes'))
  notes.forEach(note => {
    let noteContainer = document.createElement('div');
    noteContainer.innerHTML = `
    <div class="d-flex justify-content-between bg-transparent">
      <img class="m-1 bg-transparent" src="../assets/img/chinche.png" width="30px" height="30px" alt="chinche">
      <button class="m-1 btn btn-danger px-1">X</button>
    </div>
    <div class="bg-transparent d-flex justify-content-center align-items-center">${note.content}</div>
    <div class="date-style bg-transparent text-center">${note.date}</div>
    `;
    noteContainer.classList.add('note-style', 'm-2', 'd-flex', 'flex-column', 'justify-content-between');
    noteContainer.setAttribute('id', `${note.id}`);
    containerBox.appendChild(noteContainer);

  })
}



const addNote = (event) => {
  event.preventDefault();
  let noteContent = document.getElementById("note-content").value;
  let newNote = new Note ('Seba', noteContent, notes.length+1);
  notes.push(newNote);

  let notesLS = JSON.stringify(notes);
  localStorage.setItem('notes', notesLS);

  document.getElementById('note-form').reset()

  let noteContainer = document.createElement('div');
  noteContainer.innerHTML = `
  <div class="d-flex justify-content-between bg-transparent">
    <img class="m-1 bg-transparent" src="../assets/img/chinche.png" width="30px" height="30px" alt="chinche">
    <button class="m-1 btn btn-danger px-1">X</button>
  </div>
  <div class="bg-transparent d-flex justify-content-center align-items-center">${noteContent}</div>
  <div class="date-style bg-transparent text-center">${newNote.date}</div>
  `;
  noteContainer.classList.add('note-style', 'm-2', 'd-flex', 'flex-column', 'justify-content-between');
  noteContainer.setAttribute('id', `${newNote.id}`);
  console.log(noteContainer);
  containerBox.appendChild(noteContainer);
}

