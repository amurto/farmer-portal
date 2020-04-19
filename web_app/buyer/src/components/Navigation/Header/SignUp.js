import React, { useContext } from "./node_modules/react";
import { Formik, Form, useField } from "./node_modules/formik";
import * as Yup from "./node_modules/yup";
import { AuthContext } from '../../Context/Auth/auth-context';

import './SignUp.css';

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="center form-group">
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="form-control text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div style={{ color: "red" }}>{meta.error}</div>
      ) : null}
    </div>
  );
};

const Select = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-group">
      <label htmlFor={props.id || props.name}>{label}</label>
      <select className="form-control" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div style={{ color: "red" }}>{meta.error}</div>
      ) : null}
    </div>
  );
};

// And now we can use these
const SignupForm = props => {
  const auth = useContext(AuthContext);
  let formValues;
  if (props.isLogin) {
    formValues = <Formik
    initialValues={{
      email: "",
      password: ""
    }}
    validationSchema={Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Required"),
      password: Yup.string()
        .required('No password provided.') 
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    })}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        console.log(JSON.stringify(values, null, 2));
        auth.login();
        setSubmitting(false);
      }, 400);
    }}
  >
    <Form>
      <TextInput
        label="Email Address"
        name="email"
        type="email"
      />
      <TextInput
        label="Password"
        name="password"
        type="password"
      />
      <button className="login-btn" type="submit">Login</button>
    </Form>
  </Formik>
  } else {
      formValues = <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        jobType: "" // added for our select
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        lastName: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Required"),
        password: Yup.string()
          .required('No password provided.') 
          .min(8, 'Password is too short - should be 8 chars minimum.')
          .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
        jobType: Yup.string()
          .oneOf(
            ["restaurantowner", "trader", "other"],
            "Invalid Job Type"
          )
          .required("Required")
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          auth.login();
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <TextInput
          label="Email Address"
          name="email"
          type="email"
        />
        <TextInput
          label="Password"
          name="password"
          type="password"
        />
        <TextInput
          label="First Name"
          name="firstName"
          type="text"
        />
        <TextInput
          label="Last Name"
          name="lastName"
          type="text"
        />
        <Select label="Job Type" name="jobType">
          <option value="">Select a job type</option>
          <option value="restaurantowner">Restaurant Owner</option>
          <option value="trader">Trader</option>
          <option value="other">Other</option>
        </Select>

        <button className="login-btn" type="submit">Sign Up</button>
      </Form>
    </Formik>
  }
  return (
    <>
      {formValues}
    </>
  );
};


export default SignupForm;
