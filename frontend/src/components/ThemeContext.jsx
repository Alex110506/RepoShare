import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setTheme(storedTheme);
        } else {
            setTheme("dark")
        }
    }, []);

    const toggleTheme = (newTheme) => {
    if (newTheme) {
        setTheme(newTheme);
    } else {
        setTheme(prev => (prev === "dark" ? "light" : "dark"));
    }
};

    return (
        <ThemeContext.Provider value={{ theme,toggleTheme,setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
