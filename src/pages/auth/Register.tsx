import { useState } from "react";
import { registerUser } from "@api/auth/authenticationAPI";
import { RegisterPayload } from "@api/interfaces/AuthDTO";
import { ErrorResponse } from "@api/interfaces/ErrorResponseDTO";

import "@styles/pages/auth/Register.scss";

function Register() {
  const [formData, setFormData] = useState<RegisterPayload>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setFieldErrors({});
    setSuccessMessage(null);

    try {
      await registerUser(formData);
      setSuccessMessage("Registration successful! You can now log in.");
      setFormData({ email: "", password: "", firstName: "", lastName: "" });
    } catch (error) {
      if (error && typeof error === 'object' && 'errors' in error) {
        const validationError = error as ErrorResponse;
        setFieldErrors(validationError.errors || {});
        setErrorMessage(validationError.message);
      } else if (error instanceof Error){
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong on our end");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

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
            minLength={8} // Example: Enforce minimum password length
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default Register;
