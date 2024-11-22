import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/Routes.ts';

function LoginComponent() {
  return (
    
<div>
<h1>Login</h1>
<Link to={ROUTES.PRODUCTIONS}>Manually continue to dashboard</Link>
</div>

);
}

export default LoginComponent;

