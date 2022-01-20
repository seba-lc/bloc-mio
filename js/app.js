const noteExample = document.getElementById('note-ex');
const noteContent = document.getElementById('note-content');

const typing = () => {
  noteExample.innerText = `${noteContent.value}`

  if(noteContent.value === ''){
    noteExample.innerText = 'Escriba una nota ...'
  }
};

