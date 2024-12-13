"use client";

import { Button, TextField } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useRef, useState } from "react";
import Image from "next/image";
import { Edit } from "@mui/icons-material";
import { createFacility } from "../_actions/facility";
import { useRouter } from "next/navigation";
import type { Facility } from "../_types/facility";
import { editFacility } from "../[id]/_actions/facility";

const facilityTypes = [
  "Manufacturing Plants",
  "Warehouses",
  "Distribution Centers",
  "Research and Development Centers",
  "Maintenance and Repair Facilities",
  "Logistics Hubs",
  "Quality Control Laboratories",
  "Refineries",
  "Energy Plants",
  "Water Treatment Plants",
  "Smelting and Refining Facilities",
  "Chemical Processing Plants",
  "Assembly Plants",
];

const FacilityForm = ({
  closeModal,
  edit,
  facility,
}: {
  closeModal: () => void;
  edit?: boolean;
  facility?: Facility;
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      if (selectedFile) {
        formData.set("file", selectedFile);
      }

      if (facility) {
        formData.set("imageUrl", facility?.imageUrl ?? "");
      }

      try {
        if (!edit) {
          await createFacility(formData);
        } else {
          await editFacility(formData, facility!.id.toString());
        }
        closeModal();
        router.refresh();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      className="p-4 flex flex-col gap-4"
    >
      <h2>{edit ? "Edit" : "Add"} Facility</h2>
      <span className="text-sm text-gray-500">
        Fill in form below to create a new facility. The * indicates that the
        field is required.
      </span>

      {!previewUrl && !facility?.imageUrl ? (
        <>
          <label
            className="border-[1px] border-dashed p-2 py-4 border-black"
            htmlFor="file"
          >
            Click here to upload image
          </label>
          <input
            onChange={handleFileChange}
            className="hidden"
            name="file"
            id="file"
            type="file"
          />
        </>
      ) : (
        <div className="relative">
          <Image
            className="rounded-[100%] w-48 h-48"
            alt="image"
            src={facility?.imageUrl ? facility.imageUrl : previewUrl!}
            width={200}
            height={200}
          />
          <label
            htmlFor="file"
            className="cursor-pointer absolute bottom-0 left-10 bg-white rounded-full h-8 w-8 flex items-center justify-center"
          >
            <Edit />
          </label>
          <input
            onChange={handleFileChange}
            className="hidden"
            name="file"
            id="file"
            type="file"
          />
        </div>
      )}

      <TextField
        id="name"
        name="name"
        label="name"
        required
        variant="outlined"
        defaultValue={facility?.name}
      />
      <FormControl>
        <InputLabel id="type">Type</InputLabel>
        <Select
          labelId="type"
          id="type"
          name="type"
          defaultValue=""
          label="Type"
          value={facility?.type}
        >
          {facilityTypes.map((item) => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        id="address"
        name="address"
        label="Street address"
        required
        variant="outlined"
        value={facility?.address}
      />
      <TextField
        id="city"
        name="city"
        label="City"
        required
        variant="outlined"
        value={facility?.city}
      />
      <TextField
        id="state"
        name="state"
        label="State"
        required
        variant="outlined"
        value={facility?.state}
      />
      <TextField
        id="zipCode"
        name="zipCode"
        label="Zip Code"
        required
        variant="outlined"
        value={facility?.zipCode}
      />
      <TextField
        id="phoneNumber"
        name="phoneNumber"
        required
        label="Phone Number"
        variant="outlined"
        value={facility?.phoneNumber}
      />
      <TextField
        id="siteLeader"
        name="siteLeader"
        label="Site Leader"
        variant="outlined"
        value={facility?.siteLeader}
      />

      <Button
        type="submit"
        className="w-fit"
        variant="contained"
        color="secondary"
      >
        {edit ? "Edit" : "Add"}
      </Button>
    </form>
  );
};

export default FacilityForm;
