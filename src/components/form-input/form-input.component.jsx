import './form-input-scss/form-input.style.css';

const FormInput = ({label, ...otherProps}) => {
    return(
        <div className="group">
            {/* input will come above the label in order for focus of label to work{shrink} properly */}
            <input className="form-input" {...otherProps}></input>
            {label&&        
            <label className={`${otherProps.value.length ? 'shrink' :null } form-input-label`}>{label}</label>
            }
        </div>
    )
}

export default FormInput;