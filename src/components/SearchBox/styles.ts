import { SxProps, Theme } from '@mui/material/styles';

interface SearchBoxStylesProps {
  variant: 'default' | 'header';
  drawerOpen: boolean;
}

export const getSearchBoxStyles = ({ variant, drawerOpen }: SearchBoxStylesProps): SxProps<Theme> => ({
  mx: 2,
  my: 1,
  width: variant === 'header' ? '100%' : (drawerOpen ? "calc(100% - 32px)" : "40px"),
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    ...(variant === 'header' && {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
      },
    }),
  },
});
