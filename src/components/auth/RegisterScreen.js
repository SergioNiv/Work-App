import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPassword } from '../../actions/auth';

export const RegisterScreen = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.ui);
	const { msgError } = state;

	const [formValue, handleInputchange] = useForm({
		name: 'Hernando',
		email: 'nando@gmail.com',
		password: '123456',
		password2: '123456',
	});

	const { name, email, password, password2 } = formValue;

	const handleRegister = (e) => {
		e.preventDefault();

		if (isFormValid()) {
			dispatch(startRegisterWithEmailPassword(email, password, name));
		}
	};

	const isFormValid = () => {
		if (name.trim().length === 0) {
			dispatch(setError('Name is required'));
			return false;
		} else if (!validator.isEmail(email)) {
			dispatch(setError('Email is not valid'));
			return false;
		} else if (password !== password2 || password.length < 5) {
			dispatch(setError('Password is not valid'));
			return false;
		}
		dispatch(removeError());
		return true;
	};

	return (
		<>
			<h3 className="auth__title">Register</h3>

			<form onSubmit={handleRegister}>
				{msgError && <div className="auth__alert-error">{msgError}</div>}
				<input
					type="text"
					placeholder="Name"
					name="name"
					className="auth__input"
					autoComplete="off"
					onChange={handleInputchange}
					value={name}
				/>

				<input
					type="text"
					placeholder="Email"
					name="email"
					className="auth__input"
					autoComplete="off"
					onChange={handleInputchange}
					value={email}
				/>

				<input
					type="password"
					placeholder="Password"
					name="password"
					className="auth__input"
					onChange={handleInputchange}
					value={password}
				/>

				<input
					type="password"
					placeholder="Confirm password"
					name="password2"
					className="auth__input"
					onChange={handleInputchange}
					value={password2}
				/>

				<button type="submit" className="btn btn-primary btn-block mb-5">
					Register
				</button>

				<Link to="/auth/login" className="link">
					Already registered?
				</Link>
			</form>
		</>
	);
};
