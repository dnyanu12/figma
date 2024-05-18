import React, {useState} from "react";
import { Link } from "react-router-dom";
import Validation from "./SignupValidation";
import axios from 'axios'
import { useNavigate} from "react-router-dom";
function Signup()
{
    const[values,setValues] = useState({
        name:'',
        email:'',
        password:''
    })
    const navigate = useNavigate();
    const [errors,setErrors]=useState({})
    const handleInput=(event) =>{
        setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))
    }
    
    const handleSubmit=(event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.name ==="" && errors.email ==="" && errors.password === "")
        {
            axios.post('http://localhost:8081/signup',values)
            .then(res =>{
                navigate('/');

            })
            .catch(err => console.log(err));
        }

    }
    return(
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2> Sign-Up</h2>
            <form action="" onSubmit={ handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="name"><strong>Name</strong></label>
                    <input type="text" placeholder='enter-Name' name="name"
                    onChange={handleInput} className='form-control rounded-0'></input>
                    {errors.name && <span className='text-danger'> {errors.name}</span>}
                </div> 
                <div className='mb-3'>
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input type="email" placeholder='enter-email' name="email"
                    onChange={handleInput} className='form-control rounded-0'></input>
                    {errors.email && <span className='text-danger'> {errors.email}</span>}
                </div> 
                <div className='mb-3'>
                    <label htmlFor="Password"><strong>Password</strong></label>
                    <input type="Password" placeholder='enter-password' name="password"
                    onChange={handleInput} className='form-control rounded-0'></input>
                    {errors.password && <span className='text-danger'> {errors.password}</span>}
                </div> 
                <button type='submit'className='btn btn-success w-100 rounded-0'>Sign up</button>
                <p> you are agree to a our terms and policies</p>
                <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>

            </form>
        </div>
    </div>
    )
}
export default Signup