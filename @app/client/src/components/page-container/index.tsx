import { cn } from '~/lib/utils/ui';

type Props = {
  children: React.ReactNode;
};

const themeClassNames = 'bg-background text-primary';

function Layout({ children }: Props) {
  return (
    <div
      className={cn(
        'flex h-full w-full flex-col p-2 lg:px-4 lg:py-2',
        themeClassNames
      )}
    >
      {children}
    </div>
  );
}

export default Layout;
