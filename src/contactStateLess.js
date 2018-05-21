
import React from "react"


const Contact=({contact,select})=>
        <tr style={{border:"1px solid blue"}}>
                   <td style={{border:"1px solid blue", "textAlign":"center"}}><input type="checkbox"  onChange={(event)=>{select(event,contact.name)}}/></td>
                   <td style={{border:"1px solid blue", "textAlign":"center"}}>{contact.name}</td>
                   <td style={{border:"1px solid blue", "textAlign":"center"}}>{contact.number}</td>
               </tr>




    
export default Contact;
