"use client";

import type { Facility } from "@/app/_types/facility";
import { Button } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { deleteFacility } from "../_actions/facility";
import { useRouter } from "next/navigation";
import { Box, Modal } from "@mui/material";
import FacilityForm from "@/app/_components/facilityForm";

const Facility = ({ facility }: { facility: Facility }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const router = useRouter();

  const handleDelete = async () => {
    await deleteFacility(facility.id.toString());
    router.replace("/");
  };

  return (
    <div>
      {facility.imageUrl ? (
        <Image src={facility.imageUrl} alt="image" width={150} height={150} />
      ) : null}
      <div>
        <h2>Name</h2>
        {facility.name}
      </div>
      <div>
        <h2>Address</h2>
        {facility.address}
      </div>
      <div>
        <h2>City</h2>
        {facility.city}
      </div>
      <div>
        <h2>State</h2>
        {facility.state}
      </div>
      <div>
        <h2>Phone numberr</h2>
        {facility.phoneNumber}
      </div>
      <div>
        <h2>zip code</h2>
        {facility.zipCode}
      </div>
      <div>
        <h2>type</h2>
        {facility.type}
      </div>

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
          <FacilityForm edit facility={facility} closeModal={handleClose} />
        </Box>
      </Modal>

      <div>
        <Button onClick={handleOpen}>Edit</Button>
        <Button onClick={handleDelete} color="error">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Facility;
