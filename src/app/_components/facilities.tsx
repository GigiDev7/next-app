"use client";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Box, Modal } from "@mui/material";
import { useState } from "react";
import FacilityForm from "./facilityForm";
import FacilitiesTable from "./table";
import type { Facility } from "../_types/facility";

const Facilities = ({ facilities }: { facilities: Facility[] }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div className="flex flex-col gap-4 w-fit">
        <h1>Facilities</h1>
        <Button
          onClick={handleOpen}
          startIcon={<AddIcon />}
          color="secondary"
          variant="contained"
        >
          ADD FACILITY
        </Button>
      </div>

      <FacilitiesTable facilities={facilities} />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            overflowY: "scroll",
            height: "90%",
          }}
        >
          <FacilityForm closeModal={handleClose} />
        </Box>
      </Modal>
    </div>
  );
};

export default Facilities;
