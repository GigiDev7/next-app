import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import type { Facility } from "../_types/facility";
import { useRouter } from "next/navigation";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const FacilitiesTable = ({ facilities }: { facilities: Facility[] }) => {
  const router = useRouter();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">State</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Zip Code</TableCell>
            <TableCell align="right">Phone Number</TableCell>
            <TableCell align="right">Site Leader</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {facilities.map((row) => (
            <TableRow
              onClick={() => router.push(`/${row.id}`)}
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                {row.imageUrl ? (
                  <Image
                    src={row.imageUrl}
                    alt="image"
                    height={50}
                    width={50}
                  />
                ) : null}
              </TableCell>

              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.state}</TableCell>
              <TableCell align="right">{row.city}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.zipCode}</TableCell>
              <TableCell align="right">{row.phoneNumber}</TableCell>
              <TableCell align="right">{row.siteLeader}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FacilitiesTable;
