import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import MuiSlideTransition from '../mui/slide-transition';

interface Props {
  onClose: () => void;
  open: boolean;
  onConfirm: () => void;
  loading: boolean;
  title?: string;
  content?: string;
  buttonLabel?: string;
}

const DeleteConfirmationModal = ({
  title = 'Delete Item',
  content = 'Are you sure want to delete this item?',
  buttonLabel = 'Delete',
  loading,
  onClose,
  onConfirm,
  open,
}: Props) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={MuiSlideTransition}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button variant="outlined" color="gray" onClick={onClose}>
          Cancel
        </Button>
        <LoadingButton loading={loading} variant="contained" color="error" onClick={onConfirm}>
          {buttonLabel}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
