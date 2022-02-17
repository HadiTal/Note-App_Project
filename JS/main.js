//Variable
const btnAddNote = document.getElementById("btn-add-note");
const textTittle = document.querySelector("#note-tittle");
const textMessage = document.querySelector("textarea");
const NoteListParent = document.querySelector(".notes");
let counter;
let myNotes = getNoteFromLocalStorage();
let isEdit = false;
let id;

//constion starting

if (myNotes.length === 0) {
    counter = 0;
} else {
    myNotes = myNotes[myNotes.length - 1];

    myNotes = myNotes.countertext;

    myNotes = myNotes.slice(13);

    myNotes = Number(myNotes);
    counter = myNotes;
}

//eventListner

btnAddNote.addEventListener("click", newNote);

NoteListParent.addEventListener("click", removeNote);
NoteListParent.addEventListener("click", editNote);

document.addEventListener("DOMContentLoaded", localStorageOnLoad);

//Function

//Add new Note
function newNote(e) {
    e.preventDefault();

    //acess value textTittle and textMessage
    const txtTittle = textTittle.value;
    const txtMessage = textMessage.value;

    if (txtTittle === "" || txtMessage === "") {
        window.alert("برای افزودن یاداشت ، عنوان و متن یاداشت خود را وارد کنید");
    } else {
        if (isEdit === true) {
            let myNotes = getNoteFromLocalStorage();
            isEdit = false;

            myNotes.forEach((iteam, index) => {
                if (iteam.countertext === id) {
                    iteam.titeText = txtTittle;
                    iteam.messageText = txtMessage;
                    localStorage.setItem("note", JSON.stringify(myNotes));
                    window.alert("اطلاعات  یاداشت شما ویرایش شد");
                }

                console.log(NoteListParent.children);

                const arrayChildElement = Array.from(NoteListParent.children);

                textTittle.value = "";
                textMessage.value = "";

                arrayChildElement.forEach((element) => {
                    element.remove();
                });

                myNotes.forEach((element) => {
                    const parentMyNotes = document.createElement("div");
                    parentMyNotes.classList.add("note-conatiner");

                    const noteCounter = document.createElement("p");
                    noteCounter.classList.add("note-counter");
                    noteCounter.appendChild(
                        document.createTextNode(`${element.countertext}`)
                    );

                    const noteTittle = document.createElement("h3");
                    noteTittle.classList.add("note-tittle");
                    noteTittle.appendChild(document.createTextNode(element.titeText));

                    const noteText = document.createElement("p");
                    noteText.classList.add("note-text");
                    noteText.appendChild(document.createTextNode(element.messageText));

                    const btnContainer = document.createElement("div");
                    btnContainer.classList.add("container-btn");

                    const delBtn = document.createElement("button");
                    delBtn.classList.add("del-note");
                    delBtn.appendChild(document.createTextNode("حدف یادداشت "));

                    const editNote = document.createElement("button");
                    editNote.classList.add("edit-node");
                    editNote.appendChild(document.createTextNode("ویرایش یادداشت "));

                    //addElement to vraiable parentMyNotes
                    parentMyNotes.appendChild(noteCounter);
                    parentMyNotes.appendChild(noteTittle);
                    parentMyNotes.appendChild(noteText);
                    parentMyNotes.appendChild(btnContainer);
                    btnContainer.appendChild(delBtn);
                    btnContainer.appendChild(editNote);

                    document.querySelector(".notes").appendChild(parentMyNotes);
                });
            });
        } else if (isEdit === false) {
            console.log(counter);

            let myNotes = getNoteFromLocalStorage();

            if (myNotes.length !== null) {
                for (let i = 0; i < myNotes.length; i++) {
                    if (i === myNotes.length - 1) {
                        counter = i + 1;
                    }
                }
            }

            if (myNotes.length === 0) {
                counter = 0;
                counter = counter + 1;
            } else {
                counter = counter + 1;
            }

            //create Elements MyNotes

            const parentMyNotes = document.createElement("div");
            parentMyNotes.classList.add("note-conatiner");

            const noteCounter = document.createElement("p");
            noteCounter.classList.add("note-counter");
            noteCounter.appendChild(
                document.createTextNode(`یادداشت شماره : ${counter}`)
            );

            const noteTittle = document.createElement("h3");
            noteTittle.classList.add("note-tittle");
            noteTittle.appendChild(document.createTextNode(txtTittle));

            const noteText = document.createElement("p");
            noteText.classList.add("note-text");
            noteText.appendChild(document.createTextNode(txtMessage));

            const btnContainer = document.createElement("div");
            btnContainer.classList.add("container-btn");

            const delBtn = document.createElement("button");
            delBtn.classList.add("del-note");
            delBtn.appendChild(document.createTextNode("حذف یادداشت "));

            const editNote = document.createElement("button");
            editNote.classList.add("edit-node");
            editNote.appendChild(document.createTextNode("ویرایش یادداشت "));

            //addElement to vraiable parentMyNotes
            parentMyNotes.appendChild(noteCounter);
            parentMyNotes.appendChild(noteTittle);
            parentMyNotes.appendChild(noteText);
            parentMyNotes.appendChild(btnContainer);
            btnContainer.appendChild(delBtn);
            btnContainer.appendChild(editNote);

            document.querySelector(".notes").appendChild(parentMyNotes);

            addToMyNoteToLocalStrage(noteCounter.textContent, txtTittle, txtMessage);

            window.alert("یاداشت شما با موفقیعت ذخیره شد");

            textMessage.value = "";
            textTittle.value = "";
        }
    }
}

//remove note

function removeNote(e) {
    if (e.target.classList.contains("del-note")) {
        e.target.parentElement.parentElement.remove();
        const counterText =
            e.target.parentElement.parentElement.children[0].textContent;
        const tittleText =
            e.target.parentElement.parentElement.children[1].textContent;
        const messageText =
            e.target.parentElement.parentElement.children[2].textContent;

        removeMyNotesFromLocalStroage(counterText, tittleText, messageText);
    }
}

//Adding Note to the Local Storage
function addToMyNoteToLocalStrage(counter, tittle, message) {
    const myNotes = getNoteFromLocalStorage();

    myNotes.push({
        countertext: counter,
        titeText: tittle,
        messageText: message,
    });

    console.log(myNotes);

    localStorage.setItem("note", JSON.stringify(myNotes));

    console.log(myNotes);

    if (myNotes.length !== 0) {
        document.querySelector(".txt-para").classList.add("display");
    }
}

//get note from local storage
function getNoteFromLocalStorage() {
    let note;

    let getFromLocalStorage = localStorage.getItem("note");

    if (getFromLocalStorage === null) {
        note = [];
    } else {
        note = JSON.parse(getFromLocalStorage);
    }

    return note;
}

function localStorageOnLoad() {
    const myNotes = getNoteFromLocalStorage();

    myNotes.forEach((element) => {
        const parentMyNotes = document.createElement("div");
        parentMyNotes.classList.add("note-conatiner");

        const noteCounter = document.createElement("p");
        noteCounter.classList.add("note-counter");
        noteCounter.appendChild(document.createTextNode(`${element.countertext}`));

        const noteTittle = document.createElement("h3");
        noteTittle.classList.add("note-tittle");
        noteTittle.appendChild(document.createTextNode(element.titeText));

        const noteText = document.createElement("p");
        noteText.classList.add("note-text");
        noteText.appendChild(document.createTextNode(element.messageText));

        const btnContainer = document.createElement("div");
        btnContainer.classList.add("container-btn");

        const delBtn = document.createElement("button");
        delBtn.classList.add("del-note");
        delBtn.appendChild(document.createTextNode("حذف یادداشت "));

        const editNote = document.createElement("button");
        editNote.classList.add("edit-node");
        editNote.appendChild(document.createTextNode("ویرایش یادداشت "));

        //addElement to vraiable parentMyNotes
        parentMyNotes.appendChild(noteCounter);
        parentMyNotes.appendChild(noteTittle);
        parentMyNotes.appendChild(noteText);
        parentMyNotes.appendChild(btnContainer);
        btnContainer.appendChild(delBtn);
        btnContainer.appendChild(editNote);

        document.querySelector(".notes").appendChild(parentMyNotes);
    });

    console.log(myNotes);

    if (myNotes.length === 0) {
        console.log("yes");
        document.querySelector(".txt-para").classList.remove("display");
    }
}

function removeMyNotesFromLocalStroage(counter, title, message) {
    const myNotes = getNoteFromLocalStorage();

    myNotes.forEach((iteam, index) => {
        if (
            iteam.countertext === counter &&
            iteam.titeText === title &&
            iteam.messageText === message
        ) {
            myNotes.splice(index, 1);
        }
    });

    console.log(myNotes);

    myNotes.forEach((element, index) => {
        element.countertext = `یادداشت شماره : ${index + 1}`;
    });

    localStorage.setItem("note", JSON.stringify(myNotes));

    const arrayChildElement = Array.from(NoteListParent.children);

    arrayChildElement.forEach((element) => {
        element.remove();
    });

    myNotes.forEach((element) => {
        const parentMyNotes = document.createElement("div");
        parentMyNotes.classList.add("note-conatiner");

        const noteCounter = document.createElement("p");
        noteCounter.classList.add("note-counter");
        noteCounter.appendChild(document.createTextNode(`${element.countertext}`));

        const noteTittle = document.createElement("h3");
        noteTittle.classList.add("note-tittle");
        noteTittle.appendChild(document.createTextNode(element.titeText));

        const noteText = document.createElement("p");
        noteText.classList.add("note-text");
        noteText.appendChild(document.createTextNode(element.messageText));

        const btnContainer = document.createElement("div");
        btnContainer.classList.add("container-btn");

        const delBtn = document.createElement("button");
        delBtn.classList.add("del-note");
        delBtn.appendChild(document.createTextNode("حذف یادداشت "));

        const editNote = document.createElement("button");
        editNote.classList.add("edit-node");
        editNote.appendChild(document.createTextNode("ویرایش یادداشت "));

        //addElement to vraiable parentMyNotes
        parentMyNotes.appendChild(noteCounter);
        parentMyNotes.appendChild(noteTittle);
        parentMyNotes.appendChild(noteText);
        parentMyNotes.appendChild(btnContainer);
        btnContainer.appendChild(delBtn);
        btnContainer.appendChild(editNote);

        document.querySelector(".notes").appendChild(parentMyNotes);
    });

    if (myNotes.length === 0) {
        document.querySelector(".txt-para").classList.remove("display");
    }
}

function editNote(e) {
    if (e.target.classList.contains("edit-node")) {
        const counterText =
            e.target.parentElement.parentElement.children[0].textContent;
        const tittleText =
            e.target.parentElement.parentElement.children[1].textContent;
        const messageText =
            e.target.parentElement.parentElement.children[2].textContent;
        isEdit = true;
        id = counterText;
        textTittle.value = tittleText;
        textMessage.value = messageText;
    }
}