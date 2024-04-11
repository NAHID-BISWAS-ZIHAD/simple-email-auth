
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.init";

const Register = () => {
    const handleSubmit = e => {
        e.preventDefault();
        const emailText = e.target.email.value;
        const passwordText = e.target.password.value;
        console.log(emailText, passwordText);
        createUserWithEmailAndPassword(auth, emailText, passwordText)
            .then(result => {
                console.log(result.user);
                
            })
            .catch(error => {
                console.error(error);
            })
    }
    return (
        <div className="border">
            <div className="w-2/3 mx-auto">
                <h1 className="text-2xl mb-3">You have dont account please signUp</h1>
                <form onSubmit={handleSubmit}>
                    <input className="py-2 w-3/4 mb-3 px-2" type="email" name="email" placeholder="Email" />
                    <br />
                    <input className="py-2 w-3/4 mb-3 px-2" type="password" name="password" placeholder="Password" />
                    <br />
                    <input className="btn mb-3 w-3/4" type="submit" value="Register Now" />
                </form>
            </div>
        </div>
    );
};

export default Register;