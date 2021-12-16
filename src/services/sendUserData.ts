import React from "react";
import api from "./axiosConfig";
import { buildRequestBody } from "../components/AddContractor/userData.client";
import { showNotification } from "../utils/notification";
import { DataToTransform } from "../components/AddContractor/userData.interface";

const sendUserData = async (
  data: DataToTransform,
  setUserError: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    const response = await api.post(
      "Contractor/Save",
      buildRequestBody({ ...data })
    );
    showNotification("Sukces!", "Udało się wysłać dane", "danger");
    console.log(response);
  } catch (error: any) {
    // Since there is no server hosted on this URL we won't receive any HTTP Status
    showNotification("Błąd", "Nie znaleziono metody zapisu", "danger");
    setUserError("Nie znaleziono metody zapisu");
    console.log(error.message);
  }
};

export default sendUserData;
