import { useState } from 'react';
import Button from '../../Design/Button';
import Container from '../../Design/Container';
import Input from '../../Design/Input';
import Styles from './LoginPage.module.scss';
import * as yup from 'yup';
import { getValidationErrors } from '../../../core/utils/validation';
import ApiError from '../../../core/error/ApiError';
import AppError from '../../../core/error/AppError';
import { login } from '../../../core/modules/auth/api';
import { handleApiResult }  from '../../../core/utils/api';
import ErrorAlert from '../../Shared/ErrorAlert';
import { Link } from 'react-router-dom';
import { Routes } from '../../../core/routing';

let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginPage = ({ setUser }) => {

    const [data, setData] = useState({
        email: '',
        password: '',
    });  

    const [errors, setErrors] = useState({});
    const [error, setError] = useState();

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        schema.validate(data,{abortEarly: false})
        .then(() => {
            login(data)
                .then((res) => handleApiResult(res))
                .then((data) => {
                    setUser(data);
                })
                .catch((e) => {
                    if (e instanceof ApiError) {
                        if (e.isUnauthorized()) {
                            setError(new AppError('Wrong combination'));
                        } else {
                            setError(e);
                        }
                    } else {
                        setError(new AppError(e));
                    }
                })
        
        })
        .catch((e) => {
            setErrors(getValidationErrors(e));
        })
    };

    return(
        <div className="middle">
            <Container>
                <div className='formContainer'>
                    <div>
                        <h1 className="title mb-5 text-center">Campus in de buurt</h1>
                        <form onSubmit={handleSubmit} noValidate={true}>
                            <h2 className="h3 mb-3 font-weight-normal">Docent login</h2>
                            <hr/>
                            <ErrorAlert error={error}></ErrorAlert>
                            <Input label="Email" type="email" name="email" value={data.email} onChange={handleChange} error={errors.email} />
                            <Input label="Password" type="password" name="password" value={data.password} onChange={handleChange} error={errors.password} />
                            <div className='btnContainer'>
                                <Button color="primary" className="center bigBtn" type="submit">Login</Button>
                            </div>
                        </form>
                        <hr/>
                        <p className='text-center'>Don't have an account?<br/><Link to="/splash">Continue as guest</Link></p>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default LoginPage;