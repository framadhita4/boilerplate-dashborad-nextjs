'use client';

import {
  createTheme,
  type Palette,
  type PaletteColor,
  responsiveFontSizes,
  stepConnectorClasses,
} from '@mui/material';
import type {} from '@mui/x-data-grid/themeAugmentation';

import MuiSlideTransition from '@/components/mui/slide-transition';
// eslint-disable-next-line import/no-extraneous-dependencies
import { colors } from '@/constant';

import { hexToRgb } from '../utils';

declare module '@mui/material/styles/createPalette' {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  interface Palette {
    white: Palette['primary'];
    gray: Palette['primary'];
    black: Palette['primary'];
  }
  interface PaletteOptions {
    white: PaletteOptions['primary'];
    gray: PaletteOptions['primary'];
    black: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    link: true;
  }
}

declare module '@mui/material/Button' {
  export interface ButtonPropsVariantOverrides {
    ghost: true;
    link: true;
  }

  export interface ButtonPropsColorOverrides {
    white: true;
    gray: true;
    black: true;
  }
}

declare module '@mui/material/IconButton' {
  export interface IconButtonPropsColorOverrides {
    white: true;
    gray: true;
    black: true;
  }

  export interface IconButtonOwnProps {
    variant?: 'outlined';
  }
}

const baseTheme = createTheme();

const MuiTheme = createTheme({
  typography: {
    fontFamily: 'var(--primary-font)',
    allVariants: {
      color: 'inherit',
    },
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    body2: {
      color: colors.gray[600],
    },
    caption: {
      color: colors.gray[500],
    },
  },

  palette: {
    primary: {
      main: colors.primary[500],
      light: colors.primary[300],
      dark: colors.primary[700],
      contrastText: '#fff',
    },
    secondary: {
      main: colors.blue[500],
      light: colors.blue[400],
      dark: colors.blue[600],
      contrastText: '#fff',
    },
    gray: {
      main: colors.gray[500],
      light: colors.gray[400],
      dark: colors.gray[600],
      contrastText: '#fff',
    },
    black: {
      main: colors.gray[800],
      light: colors.gray[700],
      dark: colors.gray[900],
      contrastText: '#fff',
    },
    warning: {
      main: colors.yellow[500],
      light: colors.yellow[400],
      dark: colors.yellow[600],
      contrastText: '#fff',
    },
    success: {
      main: colors.green[500],
      light: colors.green[400],
      dark: colors.green[600],
      contrastText: '#fff',
    },
    error: {
      main: colors.red[500],
      light: colors.red[400],
      dark: colors.red[600],
      contrastText: '#fff',
    },
    white: {
      main: colors.white,
      contrastText: colors.primary[500],
    },
  },

  shape: {
    borderRadius: 6,
  },

  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.gray[300],
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: '0px',
        },
      },
    },

    MuiButton: {
      variants: [
        {
          props: { variant: 'ghost' },
          style: {
            padding: '6px 8px',
          },
        },
        {
          props: { variant: 'link' },
          style: {
            padding: '0px 2px',
            backgroundColor: 'transparent',
            disableRipple: true,
          },
        },
      ],
      styleOverrides: {
        root: ({ theme, ownerState }) => {
          const color =
            (theme.palette[ownerState.color as keyof Palette] as PaletteColor) ||
            theme.palette.primary;
          return {
            padding: '8px 16px',
            textTransform: 'none',
            '&.MuiButton-containedWhite': {
              color: colors.primary[500],
              backgroundColor: colors.white,
              '&:hover': {
                backgroundColor: colors.gray[100],
              },
            },
            '&.MuiButton-ghost': {
              backgroundColor: `rgba(${hexToRgb(color.main)}, 0.075)`,
              '&:hover': {
                backgroundColor: `rgba(${hexToRgb(color.main)}, 0.15)`,
              },
            },
            '&.MuiButton-text': {
              '&:hover': {
                backgroundColor: `rgba(${hexToRgb(color.main)}, 0.075)`,
              },
            },
            color: color.main,
          };
        },
        contained: {
          color: '#fff',
          boxShadow: 'none',
        },
      },
    },

    MuiPaper: {
      defaultProps: {
        variant: 'outlined',
      },
    },

    MuiStepConnector: {
      styleOverrides: {
        root: {
          [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
              borderColor: colors.primary[500],
            },
          },
          [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
              borderColor: colors.primary[500],
            },
          },
        },
        lineVertical: {
          borderLeftWidth: '2px',
          position: 'absolute',
          transform: 'translateY(-60%) translateX(-1px)',
          height: '45px',
          borderColor: colors.gray[300],
        },
        lineHorizontal: {
          borderTopWidth: '2px',
          margin: '0px -2rem',
          // position: "absolute",
          // width: "calc(100% + 30px)",
          // maxWidth: "310px",
          // minWidth: "90px",
          // transform: "translateX(-20px) translateY(-1px)",
          borderColor: colors.gray[300],
        },
      },
    },

    MuiStepLabel: {
      styleOverrides: {
        iconContainer: {
          zIndex: 2,
          position: 'relative',
        },
      },
    },

    MuiRating: {
      styleOverrides: {
        iconFilled: {
          color: colors.primary[500],
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          margin: '0.75rem 0rem',
        },
      },
    },

    MuiTypography: {
      defaultProps: {
        variant: 'body1',
      },
      variants: [
        {
          props: { variant: 'link' },
          style: {
            color: colors.black,
            textDecoration: 'underline',
          },
        },
      ],
      styleOverrides: {
        h1: {
          fontSize: '3rem',
        },
        h2: {
          fontSize: '2.5rem',
        },
        h3: {
          fontSize: '2rem',
        },
        h4: {
          fontSize: '1.75rem',
        },
        h5: {
          fontSize: '1.5rem',
        },
        h6: {
          fontSize: '1.25rem',
        },
        body1: {
          fontSize: '1rem',
        },
        body2: {
          fontSize: '0.875rem',
        },
        subtitle1: {
          fontSize: '1rem',
        },
        subtitle2: {
          fontSize: '0.875rem',
        },
        caption: {
          fontSize: '0.75rem',
        },
        overline: {
          fontSize: '0.75rem',
        },
        button: {
          fontSize: '0.875rem',
        },
      },
    },

    MuiBackdrop: {
      styleOverrides: {
        invisible: {
          opacity: '0 !important',
          backgroundColor: 'rgba(0,0,0,0) !important',
        },
        root: {
          backdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(0,0,0,0.2)',
        },
      },
    },

    MuiStack: {
      defaultProps: {
        alignItems: 'center',
        direction: 'row',
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          padding: '1rem',
          borderRadius: '0.6rem',
        },
      },
    },

    MuiDialog: {
      defaultProps: {
        TransitionComponent: MuiSlideTransition,
      },
      styleOverrides: {
        paper: {
          borderRadius: '1rem',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },

    MuiDialogTitle: {
      styleOverrides: {
        root: {
          // padding: '12px 8px 12px 24px',
        },
      },
    },

    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '8px 24px 16px 24px',
        },
      },
    },

    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: '0.6rem',
          ':before': {
            height: '0rem',
          },
          margin: '0px !important',
        },
      },
    },

    MuiPagination: {
      defaultProps: {
        shape: 'rounded',
        color: 'primary',
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          '& .MuiPaginationItem-outlined': {
            borderRadius: '8px',
          },
          '& .MuiPaginationItem-outlined.Mui-selected': {
            backgroundColor: (theme.palette[ownerState.color as keyof Palette] as PaletteColor)
              .main,
            color: 'white !important',
          },
          '& .MuiPaginationItem-outlined.Mui-selected:hover': {
            backgroundColor: (theme.palette[ownerState.color as keyof Palette] as PaletteColor)
              .dark,
          },
        }),
      },
    },

    MuiSwitch: {
      styleOverrides: {
        root: {
          width: '46px',
          height: '27px',
          padding: 0,
          margin: '4px',

          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            opacity: 1,
          },
          '& .MuiSwitch-switchBase.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.3,
          },
        },
        switchBase: {
          padding: '4px',
        },
        thumb: {
          width: 18,
          height: 18,
          boxShadow: 'none',
          backgroundColor: 'white',
        },
        track: {
          borderRadius: 9999,
          backgroundColor: '#bdbdbd',
          opacity: '1',
          transition:
            'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        },
      },
    },

    // MuiInputBase: {
    //   styleOverrides: {
    //     input: {
    //       padding: '0.75rem 1rem !important',
    //     },
    //   },
    // },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            color: colors.gray[400],
          },
          '& .MuiOutlinedInput-root': {
            borderRadius: '0.6rem',
          },
        },
      },
    },

    MuiIconButton: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            border: '1px solid currentColor',
            borderRadius: '50%',
          },
        },
      ],
    },

    MuiChip: {
      styleOverrides: {
        root: ({ theme, ownerState }) => {
          const color =
            (theme.palette[ownerState.color as keyof Palette] as PaletteColor) ||
            theme.palette.primary;
          return {
            borderRadius: '0.6rem',
            fontWeight: '600',
            '&.MuiChip-filled': {
              backgroundColor: `rgba(${hexToRgb(color.main)}, 0.1)`,
              color: color.main,
            },
            textTransform: 'capitalize',
          };
        },
      },
    },

    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          margin: ' 0px',
          gap: '0.5rem',
        },
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        columnHeader: {
          backgroundColor: colors.gray[50],
        },
        // iconSeparator: {
        //   color: colors.gray[300],
        //   ':hover': {
        //     color: colors.black,
        //   },
        // },
      },
    },
  },
});

export default responsiveFontSizes(MuiTheme, { factor: 6 });
