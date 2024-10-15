import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';


export const Register = () => {
  let Navigate=useNavigate();
 const [values,setValues]=useState(
    {
      companyName:'',
      licenseNumber:'',
      email:'',
      password:'',
    }
  ); 
  const handleSubmit=(event)=>
  {
    event.preventDefault();
    axios.post('http://localhost:8081/register',values).then(res=>
      {
        if(res.data.Status==="Success")
        {
          Navigate("/login");
        }
        else{
          console.log("error in navigating to login page");
        }
      }).catch(err=>console.error(err));
  };
  return (
    <div style={{ backgroundColor: '#3B5998', minHeight: '100vh', padding: '20px' }}>

    <div className="registerCard " style={{width:'500px',margin:'auto',marginTop:'50px'}}>
      <div className="modal-content rounded-4 shadow" style={{backgroundColor:'#F6F6F6'}}>
      <div className="modal-header p-5 pb-4 border-bottom-0">
        <h1 className="fw-bold mb-0 fs-2">Sign up</h1>
        
      </div>

      <div className="modal-body p-5 pt-0">
        <form className="" onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
             <input type="text" className="form-control rounded-3" id="companyName" placeholder="Name of the Company" onChange={e=>setValues({...values,companyName:e.target.value})}/>
             <label htmlFor="floatingInput">Name of the Company</label>
          </div>
          <div className="form-floating mb-3">
             <input type="text" className="form-control rounded-3" id="licenseNumber" placeholder="License Number" onChange={e=>setValues({...values,licenseNumber:e.target.value})}/>
             <label htmlFor="floatingInput">Company Medicine Manufacturing License Number</label>
          </div>

          <div class="form-floating mb-3">
            <input type="email" class="form-control rounded-3" id="floatingInput" placeholder="name@example.com" onChange={e=>setValues({...values,email:e.target.value})}/>
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" class="form-control rounded-3" id="floatingPassword" placeholder="Password" onChange={e=>setValues({...values,password:e.target.value})}/>
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Sign up</button>
          <small className="text-body-secondary">By clicking Sign up, you agree to the terms of use.</small>
          <hr className="my-4"/>
          <button className="w-100 mb-2 btn btn-lg rounded-3 btn-light"  onClick={()=>{Navigate("/login")}} >Login</button>
          
        </form>
      </div>
    </div>

    </div>
    </div>
    
  );
};
