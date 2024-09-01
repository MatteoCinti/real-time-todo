import { Link, useLocation, useNavigate } from '@tanstack/react-router';

import { LoginForm, RegisterForm } from '~/components';
import { Card, CardHeader } from '~/components/ui';
import { useAuth } from '~/hooks';
import { cn } from '~/lib/utils';

function Login() {
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const { auth } = useAuth();

  if (auth) {
    navigate({ to: '/board' });
  }

  return (
    <div className="align-center mb-optical-center flex h-full w-full justify-center">
      <Card className="my-auto h-2/5 min-h-fit w-full lg:h-min lg:w-2/5 lg:max-w-lg">
        <CardHeader className="justify-center-center flex flex-row *:!m-0">
          <Link className="m-0" to="/login">
            {({ isActive }) => {
              return (
                <span className={cn(isActive && 'font-extrabold')}>Login</span>
              );
            }}
          </Link>
          <pre> / </pre>
          <Link className="m-0" to="/register">
            {({ isActive }) => {
              return (
                <span className={cn(isActive && 'font-extrabold')}>
                  Register
                </span>
              );
            }}
          </Link>
        </CardHeader>
        {pathname === '/login' && <LoginForm />}
        {pathname === '/register' && <RegisterForm />}
      </Card>
    </div>
  );
}

export default Login;
