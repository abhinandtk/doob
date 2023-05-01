import { Checkbox } from 'antd'
import React from 'react'
import { useState } from 'react'

function ApartmentAddress({handleAddAddress}) {
    const [formData,setFormData]=useState({
        name:'',
        area:'',
        block:'',
        street:'',
        avenue:'',
        building:'',
        floor:'',
        flatNo:'',
        phone:'',
        remark:''

    })
    const [defaultAddress,setDefaultAddress]=useState(false)
    const handleChange=(e)=>{
        const newFormData = {...formData};
        newFormData[e.target.id]=e.target.value;
        setFormData({...newFormData})
    }
    const submitForm=(e)=>{
        e.preventDefault()
        handleAddAddress(formData,defaultAddress)

    }
  return (
    <form onSubmit={(e)=>submitForm(e)}>
    <div className='my-4'>
    <div className="form-group my-2 ">
            <label for="exampleFormControlInput1">Name</label>
            <input 
            id="name" 
            type="text" 
            value={formData.name}
            className="form-control p-2" 
            onChange={(e)=>handleChange(e)} 
            style={{border:'0px',background:'#eeeeee'}}
            />
        </div>
        <div className="form-group my-2">
            <label for="exampleFormControlSelect1" >Select Area*</label>
            <select 
            id="area"
            className="form-control p-2" 
            onChange={(e)=>handleChange(e)} 
            style={{border:'0px',background:'#eeeeee'}} 
            >
            <option value=''>select</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
           
            </select>
        </div>
        <div className="form-group my-2 ">
            <label for="exampleFormControlInput1">Block*</label>
            <input 
            id="block" 
            type="text" 
            value={formData.block}
            className="form-control p-2" 
            onChange={(e)=>handleChange(e)} 
            style={{border:'0px',background:'#eeeeee'}} 
            />
        </div>
        <div className="form-group my-2">
            <label for="exampleFormControlInput1">Street*</label>
            <input 
            id="street" 
            type="text" 
            value={formData.street}
            className="form-control p-2" 
            onChange={(e)=>handleChange(e)} 
            style={{border:'0px',background:'#eeeeee'}} 
            />
        </div>
        <div className="form-group my-2">
            <label for="exampleFormControlInput1">Avenue</label>
            <input 
            id="avenue" 
            type="text"
            value={formData.avenue}
            className="form-control p-2" 
            onChange={(e)=>handleChange(e)} 
            style={{border:'0px',background:'#eeeeee'}} 
            />
        </div>
        <div className="form-group my-2">
            <label for="exampleFormControlInput1">Building*</label>
            <input 
            id="building" 
            type="text"
            value={formData.building}
            className="form-control p-2" 
            onChange={(e)=>handleChange(e)} 
            style={{border:'0px',background:'#eeeeee'}} 
            />
        </div>
        <div className="form-group my-2">
            <label for="exampleFormControlInput1">Floor*</label>
            <input 
            id="floor" 
            type="text"
            value={formData.floor}
            className="form-control p-2" 
            onChange={(e)=>handleChange(e)} 
            style={{border:'0px',background:'#eeeeee'}} 
            />        
        </div>
        <div className="form-group my-2">
            <label for="exampleFormControlInput1">Flat No</label>
            <input 
            id="flatNo" 
            type="text"
            value={formData.flatNo}
            className="form-control p-2" 
            onChange={(e)=>handleChange(e)} 
            style={{border:'0px',background:'#eeeeee'}} 
            /> 
        </div>
        <div className="form-group my-2">
            <label for="exampleFormControlInput1">Phone Number</label>
            <input 
            id="phone" 
            type="text" 
            value={formData.phone}
            className="form-control p-2" 
            onChange={(e)=>handleChange(e)} 
            style={{border:'0px',background:'#eeeeee'}} 
            />
        </div>
        <div className="form-group my-2 ">
            <label for="exampleFormControlInput1">Remark</label>
            <input 
            id="remark" 
            type="text" 
            value={formData.remark}
            className="form-control p-2" 
            onChange={(e)=>handleChange(e)} 
            style={{border:'0px',background:'#eeeeee'}} 
            />
        </div>
        <div className="form-group my-2 ">
            <Checkbox
            onChange={(e)=>setDefaultAddress(e.target.checked)}
            checked={defaultAddress}
            >
            Make this as the default address
            </Checkbox>
        </div>        <br></br>
        <button type="submit" className='submit-cart-btn ' > Save  </button>
    </div>
    </form>
  )
}

export default ApartmentAddress