import React, {Fragment, useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'

const Register = (props) => {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password: '',
        password2: ''
    });

    const {name, email, password, password2} = formData;
    //now to associate name to the apropriate input field i need to add "value={name} on the first input"
    //but doing that i cant type anything there -> add a function onChange={e => onChange(e)}

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2){
            props.setAlert("Passwords do not match","danger");
        }else{
            props.register({name, email, password})
        }
    };

    if(props.isAuthenticated){
      return <Navigate to="/dashboard" />
    }

  return (
    <Fragment><h1 className="large text-primary">Sign Up</h1>
    <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
    <form className="form" onSubmit={e =>onSubmit(e)}>
      <div className="form-group">
        <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} required />
      </div>
      <div className="form-group">
        <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />
        <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a Gravatar email
        </small>
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          name="password"
          minLength="6"
          value={password} onChange={e => onChange(e)}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Confirm Password"
          name="password2"
          minLength="6"
          value={password2} onChange={e => onChange(e)}
        />
      </div>
      <input type="submit" className="btn btn-primary" value="Register" />
    </form>
    <p className="my-1">
      Already have an account? <Link to="/Login">Sign In</Link>
    </p></Fragment>
  )
}
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, {setAlert, register})(Register);