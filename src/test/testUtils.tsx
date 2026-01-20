import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";

const theme = createTheme({
  palette: { mode: "dark" },
});

export function renderWithProviders(ui: React.ReactElement, opts?: { route?: string }) {
  const route = opts?.route ?? "/";

  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[route]}>
        {ui}
      </MemoryRouter>
    </ThemeProvider>
  );
}
