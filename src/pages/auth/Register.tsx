import { useState } from "react";
import { registerUser } from "@api/auth/authenticationAPI";
import { RegisterPayload } from "@api/interfaces/AuthDTO";
import { ErrorResponse } from "@api/interfaces/ErrorResponseDTO";

import "@styles/pages/auth/Register.scss";
import { FormContainer, FormField, FormButton } from "@components/ui";

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
      if (error && typeof error === "object" && "errors" in error) {
        const validationError = error as ErrorResponse;
        setFieldErrors(validationError.errors || {});
        setErrorMessage(validationError.message);
      } else if (error instanceof Error) {
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
      <FormContainer
        title="Sign Up"
        onSubmit={handleSubmit}
        errorMessage={errorMessage}
        successMessage={successMessage}
      >
        <FormField
          label="First Name"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleInputChange}
          required
          error={fieldErrors.firstName}
        />

        <FormField
          label="Last Name"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleInputChange}
          required
          error={fieldErrors.lastName}
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          error={fieldErrors.email}
        />

        <FormField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          minLength={8}
          error={fieldErrors.password}
        />

        <FormButton
          type="submit"
          loading={isSubmitting}
          loadingText="Submitting..."
        >
          Sign Up
        </FormButton>
      </FormContainer>
    </div>
  );
}

export default Register;
