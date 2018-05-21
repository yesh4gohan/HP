import React from 'react';
import { Field, reduxForm } from 'redux-form';

const SampleForm=props=>{
     const { handleSubmit, pristine, reset, submitting } = props;
    return(
        <form onSubmit = {handleSubmit}>
           <div>
               <label htmlFor = "fnmae">First Name</label>
               <label htmlFor = "lnmae">Last Name</label>
               <label htmlFor = "phnum">Phone number</label>
               <Field
                name="employed"
                id="fnmae"
                component="input"
                type="text"
                />
            </div>
        </form>
    );
}
