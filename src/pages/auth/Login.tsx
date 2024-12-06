import { useState } from 'react';
import { useNavigate } from 'react-router';
import { LoginPayload } from '@api/interfaces/Auth';
import { loginUser } from '@api/auth/authenticationAPI';
import { ROUTES } from '@constants/Routes';
import '@styles/pages/auth/Login.scss';

function Login() {
  const navigate = useNavigate(); // React Router hook for navigation
  const [formData, setFormData] = useState<LoginPayload>({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

		loginUser(formData)
			.then(() => {
				navigate(ROUTES.PRODUCTIONS);
			})
			.catch(err => {
      	setErrorMessage((err as Error).message);
			})
			.finally(() => {
      	setIsSubmitting(false);
			})
  };

  const handleRegisterClick = () => {
    navigate(ROUTES.REGISTER);
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting} onClick={handleSubmit}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="register-link">
        <p>Don't have an account?</p>
        <button onClick={handleRegisterClick}>Register</button>
      </div>
    </div>
  );
}

export default Login;
