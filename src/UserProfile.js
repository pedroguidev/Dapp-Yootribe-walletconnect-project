import React from 'react';
import { useSelector } from 'react-redux';
import NftsNavigation from './components/micro/NftsNavigation';

function ShowDraftNfts() {
  const user = useSelector((state) => state.auth.value.user);

  return (
    <div className="container-large">
      <div className="content-with-sidebar">
        {user.company !== null && user.company !== undefined ? <NftsNavigation /> : <div></div>}
        <div className="content">
          {/* <TableContainer component={Paper}>
                    <table style={{ minWidth: 650 }} aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    ID
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {user.id}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    First name
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {user.first_name}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Last name
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {user.last_name}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Company
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {user.company}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Email
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {user.email}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Phone
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {user.phone}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Wallet Address
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {user.wallet_address}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Wallet Private Key
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {user.wallet_private_key}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </table>
                </TableContainer> */}
        </div>
      </div>
    </div>
  );
}

export default ShowDraftNfts;
