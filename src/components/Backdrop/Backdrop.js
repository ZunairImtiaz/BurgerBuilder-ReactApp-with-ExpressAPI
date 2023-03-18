import './Backdrop.css';

const Backdrop = props => (
    props.show ? (<div className='Backdrop' onClick={props.closeBackdrop}></div>) : null
);

export default Backdrop;