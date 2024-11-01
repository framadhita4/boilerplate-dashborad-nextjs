import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Paper, { PaperProps } from '@mui/material/Paper';

import { cn } from '@/lib/utils';

interface Props extends PaperProps {
  title?: string;
  subTitle?: string;
  paperClassName?: string;
  border?: boolean;
}

const FormCard = ({
  title,
  subTitle,
  children,
  className,
  paperClassName,
  border = true,
  ...props
}: Props) => {
  return border ? (
    <Paper variant="outlined" {...props} className={cn('rounded-xl', paperClassName)}>
      {(title || subTitle) && (
        <>
          <CardHeader
            titleTypographyProps={{
              variant: 'h6',
            }}
            subheaderTypographyProps={{
              variant: 'body2',
            }}
            title={title}
            subheader={subTitle}
            className="p-6"
          />
          <Divider className="my-0" />
        </>
      )}
      <CardContent className={cn('flex flex-col gap-5 p-6', className)}>{children}</CardContent>
    </Paper>
  ) : (
    <div className={cn('flex flex-col gap-5', className)}>{children}</div>
  );
};

export default FormCard;
