const modal = document.getElementById("modal");
const modalP = document.getElementById("modal-text");


const showModal = (message) => {
  modalP.innerText = message;
  modal.style.display = "flex";
};

const closeModal = () => {
  modal.style.display = "none";
};

export { showModal, closeModal };
