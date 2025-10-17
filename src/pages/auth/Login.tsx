import { useState } from "react";
import { useNavigate } from "react-router";
import { LoginPayload } from "@api/interfaces/AuthDTO";
import { loginUser } from "@api/auth/authenticationAPI";
import { ROUTES } from "@constants/Routes";
import "@styles/pages/auth/Login.scss";
import { FormContainer, FormField, FormButton } from "@components/ui";

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
      .catch((err) => {
        setErrorMessage((err as Error).message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleRegisterClick = () => {
    navigate(ROUTES.REGISTER);
  };

  return (
    <div className="login-container">
      <FormContainer
        title="Login"
        onSubmit={handleSubmit}
        errorMessage={errorMessage}
        successMessage={successMessage}
      >
        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}

        />

        <FormField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}

        />

        <FormButton
          type="submit"
          loading={isSubmitting}
          loadingText="Logging in..."
        >
          Login
        </FormButton>
      </FormContainer>

      <div className="register-link">
        <p>Don't have an account?</p>
        <button onClick={handleRegisterClick}>Register</button>
      </div>
    </div>
  );
}

export default Login;
