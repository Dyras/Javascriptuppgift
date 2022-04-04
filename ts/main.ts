class Note{
    note:string;
    enabled:boolean;
constructor(note:string, enabled:boolean){
this.note = note;
this.enabled = enabled;
}
}

var todoList:Note[] = [new Note("Kom ihåg att köpa mjölk", true), new Note("Glöm inte tandkräm!", true), new Note("Bli klar med tentan innan torsdag nästa vecka!", true)];

window.onload = function() {
    presentList(todoList);
    let noteToAdd = document.getElementById("noteField");
    noteToAdd?.addEventListener("click", addNote)

}

function presentList (todoList:Note[]){
    let ul:HTMLElement = document.getElementById("todoListUl")!;
    ul.innerHTML = " "
    for (let i:number = 0; i < todoList.length; i++) {
        if (todoList[i].enabled == true){
    let newLi:HTMLLIElement = document.createElement("li");
    let newLiButton:HTMLButtonElement = document.createElement("button");
    newLiButton.innerHTML = "Markera som klar";
    newLi.appendChild(newLiButton);
    newLi.innerHTML = todoList[i].note + "\t";
    newLi.id = JSON.stringify(i);
    newLiButton.addEventListener ("click", function(){
        removeFromList(i);
    });
    newLi.appendChild(newLiButton);
    ul.appendChild(newLi);
}
  }
  showRemovedList();
}

function removeFromList (noteToRemove:number){
    todoList[noteToRemove].enabled = false;
    presentList(todoList);
}

function returnToList (noteToEnable:number){
    todoList[noteToEnable].enabled = true;
    presentList(todoList);
}

function addNote() {
        var newNote:string = (<HTMLInputElement>document.getElementById("newNoteInput")).value;
        todoList.push(new Note(newNote, true));
        presentList(todoList);    
}

function deleteNote(noteToDelete:number) {
    todoList.splice(noteToDelete, 1);
    console.log("Debug")
    presentList(todoList);
}

function showRemovedList (){
    let ul:HTMLElement = document.getElementById("finishedListUl")!;

    ul.innerHTML = " "
    for (let i:number = 0; i < todoList.length; i++) {
        if (todoList[i].enabled == false){
    let newLi:HTMLLIElement = document.createElement("li");
    let restoreButton:HTMLButtonElement = document.createElement("button");
    restoreButton.innerHTML = "Återställ";
    newLi.appendChild(restoreButton);
    newLi.innerHTML = todoList[i].note + "\t";
    newLi.id = JSON.stringify(i);
    restoreButton.addEventListener ("click", function(){
        returnToList(i);
    });
    newLi.appendChild(restoreButton);
    let deleteButton:HTMLButtonElement = document.createElement("button");
    deleteButton.innerHTML = "Radera";
    deleteButton.addEventListener ("click", function(){
        deleteNote(i);
    });
    newLi.appendChild(deleteButton);
    ul.appendChild(newLi);
}
  }
}

function switchPlaces (firstNote:number, secondNote:number){
    var buffer:Note;
    buffer = todoList[firstNote];
    todoList[firstNote] = todoList[secondNote];
    todoList[secondNote] = buffer;
    presentList(todoList);
}