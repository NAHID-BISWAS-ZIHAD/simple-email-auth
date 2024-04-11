import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.init";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const HeroRegister = () => {
    const [register, setRegister] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const emailField = e.target.email.value;
        const passField = e.target.password.value;
        const  accepted = e.target.check.checked;
        console.log(name,emailField, passField ,accepted);
        setRegister('');
        setSuccess('');
        if (passField.length < 6) {
            setRegister('Password should be at least 6 characters or longer');
            return;
        }
        else if (!/^(?=.*[A-Z])(?=.*\d)[A-Z\d]+$/.test(passField)) {
            setRegister('Password At least one Uppercase character')
            return
        }
        else if(!accepted){
            setRegister('please accept terms and condition')
            return
        }
        createUserWithEmailAndPassword(auth, emailField, passField)
            .then(result => {
                console.log(result.user);
                setSuccess('Account registerd successfully')
                updateProfile(result.user,{
                    displayName: name,
                    photoURL: "https://i.ibb.co/7YTZVyh/kindpng-2193744-1.png"
                })
                sendEmailVerification(result.user)
                .then(()=>{
                    alert('please VERIFY your email');
                })
            })
            .catch(error => {
                console.error(error);
                setRegister(error.message)
            })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="name" name="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="relative">
                                <input type={showPassword ? 'text' : 'password'} placeholder="password" name='password' className="input w-full input-bordered" required />
                                <span className="absolute top-4 right-2" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <AiFillEye></AiFillEye> : <AiFillEyeInvisible></AiFillEyeInvisible>}</span>
                            </div>
                            {
                                register && <p className="text-red-600 text-xl">{register}</p>
                            }
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <br />
                        <div className="flex items-center">
                            <input className="mr-2" type="checkbox" name="check" id="checks" />
                            <label htmlFor="checks">Accept terms and condition</label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-secondary" type="submit" value="Hero Register" />
                        </div>
                    </form>

                    {
                        success && <p className="text-green-500 text-2xl">{success}</p>
                    }
                    <div>
                        <p>Already have a account <Link to='/login'>Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroRegister;