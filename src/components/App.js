import React, { useState, useEffect} from "react";
import '../styles/App.css';

const App = () => {
  const initialValues = { username: '', email: '', gender: '', phonenumber: '', password: ''};

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const changeHandle = (e) => {
      const {name, value} = e.target;
      // console.log(name, value);
      setFormValues({...formValues, [name] : value})
  }
  const onFormSubmitHandler = (event) => {
      event.preventDefault();
      // console.log(formValues)
      setFormErrors(validate(formValues));
      setIsSubmit(true);
  }

  useEffect(()=> {
    console.log(formErrors);
    if(Object.keys(formErrors).length === 0 && isSubmit){
      console.log(formValues);
    }
  }, [formErrors])

  const validate = (values) => {
    const errors = {};
    const regEmail = /[@]/gi;
    const regUserName = /\d/i;
    const regPhoneNumber = /[^\d+-]/i;
    if(!values.username){
      errors.username = "All fields are mandatory";
    } else if(regUserName.test(values.username)){
      errors.username = "Name is not alphanumeric";
    }

    if(!values.email){
      errors.email = "All fields are mandatory";
    } else if(!regEmail.test(values.email)){
      errors.email = "Email must contain @";
    }

    if(values.gender.length === 0){
      errors.gender = "Please identify as male, female or others";
    }

    if(!values.phonenumber){
      errors.phonenumber = "All fields are mandatory";
    } else if(regPhoneNumber.test(values.phonenumber)){
      errors.phonenumber = "Phone Number must contain only numbers";
    }

    if(!values.password){
      errors.password = "All fields are mandatory";
    } else if(values.password.length < 6){
      errors.password = "Password must contain atleast 6 letters";
    } 
    return errors;
  }
  return (
    <div id="main">
      <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      <form onSubmit={onFormSubmitHandler}>
        <label>Name : </label>
        <input type="text" data-testid ='name' name="username" value={formValues.username} onChange={changeHandle} />
        <p>{formErrors.username}</p>
        <br/><br/>

        <label>Email address : </label>
        <input data-testid ='email' name="email" value={formValues.email} onChange={changeHandle}/>
        <p>{formErrors.email}</p>
        <br/><br/>

        <label>Gender : </label>
        <select data-testid ='gender' name="gender" value={formValues.gender} onChange={changeHandle} defaultValue="male">
          <option></option>
          <option>male</option>
          <option>female</option>
          <option>others</option>
        </select>
        <p>{formErrors.gender}</p>
        <br/><br/>
        
        <label>Phone Number : </label>
        <input type="tel" data-testid ='phoneNumber' name="phonenumber" value={formValues.phonenumber} onChange={changeHandle}/>
        <p>{formErrors.phonenumber}</p>
        <br/><br/>

        <label>Password : </label>
        <input type="password" data-testid = 'password' name="password" value={formValues.password} onChange={changeHandle}/>
        <p>{formErrors.password}</p>
        <br/><br/>

        <button data-testid = 'submit' type="submit">Submit button</button>
      </form>
    </div>
  )
}

export default App;
