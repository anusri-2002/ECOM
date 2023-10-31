import {Input,Button} from 'antd'
import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import './sellersignup.css'



const SellerSignup =()=>{
    const navigate=useNavigate();
    const [data,setData]=useState({name:'',email:'',phone:'',password:'',confirmpassword:'',address:[{addressType:'',houseno:'',houseName:'',street:'',city:'',state:'',pincode:''}]})
    const[loading,setLoading]=useState(false)

    const sellersignup=async()=>{
        setLoading(true);
        try{
            await axios.post('http://localhost:7000/seller/signup',data)
            setLoading(false);
            navigate('/seller/dashboard')
        }
    catch(e){
        console.log(e)
    }
}  
     const onChange=(e,key)=>{
       setData({...data,[key]:e.target.value})
    }
const onClick=()=>{
    sellersignup();
}
  
  
   
   return ( <div className="sellersignup">
        <h1>ECOM APP</h1>
        <div className="form">
            <label>Name</label>
            <Input 

            onChange ={(e)=>onChange(e,'name')}
            placeholder='Name'/>
            <label>Email</label>
            <Input
            onChange ={(e)=>onChange(e,'email')}
            placeholder='Email'/>
            <label>Phone</label>
            <Input
            onChange ={(e)=>onChange(e,'phone')}
            placeholder='Phone'/>
            <label>Address</label>
            <label>AddressType</label>
            <Input
            onChange ={(e)=>onChange(e,'addresstype')}
            placeholder='AddressType'/>
            
            <label>HouseNo</label>
            <Input
            onChange ={(e)=>onChange(e,'housenumber')}
            placeholder='HouseNo'/>
            <label>HouseName</label>
            <Input
            onChange ={(e)=>onChange(e,'housename')}
            placeholder='HouseName'/>
            <label>Street</label>
            <Input
            onChange ={(e)=>onChange(e,'street')}
            placeholder='Street'/>
            <label>City</label>
            <Input
            onChange ={(e)=>onChange(e,'city')}
            placeholder='City'/>
            <label>State</label>
            <Input
            onChange ={(e)=>onChange(e,'state')}
            placeholder='State'/>
            <label>Pincode</label>
            <Input
            onChange ={(e)=>onChange(e,'pincode')}
            placeholder='pincode'/>
             <label>password</label>
            <Input.Password  
            onChange={(e)=>onChange(e,'password')}
            size="large"
            placeholder='password'/>
            
            <label>confirmpassword</label>
            <Input.Password  
            onChange={(e)=>onChange(e,'confirmpassword')}
            size="large"
            placeholder='confirmpassword'/>
      <Button 
      onClick={onClick}
      
      className='signupbtn' 
      size="large" 
      type="primary">
        SIGN UP
      </Button>
      
            
        </div>

    </div>
   )
}
export default SellerSignup