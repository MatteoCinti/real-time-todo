import { THEME_SWITCH } from '~/lib/constants';
import { useTheme } from '~/hooks';
import { cn } from '~/lib/utils';
import {
  Switch,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui';

type Props = {
  className?: string;
};

function ThemeSelector({ className }: Props) {
  const { theme, setTheme } = useTheme();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={cn('lg:ml-auto lg:mr-4', className)}>
          <Switch
            data-testid={THEME_SWITCH}
            theme={theme}
            className="!bg-muted"
            value={theme}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {`Is `}
            <span className="font-bold">
              {theme === 'light' ? 'white' : 'black'}
            </span>
            {` blinding your eyes? Swtich theme!`}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ThemeSelector;
