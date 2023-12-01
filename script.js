const header=document.getElementById("header");
const snoContainer=document.getElementById("sno");
const bodyContainer=document.getElementById("cells-container");

const rows=100;
const columns=26;
for(let i=1;i<=columns;i++){
    const headCell=document.createElement("div");
    headCell.className="head-cell";
    if(i != 0){
         headCell.innerText=String.fromCharCode(64 + i);
    }
    header.appendChild(headCell);
}
for(let i=1;i<=rows;i++){
    const snoCell=document.createElement("div");
    snoCell.innerText=i
    snoCell.className="sno-cell";
    snoContainer.appendChild(snoCell);
}

for(let row=1;row<=rows;row++){
    const rowElement=document.createElement("div");
    rowElement.className="row";
    for(let col=1;col<=columns;col++){
        const cell=document.createElement("div");
        cell.className="cell";
        cell.contentEditable=true;
        cell.id=`${String.fromCharCode(64+col)}${row}`;
        rowElement.appendChild(cell);
        cell.addEventListener("focus",onFocusCell);
        cell.addEventListener("input",onChangeCelltext);
    }
    bodyContainer.appendChild(rowElement);
}