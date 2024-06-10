import './button-scss/button.style.css';

/**
 *
 * our BUTTON_TYPE_CLASSES will add according to the button type the specific classes 
 * we will specify the buttonType in the button itself
 * 
 * default button
 * 
 * inverted button
 * 
 * google sign in button 
 *  
 */
const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted',
}


const Button = ({children, buttonType, ...otherProps /*like type: submit*/ })  => {
    return(
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
            {children}
        </button>
    )
}

export default Button;