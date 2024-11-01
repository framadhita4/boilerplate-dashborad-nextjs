import React from 'react';

import Slide from '@mui/material/Slide/Slide';
import type { TransitionProps } from '@mui/material/transitions';

const MuiSlideTransition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<unknown, string | React.JSXElementConstructor<any>>;
    },
    ref: React.Ref<unknown>,
  ) => <Slide direction="up" ref={ref} {...props} />,
);

export default MuiSlideTransition;
