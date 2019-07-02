import {
    ADD_CONTACT,
    CLEAR_CONTACTS,
    CLEAR_CURRENT,
    CLEAR_FILTER,
    CONTACT_ERROR,
    DELETE_CONTACT,
    FILTER_CONTACTS,
    GET_CONTACTS,
    SET_CURRENT,
    UPDATE_CONTACT
} from '../types';
import React, { useReducer } from 'react';

import ContactContext from './contactContext';
import axios from 'axios';
import contactReducer from './contactReducer';
import uuid from 'uuid';

const ContactState = props => {
    const initialState = {
      contacts: [],
      current: null,
      filtered: null,
      error: null
    };
  
    const [state, dispatch] = useReducer(contactReducer, initialState);
  
    // Get contact

    const getContacts = async contact => {
        

        try {
            const res = await axios.get('/api/contacts');
            dispatch({
                type: GET_CONTACTS, 
                payload: res.data
            });

        }catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
    };

    // clear contacts
    const clearContacts = id => {
        dispatch({type: CLEAR_CONTACTS});
    }

    // Add contact
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({type: ADD_CONTACT, payload: res.data});
            
        }catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
    };

    // delete contact
    const deleteContact = async id => {
        try {
            await axios.delete(`/api/contacts/${id}`);
            dispatch({type: DELETE_CONTACT, payload: id});

        }catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
        
    }

    // update contact

    const updateContact = async (contact) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
            dispatch({
                type: UPDATE_CONTACT, 
                payload: res.data
            });
            
        }catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
        
    }

    //  contact
    
    //set current contact
    const setCurrent = contact => {
        dispatch({type: SET_CURRENT, payload: contact});
    }
    // clear current contact
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT})
    }


    // filter contacts
    const filterContact = (text) => {
        
        dispatch({type: FILTER_CONTACTS, payload: text});
    }
    // clear filter
    const clearFilter = () => {
        dispatch({type: CLEAR_FILTER})
    }
    return (
      <ContactContext.Provider
        value={{
          contacts: state.contacts,
          current: state.current,
          filtered: state.filtered,
          error: state.error,
          addContact,
          deleteContact,
          setCurrent,
          clearCurrent,
          updateContact,
          filterContact,
          clearFilter,
          getContacts,
          clearContacts
        }}
      >
        {props.children}
      </ContactContext.Provider>
    );
  };
  
  export default ContactState;