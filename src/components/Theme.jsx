import React from "react";
import {
    argbFromHex,
    themeFromSourceColor,
    applyTheme,
} from "@material/material-color-utilities";

function Theme() {
    const theme = themeFromSourceColor(argbFromHex("#00B2F1"), [
        {
            name: "custom-1",
            value: argbFromHex("#f0f000"),
            blend: true,
        },
    ]);

  // Print out the theme as JSON
  // console.log(JSON.stringify(theme, null, 2));

  // Check if the user has dark mode turned on
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Apply the theme to the body by updating custom properties for material tokens
    applyTheme(theme, { target: document.body, dark: systemDark });
    return <></>;
}

export default Theme;
