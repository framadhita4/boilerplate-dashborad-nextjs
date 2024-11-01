'use client';

import React from 'react';

import NextTopLoader from 'nextjs-toploader';

import { Typography } from '@mui/material';
import Alert, { type AlertColor } from '@mui/material/Alert';
import { StyledEngineProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { ThemeProvider } from '@emotion/react';
import { CircleCheck, CircleX, Info, TriangleAlert } from 'lucide-react';
import { SnackbarProvider } from 'notistack';

import { colors } from '@/constant';
import MuiTheme from '@/lib/mui/theme';
import ReactQueryProvider from '@/lib/react-query/providers';
import ReduxProvider from '@/lib/redux/Provider';
import { cn } from '@/lib/utils';

interface NotistackProps {
  message: string;
  iconVariant: Partial<Record<AlertColor, React.ReactNode>>;
  variant: AlertColor;
  hideIconVariant: boolean;
  style: React.CSSProperties;
  className: string;
}

const CustomSnackbar = React.forwardRef(
  (
    { message, iconVariant, variant, hideIconVariant, style, className }: NotistackProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const colorsVariant = {
      error: 'bg-red-500',
      success: 'bg-green-500',
      info: 'bg-blue-500',
      warning: 'bg-yellow-500',
      default: 'bg-gray-500',
    };

    const textColorsVariant = {
      error: '!text-red-500',
      success: '!text-green-500',
      info: '!text-blue-500',
      warning: '!text-yellow-500',
      default: '!text-gray-500',
    };

    return (
      // <Alert
      //   iconMapping={iconVariant}
      //   color={variant}
      //   icon={hideIconVariant}
      //   ref={ref}
      //   style={style}
      //   className={cn('text-white', className)}
      // >
      //   {message}
      // </Alert>
      <div
        className="flex items-center gap-2 rounded-xl border bg-white p-2 pr-3 shadow-black/20 drop-shadow-xl"
        ref={ref}
        style={style}
      >
        {!hideIconVariant && (
          <div
            className={`${colorsVariant[variant]} rounded-xl bg-opacity-10 p-3 ${textColorsVariant[variant]}`}
          >
            {iconVariant[variant]}
          </div>
        )}
        <Typography className="line-clamp-2 max-w-96" variant="body1">
          {message}
        </Typography>
      </div>
    );
  },
);

const Providers = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <SnackbarProvider
    maxSnack={5}
    autoHideDuration={4500}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    Components={{
      default: CustomSnackbar,
      error: CustomSnackbar,
      success: CustomSnackbar,
      info: CustomSnackbar,
      warning: CustomSnackbar,
    }}
    iconVariant={{
      error: <CircleX />,
      success: <CircleCheck />,
      info: <Info />,
      warning: <TriangleAlert />,
    }}
  >
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ReduxProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={MuiTheme}>
            <ReactQueryProvider>
              <NextTopLoader zIndex={9999} color={colors.primary[500]} height={5} />
              {children}
            </ReactQueryProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </ReduxProvider>
    </LocalizationProvider>
  </SnackbarProvider>
);

export default Providers;
