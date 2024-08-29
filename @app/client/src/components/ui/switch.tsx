'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '~/lib/utils/ui';
import { MoonIcon, SunIcon } from 'lucide-react';

type Props = React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
  theme?: string;
};

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  Props
>(({ className, theme, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'focus-visible:ring-ring focus-visible:ring-offset-background data-[state=checked]:bg-primary data-[state=unchecked]:bg-input peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'bg-background pointer-events-none block h-4 w-4 rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0'
      )}
    >
      {theme === 'light' && <SunIcon size={16} className="p-0.5 text-black" />}
      {theme === 'dark' && <MoonIcon size={16} className="p-0.5" />}
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
