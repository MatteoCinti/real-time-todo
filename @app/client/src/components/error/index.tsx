import { Card, CardContent, CardHeader } from '../ui';

function ErrorComponent() {
  return (
    <Card className="border-muted pb-optical-center flex h-full w-full flex-col justify-center text-center lg:rounded-t-none">
      <CardHeader className="flex justify-center text-2xl">
        <h1>🚨</h1>
      </CardHeader>
      <CardContent className="flex justify-center text-xl">
        Ooops... something went terribly wrong. It looks like you better hire
        someone else.
      </CardContent>
    </Card>
  );
}

export default ErrorComponent;
