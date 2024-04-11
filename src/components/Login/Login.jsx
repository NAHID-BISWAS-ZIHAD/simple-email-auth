import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.init";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [error,setError]= useState('');
    const [success, setSuccess] = useState('');
    const emailRef= useRef(null)
    const handleSubmit = e => {
        e.preventDefault()
        const catchEmail = e.target.email.value;
        const catchPassword = e.target.password.value;
        console.log(catchEmail, catchPassword)
        setError('')
        setSuccess('')
        signInWithEmailAndPassword(auth, catchEmail, catchPassword)
        .then(result=>{
            console.log(result);
            setSuccess('LOGIN SUCCESSFULLY')
        })
        .catch(res => {
            setError(res.message);
        })
    }
    const handleForgetPass = ()=>{
        const forget = emailRef.current.value;
        console.log(forget);
        sendPasswordResetEmail(auth,forget)
        .then(()=>{
            alert('please check email');
        })
        .catch(error => {
            console.error(error.message);
        })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input ref={emailRef}  type="email" placeholder="email" name="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                            <label className="label">
                                <a onClick={handleForgetPass} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <p>{error}</p>
                        {
                        success && <p className="text-green-500 text-2xl">{success}</p>
                    }
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <div>
                            <p>You have not a account please <Link to='/heroregister'>Create a account</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;