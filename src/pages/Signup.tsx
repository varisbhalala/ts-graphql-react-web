import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";


const SIGNUP_MUTATION = gql`
    mutation signup($name: String!, $email: String!, $password: String!) {
        signup(name: $name, email: $email, password: $password) {
            token
        }
    }
`

interface SignupValues {
    email: string;
    password: string;
    name: string;
}

export const Signup = () => {
  const [ signup, {data, loading} ] = useMutation(SIGNUP_MUTATION);
    const initialValues: SignupValues = {
        email: '',
        password: '',
        name: ''
    }


    const validatationSchema = Yup.object({
        email: Yup.string().email('Invalid Email Address').required('Email is required'),
        name: Yup.string().required('Name is required'),
        password: Yup.string().required('password is required')
        
    })
  if (loading) <>Loading</>;
  return (
    <>
      <h1> Signup </h1>
      <Formik
       initialValues={initialValues}
       validationSchema={validatationSchema}
       onSubmit={async(values, {setSubmitting}) => {
        setSubmitting(true)
        const response = await signup({
            variables: values
        })
        localStorage.setItem('token', response.data.signup.token)
        setSubmitting(false)
        
       }}
       >
            <Form>
                <Field name='email' type='text' placeholder='Email' ></Field>
                <Field name='name' type='text' placeholder='Name' ></Field>
                <Field name='password' type='text' placeholder='Password' ></Field>
                <button type="submit">submit</button>
            </Form>
       </Formik>
    </>
  );
};
