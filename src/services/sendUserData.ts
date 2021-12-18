import api from "./axiosConfig";
import { buildUserDataRequestBody } from "../components/AddContractor/userData.client";
import { CombinedContractorData } from "../components/AddContractor/userData.interface";

const sendUserData = async (data: CombinedContractorData) => {
  let errorToDisplay = "";
  try {
    const response = await api.post(
      "Contractor/Save",
      buildUserDataRequestBody({ ...data })
    );
    console.log(response.data);
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 404) {
        errorToDisplay = "Nie znaleziono metody zapisu";
      } else {
        errorToDisplay = `${error.response.status} ${error.response.statusText}`;
      }
    } else {
      // Since there is no server hosted on this URL we won't receive any HTTP Status
      errorToDisplay = "Nie znaleziono metody zapisu";
    }
  }

  return errorToDisplay;
};

export default sendUserData;
