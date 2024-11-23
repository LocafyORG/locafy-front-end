import { Link } from 'react-router';
import { ROUTES } from '../../../constants/Routes';

function LoginComponent() {
  return (
    
<div>
<h1>Login</h1>
<Link to={ROUTES.PRODUCTIONS}>Manually continue to dashboard</Link>
</div>

);
}

export default LoginComponent;

