'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { MoonIcon, SunIcon } from 'lucide-react';

export default function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Tabs defaultValue={theme}>
      <TabsList className="border">
        <TabsTrigger
          value="light"
          onClick={() => setTheme('light')}>
          <SunIcon className="h-[1.2rem] w-[1.2rem]" />
        </TabsTrigger>
        <TabsTrigger
          value="dark"
          onClick={() => setTheme('dark')}>
          <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all duration-300 ease-in-out dark:rotate-0" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
