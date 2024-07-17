// we can now move this createUserDocumentFromAuth into the context 
import './sign-in-form-scss/sign-in-form.style.css';
import { useContext, useState } from "react";

import { signInWithGooglePopup, createUserDocumentFromAuth, signInUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component';
import { useNavigate } from 'react-router-dom';
import { SignInContext } from '../../contexts/user.context';
const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const {setShowNav} = useContext(SignInContext);
    const[formFields, setFormFields] = useState(defaultFormFields);;
    const {email, password} = formFields;
    const navigate = useNavigate();
    const resetFormFields = () => setFormFields(defaultFormFields);

    const handleChange = (event) => {
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value});
    }

    const handleSubmit = async  (event) => {
        event.preventDefault();
        try{    
            const {user} = await signInUserWithEmailAndPassword(email,password);
            if(user){
                setShowNav(true);
                navigate("/home");
            }
            resetFormFields();
        }catch(error){
            switch(error.code){
                case 'auth/invalid-credential':
                    alert('email or password is wrong');
                    break;;
                default:
                    console.error(error);
            }
        }
    }

    const signInWithGoogle = async () => {
        const {user}  = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
        if(user){
            navigate("/home");
        }
    } 

    return(
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Email"
                    type="email" 
                    onChange={handleChange} 
                    name="email" 
                    value={email} 
                    required
                />

                <FormInput 
                    label="Password"
                    type="password" 
                    onChange={handleChange} 
                    name="password" 
                    value={password} 
                    required
                />
                <div className='buttons-container'>
                    <Button type='submit' onClick = {handleSubmit}>Sign In</Button>
                    <Button type='button' buttonType='google' onClick = {signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;