import React, { useContext, useEffect, useState } from 'react'

import ContactContext from '../../context/contact/contactContext'

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
     const [contact, setContact] = useState({
         name: '',
         email: '',
         phone: '',
         type: 'personal'
     });
     const { name, email, phone, type } = contact;
     const { addContact, current, clearCurrent, updateContact } = contactContext;

     useEffect(() => {
         if(current !== null) {
             setContact(current);
         }else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
             }) 
         }
     }, [contactContext, current])
     const onChange = e => {
         setContact({...contact, [e.target.name]: e.target.value})
     }
     const clearAll = () => {
        clearCurrent();
     }

     const onSubmit = e => {
         e.preventDefault();
         if(!current) {
            addContact(contact);
         }else {
             updateContact(contact);
         }
         
         setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
         })
     }
     return (
         <form onSubmit={onSubmit}>
             <h2 className="text-primary">{current ? 'Edit' : 'Add'} Contact</h2>
             <input type='text' placeholder="name" name="name" value={name} onChange={onChange} />
             <input type='text' placeholder="email" name="email" value={email} onChange={onChange} />
             <input type='text' placeholder="phone" name="phone" value={phone} onChange={onChange} />
             <h5>Contact Type</h5>
             <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onChange} /> Personal {' '}
             <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange={onChange} /> Professional{' '}
             <div>
                <input type="submit" value={current ? 'Edit Contact' : 'Add Contact'} className="btn btn-primary btn-block" />   

                {current && <input type="button" className="btn btn-light btn-block" value="Clear" onClick={clearAll}/>}
             </div>
         </form>
     )
 }

 export default ContactForm;
 