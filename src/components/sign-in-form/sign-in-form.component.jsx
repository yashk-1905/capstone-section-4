import './sign-in-form-scss/sign-in-form.style.css';
import { useState } from "react";

import { signInWithGooglePopup, createUserDocumentFromAuth, signInUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component';
const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const[formFields, setFormFields] = useState(defaultFormFields);;
    const {email, password} = formFields;
    console.log(formFields);

    const resetFormFields = () => setFormFields(defaultFormFields);

    const handleChange = (event) => {
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value});
    }

    const handleSubmit = async  (event) => {
        event.preventDefault();
        try{    
            const response = await signInUserWithEmailAndPassword(email,password);
            console.log(response);
            if(response){
                alert('successfully signed in');
            }
            resetFormFields();
        }catch(error){
            // we are going to handle the errors now
            // console.error(error);
            // if(error.code === 'auth/invalid-credential'){
            //     alert('email or password is wrong')
            // }

            // we can rather use switch

            switch(error.code){
                case 'auth/invalid-credential':
                    alert('email or password is wrong');
                    break;;
                default:
                    console.error(error);
            }
        }
    }

    // const logGoogleUser = async () => {
    const signInWithGoogle = async () => {
        const {user}  = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
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
                    {/* by default even the google sign in button is of the type submit so even when we sign in with google the above button too starts functioning and we get error
                    
                    so  we need to specifically specify the type of button below as button*/}
                    <Button type='button' buttonType='google' onClick = {signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;