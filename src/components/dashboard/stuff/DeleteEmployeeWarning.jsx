import * as React from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CloseIcon from '@mui/icons-material/Close';
import { deleteEmployee } from '../../../firebase/stuffDB';
import { useMutation, useQueryClient } from "@tanstack/react-query";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #f44336',
  boxShadow: 24,
  borderRadius: 2,
  p: 3,
  textAlign: 'center',
};

export default function DeleteEmployeeWarning({employeeId,openDeleteModal, setOpenDeleteModal}) {
  // Initialize query client for react-query
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => queryClient.invalidateQueries(["stuff"])
  });

  // Handle delete action
  const handleDelete = () => {
    deleteMutation.mutate(employeeId);
    setOpenDeleteModal(false);
  };

  return (
    <div>

      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <Box sx={style}>
          <IconButton
            onClick={() => setOpenDeleteModal(false)}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <WarningAmberIcon color="warning" sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
           Are you sure you want to delete this Employee? This process cannot be undone.
          </Typography>

          <Box display="flex" justifyContent="center" gap={2}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              onClick={() => setOpenDeleteModal(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
