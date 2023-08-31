'use client';

import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui';

export const ConfirmDeleteDialog = (props: ConfirmationDeleteDialogProps) => {
  const { open, setOpen, onDelete } = props;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>This action cannot be undone. This will permanently remove the data from our servers.</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant="outline">
            Cancel
          </Button>
          <Button onClick={() => onDelete()} variant="destructive">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface ConfirmationDeleteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onDelete: () => void;
}
