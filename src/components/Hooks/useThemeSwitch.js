"use client";

import { useEffect, useState } from "react";

export function useThemeSwitch() {
  const storageKey = "theme";

  const toggleTheme = (theme) => {
    // Force dark mode - ignore any light mode requests
    const finalTheme = "dark";
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
    window.localStorage.setItem(storageKey, finalTheme);
  };

  const getUserPreference = () => {
    // Always return dark mode regardless of stored preference
    return "dark";
  };

  const [mode, setMode] = useState("dark");

  useEffect(() => {
    const handleChange = () => {
      const newMode = getUserPreference();
      setMode(newMode);
      toggleTheme(newMode);
    };

    handleChange();
  }, []);

  useEffect(() => {
    toggleTheme(mode)
  }, [mode])
  
  // Override setMode to always set dark mode
  const forceDarkMode = () => {
    setMode("dark");
    toggleTheme("dark");
  };

  return [mode, forceDarkMode]
}
