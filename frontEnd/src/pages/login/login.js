import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';


export const Login=()=>
{
  let Navigate=useNavigate(); 
  const [values,setValues]=useState(
    {
    
      email:'',
      password:'',
    }
  ); 

  const handleSubmit=(event)=>
  {
    event.preventDefault();
    axios.post('http://localhost:8081/login',values).then(result=>
      {
        console.log(result.data);
        // console.log(res.data.Error);

        if(result.data.Status==='Success')
        {
          Navigate("/product");
        }
        else{
          console.log("error in navigating to login page");
        }
      
       }
     
      ).catch(err=>console.error(err));
  };
  return (
    <div style={{ height: '100vh', backgroundColor: '#3B5998', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="registerCard" style={{width:'500px',margin:'auto',marginTop:'100px',backgroundColor:'#F6F6F6',borderRadius:8}}>
      <div className="modal-content rounded-4 shadow">
      <div className="modal-header p-5 pb-4 border-bottom-0">
        <h1 className="fw-bold mb-0 fs-2">Sign in</h1>
        
      </div>

      <div className="modal-body p-5 pt-0">
        <form className="" onSubmit={handleSubmit}>
         <div className="form-floating mb-3">
            <input type="email" class="form-control rounded-3" id="floatingInput" placeholder="name@example.com" onChange={e=>setValues({...values,email:e.target.value})}/>
            <label htmlForor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" class="form-control rounded-3" id="floatingPassword" placeholder="Password" onChange={e=>setValues({...values,password:e.target.value})}/>
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Sign in</button>
          <small className="text-body-secondary">Don't Have an account Create one</small>
          <hr className="my-4"/>
          
          <button className="w-100 mb-2 btn btn-lg rounded-3 btn-light"  onClick={()=>{Navigate("/register")}} >Create Account</button>
        </form>
      </div>
    </div>

    </div>
    </div>
    )
}