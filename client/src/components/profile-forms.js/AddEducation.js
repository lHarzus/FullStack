import React, { Fragment, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {addEducation} from '../../actions/profile'

const AddEducation = ({addEducation}) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const history = useNavigate();

    const [toDateDisabled, toggleDisabled] = useState(false);

    const {school,degree,fieldofstudy,from,to,current,description} = formData;

    const onChange = e => setFormData ({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        addEducation(formData, history);
    }

  return (
    <Fragment>
        <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school or bootcamp that you have atended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="* School or bootcamp" name="school" value={school} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Degree" name="degree" value={degree} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field of study" name="fieldofstudy" value={fieldofstudy} onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" checked={current} value={from} onChange={e => onChange(e)} />
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current" value={current} onChange={e =>{
            setFormData({...formData, current: !current});
            toggleDisabled(!toDateDisabled);
          }} /> {' '}Current School</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={e => onChange(e)} disabled={toDateDisabled ? 'disabled' : ''}/>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description} onChange={e => onChange(e)} 
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </Fragment>
  )
}

addEducation.propTypes = {
    addEduaddEducation: PropTypes.func.isRequired
}; 

export default connect(null,{addEducation})(AddEducation);