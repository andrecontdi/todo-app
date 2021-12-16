import ReactDOM from 'react-dom';
import './loader.css';

function Loader({ showLoader }) {
  return ReactDOM.createPortal(
    <div className={`modal--container ${!showLoader ? 'hidden' : 'show'}`}>
      <div className="lds-default">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h3>We are loading your todos</h3>
    </div>,
    document.getElementById('loader-root')
  );
}

export { Loader };
