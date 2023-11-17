import { Component } from 'react'
import classes from './ContactForm.module.css'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import {object, string} from 'yup'

const schema = object().shape({
    name: string().min(3, 'Too Short').required('Required'),
    number: string()
        .matches(/^\d{3}-\d{2}-\d{2}$/, 'Invalid phone number (Valid format: 000-00-00)')
        .required("Required")
})

export class ContactForm extends Component {

    render() {
        const {onAdd} = this.props;

        return (
            <Formik
                initialValues={{
                    name: '',
                    number: ''
                }}
                validationSchema={schema}
                onSubmit={(values, actions) => {
                    onAdd(values);
                    actions.resetForm();
                }}
            >
                <Form className={classes.form}>
                    <div className={classes.formFiled}>
                        <label className={classes.formLabel} htmlFor='name'>Name</label>
                        <Field 
                            className={classes.formInput} 
                            name='name' 
                            id='name' 
                            placeholder='name'/>
                        <ErrorMessage name='name' component='span'/>
                    </div>
                    <div className={classes.formFiled}>
                        <label className={classes.formLabel} htmlFor='number'>Number</label>
                        <Field 
                            className={classes.formInput} 
                            type="tel" 
                            name='number' 
                            id='number' 
                            placeholder='number'/>
                        <ErrorMessage name='number' component='span'/>
                    </div>
                    <button className={classes.formBtn} type='submit'>Add</button>
               </Form>
            </Formik>
        )
    }
}