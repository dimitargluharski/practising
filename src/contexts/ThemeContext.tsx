import { ReactNode, createContext, useEffect, useState } from "react";
import { MdSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";

interface ThemeProps {
  children: ReactNode
}

interface ThemeContextProps {
  theme: string | null;
  handleChangeTheme: () => void;
  lightIconTheme: ReactNode
  darkIconTheme: ReactNode
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  handleChangeTheme: () => {},
  lightIconTheme: <MdSunny />,
  darkIconTheme: <IoMdMoon />
});

export const ThemeProvider = ({ children }: ThemeProps) => {
  const [theme, setTheme] = useState<string>(() => localStorage.getItem('theme') === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
  }, [theme]);

  const handleChangeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  const lightIconTheme = <MdSunny />;
  const darkIconTheme = <IoMdMoon />;
  
  const value = {
    handleChangeTheme,
    theme,
    lightIconTheme,
    darkIconTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}