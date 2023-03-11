// console.log("This is magic Notes+1");
let addTitle = document.getElementById("addTitle").focus();
showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text : addTxt.value
    }
    if(myObj.title!=="" || myObj.text!==""){notesObj.push(myObj);}
    localStorage.setItem("notes", JSON.stringify(notesObj));
    if( addTxt.value !== "" || addTitle.value !== ""){showNotes();}
    addTxt.value = "";
    addTitle.value = "";
    
});


// Function to Show The written Notes and save them
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title"> ${element.title===""?"No Title":element.title}</h5>
        <p  class="card-text">${element.text.replaceAll("\n", "<br/>")} </p>
        <button id="${index} "onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        
        </div>
        </div>
        `;  
        // console.log(element.title);     
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `<h4>Nothing to show! Use "Add a Note" section above to add notes</h4>`;
    }
}

// Function to delete Notes
function deleteNote(index){
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
    console.log(index)
}


// Function to delete Notes
function editNote(index){
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    // console.log(notesObj[0]);
    // console.log(index);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


// Search The Notes

let Search = document.getElementById('searchTxt');
Search.addEventListener("input",function(){
    console.log("search event fired");
    let inputVal= Search.value.toLowerCase();
    let noteCards= document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
         let cardTxt = element.getElementsByTagName('p')[0].innerText;
         let cardTitle = element.getElementsByTagName('h5')[0].innerText;
         console.log(cardTitle);
         console.log(cardTxt);
         
        if(cardTxt.toLowerCase().includes(inputVal) || cardTitle.toLowerCase().includes(inputVal)  ){
            element.style.display="block";
        }else{
            element.style.display="none";
        };
    });
});

