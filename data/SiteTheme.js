module.exports = {
    colors: {
        palette: {
            white: "#fff",
            gray100: "#f8f9fa",
            gray200: "#e9ecef",
            gray300: "#dee2e6",
            gray400: "#ced4da",
            gray500: "#adb5bd",
            gray600: "#868e96",
            gray700: "#495057",
            gray800: "#343a40",
            gray900: "#212529",
            black: "#000",

            blue: "#03a9f4",
            indigo: "#3f51b5",
            purple: "#673ab7",
            pink: "#e91e63",
            red: "#f44336",
            orange: "#ff5722",
            yellow: "#ffab00",
            green: "#8bc34a",
            teal: "#009688",
            cyan: "#00bcd4",
        },
        
        get primary() { return this.palette.red },
        get secondary() { return this.palette.gray200 },
        get success() { return this.palette.green },
        get info() { return this.palette.cyan },
        get warning() { return this.palette.yellow },
        get danger() { return this.palette.red },
        get light() { return this.palette.gray100 },
        get dark() { return this.palette.gray800 },

        get textLight() { return this.palette.white },
        get textDark() { return this.palette.black }
    },

    fonts: {
        family: {
            sansSerif: "",
            monospace: ""
        },

        size: {
            base: "1rem",
            large: "1.25rem",
            small: "0.875rem",
            xsmall: "0.75rem",

            headers: {
                h1: "1.6rem",
                h2: "1.4rem",
                h3: "1.2rem",
                h4: "1.1rem",
                h5: "1.05rem",
                h6: "1rem",
            }
        },

        weight: {
            normal: "normal",
            bold: "bold"
        }
    }
};