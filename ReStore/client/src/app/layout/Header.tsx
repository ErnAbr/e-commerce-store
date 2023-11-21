import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
  handleThemeChange: () => void;
  darkMode: boolean;
}

export default function Header({ handleThemeChange, darkMode }: Props) {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6">RE-STORE</Typography>
        <Switch checked={darkMode} onChange={handleThemeChange} />
      </Toolbar>
    </AppBar>
  );
}
