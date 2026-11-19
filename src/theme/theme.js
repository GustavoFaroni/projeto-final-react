import { createTheme } from '@mui/material/styles';

export const cores = {
  oat: '#EFE8DA',
  surface: '#FFFFFF',
  sage: '#DCE5D6',
  herb: '#2F5D3A',
  herbStrong: '#244A2E',
  onHerb: '#FFFFFF',
  ink: '#1F2A22',
  inkMuted: '#5B6659',
  line: '#E4E0D6',
  honey: '#E9B95E',
  honeyInk: '#8A4F0E',
  success: '#2F7D4A',
  danger: '#B3261E',
};

const serif = '"Lora", Georgia, "Times New Roman", serif';
const sans = '"Figtree", "Segoe UI", system-ui, sans-serif';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: cores.herb, dark: cores.herbStrong, contrastText: cores.onHerb },
    secondary: { main: cores.honey, contrastText: cores.ink },
    success: { main: cores.success },
    error: { main: cores.danger },
    background: { default: cores.oat, paper: cores.surface },
    text: { primary: cores.ink, secondary: cores.inkMuted },
    divider: cores.line,
    sage: cores.sage,
    honeyInk: cores.honeyInk,
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: sans,
    h1: { fontFamily: serif, fontSize: '3rem', lineHeight: '3.5rem', fontWeight: 500 },
    h2: { fontFamily: serif, fontSize: '2.25rem', lineHeight: '2.75rem', fontWeight: 500 },
    h3: { fontFamily: serif, fontSize: '1.75rem', lineHeight: '2.25rem', fontWeight: 500 },
    h4: { fontFamily: serif, fontSize: '1.375rem', lineHeight: '1.875rem', fontWeight: 600 },
    h5: { fontFamily: serif, fontSize: '1.25rem', lineHeight: '1.75rem', fontWeight: 600 },
    h6: { fontFamily: sans, fontSize: '1.125rem', lineHeight: '1.625rem', fontWeight: 600 },
    body1: { fontSize: '1rem', lineHeight: '1.5rem' },
    body2: { fontSize: '0.875rem', lineHeight: '1.25rem' },
    caption: { fontSize: '0.75rem', lineHeight: '1rem', fontWeight: 500 },
    button: { fontSize: '0.875rem', fontWeight: 600, textTransform: 'none' },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 10, paddingBlock: 10 } },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: 'none' } },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { borderRadius: 16, border: `1px solid ${cores.line}` } },
    },
    MuiOutlinedInput: {
      styleOverrides: { root: { borderRadius: 6, backgroundColor: cores.surface } },
    },
  },
});

export default theme;
