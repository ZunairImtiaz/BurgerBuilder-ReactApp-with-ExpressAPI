import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { auth, setAuthNavigatePath } from '../../store/actions/authActions';
import Spinner from '../../components/Spinner/Spinner';

function Auth(props) {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isSignin, setIsSignin ] = useState(true);

    const effectRan = useRef(true);

    useEffect(() => {
        if (effectRan.current) {
            if (!props.buildingBurger && props.authNavigatePath !== '/') {
                props.onSetNavigatePath();
            };
            return () => {
                effectRan.current = false;
            }
        };
    },[props]);

    const submitHandler = e => {
        e.preventDefault();
        props.onAuth(email, password, isSignin);
    };

    let form = (
        <form className='Form' onSubmit={submitHandler}>
            <input 
                className='Input' 
                type='email' 
                placeholder='email' 
                value={email}
                onChange={e => {setEmail(e.target.value)}} 
                />
            <input 
                className='Input' 
                type='password' 
                placeholder='password' 
                value={password} 
                onChange={e => {setPassword(e.target.value)}}
                />
            <button 
                className='Button Success'
                >{ isSignin ? 'Login' : 'Signup'}
            </button>
        </form>
    );

    if (props.loading)
        form = <Spinner/>;

    let errorMessage = null;
    if (props.error) {
        errorMessage = <p>{ props.error }</p>
    };

    let authRedirect = null;
    if (props.isAuth)
        authRedirect = <Navigate to={props.authNavigatePath} />

    return (
        <div className='ContactData'>
            <h3>Authenticate Please</h3>
            { authRedirect }
            { errorMessage }
            { form }
            <button 
                className='Button Danger' 
                onClick={() => setIsSignin(!isSignin)}
                >SWITCH TO { isSignin ? 'SIGNUP' : 'SIGNIN'}
            </button>
        </div>
    );
};

const mapStateToProps = state => ({
    loading: state.auth.loading, 
    error: state.auth.error,
    isAuth: state.auth.token != null,
    buildingBurger: state.burger.building,
    authNavigatePath: state.auth.authNavigatePath
});

const mapDispatchToProps = dispatch => ({ 
    onAuth: (email, password, isSignin) => dispatch(auth(email, password, isSignin)),
    onSetNavigatePath: () => dispatch(setAuthNavigatePath('/'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);