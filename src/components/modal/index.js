import ReactDOM from 'react-dom';

function Modal({ openModal, children }) {
  return ReactDOM.createPortal(
    <div className={`modal--container ${!openModal ? 'hidden' : 'show'}`}>{children}</div>,
    document.getElementById('modal-root')
  );
}

export { Modal };
