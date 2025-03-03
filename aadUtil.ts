import { aadClientId, msalInstance } from "./authConfig";

export const acquireAdToken = async () =>
  acquireTokenInternal([`${aadClientId}/.default`]);

export const getAadAuthHeaders = (token: string) => {
  if (token === "") {
    return {};
  }

  return { Authorization: `Bearer ${token}` };
};

export const acquireTokenInternal = async (scopes: string[]) => {
  const account = msalInstance.getActiveAccount();
  if (account === null) {
    throw Error("unexpected, no active account");
  }
  try {
    return (
      await msalInstance.acquireTokenSilent({
        scopes,
        account,
      })
    ).accessToken;
  } catch (err) {
    console.log("acquireTokenSilent error");
    console.log(err);
    window.location.reload();
    return "";
  }
};
