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
    
    let noteSwapping = document.getElementById("noteSwapClick")
    noteSwapping?.addEventListener("click", switchPlaces)

}

// Tömmer min ul och fyller den sen från scratch varje gång denna metod körs
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
  // Skriver ut listan av borttagna anteckningar
  showCompletedList();
}

// Tar bort en anteckning från översta listan och flyttar den till understa listan
function removeFromList (noteToRemove:number){
    todoList[noteToRemove].enabled = false;
    presentList(todoList);
}

// Tar tillbaka en anteckning från den understa listan till den översta
function returnToList (noteToEnable:number){
    todoList[noteToEnable].enabled = true;
    presentList(todoList);
}

// Lägger till en anteckning
function addNote() {
        var newNote:string = (<HTMLInputElement>document.getElementById("newNoteInput")).value;
        todoList.push(new Note(newNote, true));
        presentList(todoList);    
}

// Raderar en anteckning permanent
function deleteNote(noteToDelete:number) {
    todoList.splice(noteToDelete, 1);
    presentList(todoList);
}

// Visar listan av avklarade anteckningar
function showCompletedList (){
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

// Byter plats på två anteckningar i arrayen
function switchPlaces (){
    var buffer:Note;
    var newNote:string = (<HTMLInputElement>document.getElementById("swapNotePosition1")).value;
    var firstNote:number = parseInt(newNote);
    var newNote:string = (<HTMLInputElement>document.getElementById("swapNotePosition2")).value;
    var secondNote:number = parseInt(newNote);
    
    // Kontrollerar så anteckningarna båda inte är avklarade och om de båda inte är det så byts deras platser
    if (todoList[firstNote].enabled == true && todoList[secondNote].enabled == true){
    buffer = todoList[firstNote];
    todoList[firstNote] = todoList[secondNote];
    todoList[secondNote] = buffer;
    presentList(todoList);
}
}