const sectionFirst = document.getElementById("first");
const refresh = document.getElementById("refresh");


 /*
refresh get data et recreate table
 */
function createEntete(tab) {
    const enTete = ["\u23f7 prenom", "\u23f7 nom", "\u23f7 montant"];
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    enTete.forEach(val => {
        const th = document.createElement("th");
        th.innerText = val;
        trHead.appendChild(th);
    })
    thead.appendChild(trHead);
    tab.appendChild(thead);
}


function createBody(data, tab) {
    const tBody = document.createElement("tbody");
    for (let row of data) {
        const tr = document.createElement("tr");
        for (let key in row) {
            const td = document.createElement("td");
            td.innerText = row[key];
            tr.appendChild(td);
        }
        tBody.appendChild(tr);
    }
    tab.appendChild(tBody);
}

function createTable(data) {
    const div = document.createElement("div");
    const tab = document.createElement("table");
    createEntete(tab);
    createBody(data, tab);

    div.classList.add("tab");
    tab.classList.add("tableau_1");
    
    div.appendChild(tab);
    sectionFirst.appendChild(div);

    // cf fichier tri.js
    set_ids();
    add_event_onloading();
}


/*
GET
*/
async function getData() {
    return fetch('/mongoGet')
    .then(res => res.json())
    .then((data) => createTable(data));
}

async function getDataRefresh() {
    document.querySelectorAll(".tab").forEach(el => el.remove());
    getData();
}



/*
PUT
*/
const nomPut = document.getElementById("nomPut");
const prenomPut = document.getElementById("prenomPut");
const montantPut = document.getElementById("montantPut");
const putForm = document.getElementById("putForm");
const nomDel = document.getElementById("nomDel");
const prenomDel = document.getElementById("prenomDel");
const delForm = document.getElementById("delForm");

async function putData() {
    data = {
        find : {
            prenom: prenomPut.value,
            nom: nomPut.value
        },
        replace: {montant: montantPut.value}
    };
    return fetch('/mongoPut', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify(data)
    })
    .then(res => res.json());
}

async function deleteData() {
    data = {
        prenom: prenomDel.value,
        nom: nomDel.value,
    };
    return fetch('/mongoDel', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(console.log);
}

getData();
refresh.addEventListener("click", getDataRefresh);
putForm.addEventListener("click", putData);
delForm.addEventListener("click", deleteData);