const preferredTheme = (): string => {
    const localTheme = localStorage.getItem('theme');
    
    if (localTheme) {
        return localTheme;
    }

    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (darkQuery.matches) {
        return 'dark';
    }
    
    return 'light';
};

export default preferredTheme;
