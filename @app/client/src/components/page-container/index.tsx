import { cn } from '~/lib/utils/ui';

type Props = {
  children: React.ReactNode;
};

const themeClassNames = 'bg-background text-primary';

function Layout({ children }: Props) {
  return (
    <div
      className={cn('flex h-full w-full flex-col px-4 py-2', themeClassNames)}
    >
      {children}
    </div>
  );
}

export default Layout;
