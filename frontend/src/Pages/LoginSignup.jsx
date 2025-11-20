import {useState} from "react";
import "./CSS/LoginSignup.css";


const LoginSignup = () => {
 
  const [state,setState] = useState("Login")
  const [formData,setFormData]= useState({
    username:"",
    password:"",
    email:""
  })
  const changeHandler=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value })
  }

  const Login=async()=>{
    console.log("Login func executed")
     
    const res= await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData)
    })

    const data= await res.json()

    if(data.success){
      localStorage.setItem('auth-token',data.token);
      window.location.replace("/")
    }else{
      alert(data.error)
    }
      
     

  }
  const Signup=async()=>{
    console.log("Signup func executed")
    
    const res= await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData)
    })

    const data= await res.json()

    if(data.success){
      localStorage.setItem('auth-token',data.token);
      window.location.replace("/")
    }else{
      alert(data.error)
    }
      




  }
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Signup"?<input name="username" value={formData.username} onChange={changeHandler}type="text" placeholder="Your name" />:""}
          <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" />
          <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />
        </div>
        <button onClick={()=>{state==="Login"?Login():Signup()} }>Continue</button>
        {state==="Signup"?<p className="loginsignup-login">
          Already have an account? <span onClick={()=>setState("Login")}>Login here</span>
        </p>:
        <p className="loginsignup-login">
          Create a new account? <span onClick={()=>setState("Signup")}>Click here</span>
        </p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
