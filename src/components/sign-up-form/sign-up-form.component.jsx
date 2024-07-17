import './sign-up-form-scss/sign-up-form.style.css';
import { useContext, useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component';
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const[formFields, setFormFields] = useState(defaultFormFields);;
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => setFormFields(defaultFormFields);

    const handleChange = (event) => {
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value});
    }

    const handleSubmit = async  (event) => {
        event.preventDefault();
        if(password !== confirmPassword){
            alert('passwords do not match');
            return;
        }
        try{    
            const {user} = await createAuthUserWithEmailAndPassword(email,password)
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
            if(user){
                alert("Congrats!! You can sign in now");
            }
        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use')
            }else if(error.code === 'auth/invalid-email'){
                alert('Please provide valid email address')
            }else{
                console.error('user creation encountered an error',error);
            }
        }
    }

    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Display Name"
                    type="text" 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName} 
                    required
                />
                
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

                <FormInput 
                    label="Confirm Password"
                    type="password" 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword} 
                    required
                />
                
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;