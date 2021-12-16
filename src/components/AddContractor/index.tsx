import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

import defaultAvatar from "../../images/defaultAvatar.svg";
import { renderSwitch } from "./renderSwitch";
import { UserType } from "./userData.interface";
import sendUserData from "../../services/sendUserData";
import { validateUser } from "../../utils/validateUser";
import { showNotification } from "../../utils/notification";

const AddContractor: React.FC = () => {
  const [type, setType] = useState(UserType.PERSON);
  const [image, setImage] = useState("");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
  });
  const [pesel, setPesel] = useState("");
  const [nip, setNip] = useState("");
  const [userError, setUserError] = useState("");

  const { firstName, lastName } = userData;

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as UserType);
  };

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePeselChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPesel(e.target.value);

  const handleNipChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNip(e.target.value);

  const getImage = (e: any) => {
    if (e.target.value.length > 0) {
      setImage(URL.createObjectURL(e.target.files[0]));
      showNotification("Sukces!", "Dodano zdjęcie", "success");
    } else {
      return;
    }
  };

  useEffect(() => {
    setPesel("");
    setNip("");
  }, [type]);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = validateUser(firstName, lastName, type, nip, pesel);
    if (error) {
      showNotification("Niepoprawne dane", error, "warning");
      return setUserError(error);
    }
    setUserError("");

    await sendUserData({ ...userData, pesel, type, nip, image }, setUserError);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="header">
        <h1>Dodawanie kontrahenta</h1>
        <p>wypełnij wszystkie pola, aby kontynuować</p>
      </div>

      <div className="personal-data-wrapper">
        <div className="personal-data">
          <FormControl className="form-control">
            <TextField
              id="firstName"
              label="imię"
              value={firstName}
              onChange={handleDataChange}
              variant="outlined"
              fullWidth
            />
            <TextField
              id="lastName"
              value={lastName}
              onChange={handleDataChange}
              label="nazwisko"
              variant="outlined"
              fullWidth
            />
            <Select value={type} onChange={handleChange} fullWidth>
              <MenuItem value="person">osoba</MenuItem>
              <MenuItem value="company">firma</MenuItem>
            </Select>
            {renderSwitch(type, pesel, handlePeselChange, nip, handleNipChange)}
          </FormControl>
          {userError && <p>{userError}</p>}
        </div>

        <div className="personal-image">
          <Button
            variant="contained"
            component="label"
            sx={{
              fontWeight: "700",
              width: "160px",
              color: "#FDFDFD",
            }}
          >
            Dodaj zdjęcie
            <input type="file" hidden onChange={getImage} accept=".jpeg,.jpg" />
          </Button>
          <img src={image[0] ? image : defaultAvatar} alt="avatar" />
        </div>
      </div>

      <div className="bottom-section">
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "320px",
            height: "56px",
            color: "#FDFDFD",
            fontWeight: "700",
            fontSize: "16px",
          }}
        >
          Wyślij
        </Button>
      </div>
    </form>
  );
};

export default AddContractor;
