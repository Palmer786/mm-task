import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

import defaultAvatar from "../../images/defaultAvatar.svg";
import { UserType, UserValidationError } from "./userData.interface";
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
  const [error, setError] = useState("");
  const [userValidationError, setUserValidationError] = useState({
    firstName: "",
    lastName: "",
    type: "",
    nip: "",
    pesel: "",
  });
  const { firstName, lastName } = userData;

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as UserType);
  };

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const onlyLettersPattern = /^[A-Za-z]+$/;
    if (!onlyLettersPattern.test(value)) return;
    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePeselChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPesel(e.target.value);

  const handleNipChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNip(e.target.value);

  const getImage = (e: any) => {
    if (e.target.value.length > 0) {
      const fileName = e.target.value;
      const dotIndex = fileName.lastIndexOf(".");
      const extFile = fileName
        .substr(dotIndex + 1, fileName.length)
        .toLowerCase();

      if (extFile === "jpg" || extFile === "jpeg") {
        setImage(URL.createObjectURL(e.target.files[0]));
        showNotification("Sukces!", "Dodano zdjęcie", "success");
      } else {
        showNotification(
          "Niepoprawny plik",
          "Wybierz zdjęcie w formacie .jpg lub .jpeg",
          "warning"
        );
      }
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
    setError("");
    const { userValidationError, isUserValid } = validateUser(
      firstName,
      lastName,
      type,
      nip,
      pesel
    );
    if (!isUserValid) return setUserValidationError(userValidationError);

    setUserValidationError({
      firstName: "",
      lastName: "",
      type: "",
      nip: "",
      pesel: "",
    });
    const error = await sendUserData({
      ...userData,
      pesel,
      type,
      nip,
      image,
    });
    if (error) {
      showNotification("Error", error, "danger");
      setError(error);
    }
  };

  const renderInputDependingOnType = (
    value: UserType,
    userValidationError: UserValidationError
  ) => {
    switch (value) {
      case UserType.PERSON:
        return (
          <div className="input-with-error-wrapper">
            <TextField
              fullWidth
              id="pesel"
              value={pesel}
              error={!!userValidationError.pesel}
              onChange={handlePeselChange}
              label="pesel"
              variant="outlined"
            />
            {userValidationError.pesel && <p>{userValidationError.pesel}</p>}
          </div>
        );

      case UserType.COMPANY:
        return (
          <div className="input-with-error-wrapper">
            <TextField
              fullWidth
              id="nip"
              value={nip}
              error={!!userValidationError.nip}
              onChange={handleNipChange}
              label="nip"
              variant="outlined"
            />
            {userValidationError.nip && <p>{userValidationError.nip}</p>}
          </div>
        );

      default:
        return;
    }
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
            <div className="input-with-error-wrapper">
              <TextField
                id="firstName"
                label="imię"
                value={firstName}
                error={!!userValidationError.firstName}
                onChange={handleDataChange}
                variant="outlined"
                fullWidth
              />
              {userValidationError.firstName && (
                <p>{userValidationError.firstName}</p>
              )}
            </div>
            <div className="input-with-error-wrapper">
              <TextField
                id="lastName"
                value={lastName}
                onChange={handleDataChange}
                error={!!userValidationError.lastName}
                label="nazwisko"
                variant="outlined"
                fullWidth
              />
              {userValidationError.lastName && (
                <p>{userValidationError.lastName}</p>
              )}
            </div>
            <div className="input-with-error-wrapper">
              <Select
                value={type}
                onChange={handleChange}
                error={!!userValidationError.type}
                fullWidth
              >
                <MenuItem value="person">osoba</MenuItem>
                <MenuItem value="company">firma</MenuItem>
              </Select>
              {userValidationError.type && <p>{userValidationError.type}</p>}
            </div>
            {renderInputDependingOnType(type, userValidationError)}
          </FormControl>
        </div>

        <div className="personal-image">
          <Button
            variant="contained"
            component="label"
            className="add-image-button"
          >
            Dodaj zdjęcie
            <input type="file" hidden onChange={getImage} accept=".jpeg,.jpg" />
          </Button>
          <img src={image ? image : defaultAvatar} alt="avatar" />
        </div>
      </div>

      <div className="bottom-section">
        <div className="result-section">
          {error && <p className="error-message">{error}</p>}
        </div>
        <Button type="submit" variant="contained" className="submit-button">
          Wyślij
        </Button>
      </div>
    </form>
  );
};

export default AddContractor;
