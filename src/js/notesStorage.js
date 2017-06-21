// const data = {
//   tasks: localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []
// };

export default class Note  {
  constructor() {
    this.data = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
  }

  getAllNotes() {
    return this.data;
  }

  persistData() {
    localStorage.setItem("tasks", JSON.stringify(this.data));
    alert("angaben angepasst");
  }

  saveNewNote() {
    console.log("save", this.data);
    let task = {
      id: (this.data.length || 0) +1,
      date: new Date($("#dateTo").val()).getTime(),
      create: Date.now(),
      done: false,
      title: $("#title").val(),
      description: $("#description").val(),
      importance: $("input[name='importance']:checked").val()
    };

    this.data.push(task);
    this.persistData();
  }


  sortNotes(sortBy) {
    switch(sortBy) {
      case "date":
        alert("sorting by Date");
        this.data.sort(function(a, b){return parseFloat(a.date) - parseFloat(b.date)});
        break;
      case "create":
        alert("sorting by create");
        this.data.sort(function(a, b){return parseFloat(a.create) - parseFloat(b.create)});
        break;
      case "importance":
        alert("sorting by importance");
        this.data.sort(function(a, b){return parseFloat(b.importance) - parseFloat(a.importance)});
        break;
    }
  }

  updateNote(id) {
    return true;
  }

  hideDoneNotes() {
    return this.data.filter((item) => item.done == false);
  }

  findNoteById(x) {
    return this.data.find(item => item.id == x);
  }

  toggleNoteStatus(id) {
    this.data.forEach((x) => {
      if (x.id == id ) {
        x.done =  !x.done;
        this.persistData();
      }
    })
    //let note = this.findNoteById(id);


  }

  getNoteById(id) {
    return data;
  }

}


// const data = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []

// function getAllNotes() {
//   return data;
// }
//
// function addNote() {
//   let task = {
//     id: data.length+1,
//     date: new Date($("#dateTo").val()).getTime(),
//     create: Date.now(),
//     done: false,
//     title: $("#title").val(),
//     description: $("#description").val(),
//     importance: $("input[name='importance']:checked").val()
//   };
//   data.push(task);
//   localStorage.setItem("tasks", JSON.stringify(data));
// }
//
//
// function sortNotesByDate() {
//   debugger;
//   return data.tasks.sort(function(a, b){return parseFloat(a.date) - parseFloat(b.date)});
// }
//
// function sortNotesByImportance() {
//   return data.tasks.sort(function(a, b){return parseFloat(a.importance) - parseFloat(b.importance)});
// }
//
// function sortNotesByCreate() {
//   return data.tasks.sort(function(a, b){return parseFloat(a.create) - parseFloat(b.create)});
// }
//
//
// function sortNotes(sortBy) {
//   switch(sortBy) {
//         case "date":
//           alert("sorting by Date");
//           debugger;
//           return data.sort(function(a, b){return parseFloat(a.date) - parseFloat(b.date)});
//           break;
//         case "create":
//           alert("sorting by create");
//           data.sort(function(a, b){return parseFloat(a.create) - parseFloat(b.create)});
//           break;
//         case "importance":
//           alert("sorting by importance");
//           return data.sort(function(a, b){return parseFloat(a.importance) - parseFloat(b.importance)});
//           break;
//       }
// }
//
// function updateNote() {
//
// }
//
// function getNoteById() {
//
// }
//
// export default { getAllNotes, addNote, sortNotes, sortNotesByDate, sortNotesByImportance, sortNotesByCreate, updateNote };