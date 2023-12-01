let activeCellId = null;
const activeCellElement = document.getElementById("active-cell");
const form = document.querySelector(".form");

const state = {};

const defaultStyle = {
  align: "left",
  bgColor: "#ffffff",
  fontFamily: "Poppins-Regular",
  fontSize: "16",
  isBold: false,
  isItalic: false,
  isUnderline: false,
  textColor: "#000000",
};

function onChangeCelltext(event) {
  let changedText = event.target.innerText;
  if (state[activeCellId]) {
    state[activeCellId].text = changedText;
  } else {
    state[activeCellId] = {...defaultStyle,text:event.target.innerText};
  }
}

form.addEventListener("change", onChangeFormData);
function onChangeFormData() {
  const options = {
    fontFamily: form.fontFamily.value,
    fontSize: form.fontSize.value,
    isBold: form.isBold.checked,
    isItalic: form.isItalic.checked,
    isUnderline: form.isUnderline.checked,
    align: form.align.value,
    textColor: form.textColor.value,
    bgColor: form.bgColor.value,
  };
  applyStyle(options);
}

function applyStyle(styles) {
  if (!activeCellId) {
    form.reset();
    alert("please select the cell to apply");
    return;
  }
  const activeCell = document.getElementById(activeCellId);
  activeCell.style.color = styles.textColor;
  activeCell.style.backgroundColor = styles.bgColor;
  activeCell.style.textAlign = styles.align;
  activeCell.style.fontWeight = styles.isBold ? "600" : "400";
  activeCell.style.fontFamily = styles.fontFamily;
  activeCell.style.fontSize = styles.fontSize + "px";
  activeCell.style.textDecoration = styles.isUnderline ? "underline" : "none";
  activeCell.style.fontStyle = styles.isItalic ? "italic" : "normal";

  state[activeCellId] = {...styles,text:activeCell.innerText};
}

function onFocusCell(event) {
  activeCellId = event.target.id;
  activeCellElement.innerText = activeCellId;

  if (state[activeCellId]) {
    resetForm(state[activeCellId]);
  } else {
    resetForm(defaultStyle);
  }
}
function resetForm(styles) {
  form.fontSize.value = styles.fontSize;
  form.fontFamily.value = styles.fontFamily;
  form.isBold.checked = styles.isBold;
  form.isItalic.checked = styles.isItalic;
  form.isUnderline.checked = styles.isUnderline;
  form.align.value = styles.align;
  form.textColor.value = styles.textColor;
  form.bgColor.value = styles.bgColor;
}

function exportData() {
  const jsonData=JSON.stringify(state);
  const blob=new Blob([jsonData],{type:"text/plain"});

  const url=URL.createObjectURL(blob);
  const link=document.createElement("a");
  link.download="data.json";
  link.href=url;
  link.click();
}

function triggerFileInput() {
  document.getElementById('fileInput').click();
}

// Function to handle file selection (you can customize this function)
function handleFileSelection() {
  // Add your logic to handle the selected file here
  const selectedFile = document.getElementById('fileInput').files[0];
  console.log('Selected File:', selectedFile);
  
  // Add any additional logic or call importData() here if needed
  // importData();
}
