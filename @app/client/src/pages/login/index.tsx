import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import { ChevronLeftIcon } from '@radix-ui/react-icons';

import { LoginForm, RegisterForm } from '~/components';
import { Button, Card, CardHeader } from '~/components/ui';
import { useAuth } from '~/hooks';
import { cn } from '~/lib/utils';

type WrapperProps = {
  children: React.ReactNode;
};

function Wrapper({ children }: WrapperProps) {
  return (
    <div className="align-center justify-centre m-auto flex flex-col self-center justify-self-center">
      {children}
    </div>
  );
}

type AlreadyLoggedInProps = {
  firstName: string;
  logout: () => void;
  navigate: ReturnType<typeof useNavigate>;
};

function AlreadyLoggedInPage({
  firstName,
  logout,
  navigate
}: AlreadyLoggedInProps) {
  return (
    <>
      <div className="text-center text-2xl">
        Hi <span className="font-bold">{firstName}</span> you are already logged
        in
      </div>
      <div className="mx-auto mt-4 flex w-min gap-3">
        <Button size="icon" onClick={() => navigate({ to: '/board' })}>
          <ChevronLeftIcon />
        </Button>
        <Button
          variant="outline"
          className="text-card-foreground border-card-foreground"
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    </>
  );
}

function Login() {
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const { auth, logout } = useAuth();

  if (auth) {
    const { firstName } = auth;
    return (
      <Wrapper>
        <AlreadyLoggedInPage
          firstName={firstName}
          logout={logout}
          navigate={navigate}
        />
      </Wrapper>
    );
  }

  return (
    <div className="align-center mb-optical-center flex h-full w-full justify-center">
      <Card className="my-auto h-2/5 w-full lg:h-min lg:w-2/5 lg:max-w-lg">
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
