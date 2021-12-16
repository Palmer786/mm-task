import React from "react";
import { UserType } from "./userData.interface";
import TextField from "@mui/material/TextField";

export const renderSwitch = (
  value: UserType,
  pesel: string,
  handlePeselChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  nip: string,
  handleNipChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) => {
  switch (value) {
    case UserType.PERSON:
      return (
        <>
          <TextField
            fullWidth
            id="pesel"
            value={pesel}
            onChange={handlePeselChange}
            label="pesel"
            variant="outlined"
          />
        </>
      );

    case UserType.COMPANY:
      return (
        <>
          <TextField
            fullWidth
            id="nip"
            value={nip}
            onChange={handleNipChange}
            label="nip"
            variant="outlined"
          />
        </>
      );
  }
};
