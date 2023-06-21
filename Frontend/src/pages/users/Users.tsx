import { FC, useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  useTheme,
  MenuItem,
  Select,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import usersData from "./Users.json";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  buildingID: number;
  unitID: number;
}

const createData = (user: User) => {
  return {
    ...user,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
};

const Row = (props: { row: ReturnType<typeof createData> }) => {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.firstName}</TableCell>
        <TableCell>{row.lastName}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.buildingID}</TableCell>
        <TableCell>{row.unitID}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="h6" gutterBottom component="div">
                Payment Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Invoice Number</TableCell>
                    <TableCell align="right">Type of payment</TableCell>
                    <TableCell align="right">Method of payment</TableCell>
                    <TableCell align="right">Total price (BGN)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{"Ivoice number goes here "}</TableCell>
                      <TableCell align="right">
                        {"Building tax/repair tax here"}
                      </TableCell>
                      <TableCell align="right">{"Paypal"}</TableCell>
                      <TableCell align="right">{"Total BGN paid"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const rows = usersData.map((user) => createData(user));

const CollapsibleTable: FC = () => {
  const theme = useTheme();
  const [buildingFilter, setBuildingFilter] = useState<number | null>(null);

  const applyFilter = (buildingId: number) => {
    setBuildingFilter(buildingId);
  };

  const clearFilter = () => {
    setBuildingFilter(null);
  };

  const filteredRows = buildingFilter
    ? rows.filter((row) => row.buildingID === buildingFilter)
    : rows;

  const buildingIds = Array.from(new Set(rows.map((row) => row.buildingID)));

  return (
    <Box height="100vh" width="100%" bgcolor={theme.palette.background.default}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        marginTop="0%"
        p={1}
        bgcolor={theme.palette.background.default}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          width="100%"
          paddingLeft={2}
        >
          <Select
            sx={{ border: "none" }}
            value={buildingFilter || ""}
            onChange={(e) => applyFilter(Number(e.target.value))}
            startAdornment={
              <IconButton disableRipple disableFocusRipple>
                <FilterAltOutlinedIcon />
              </IconButton>
            }
          >
            {buildingIds.map((id) => (
              <MenuItem key={id} value={id}>
                {`Building ${id}`}
              </MenuItem>
            ))}
          </Select>
          {buildingFilter !== null && (
            <IconButton onClick={clearFilter} disableRipple>
              <ClearOutlinedIcon />
            </IconButton>
          )}
        </Box>

        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Building ID</TableCell>
                <TableCell>Unit ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => (
                <Row key={row.firstName} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default CollapsibleTable;
