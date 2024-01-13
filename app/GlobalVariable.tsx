//A logged in/not logged in -variable made "global".
let loggedIn = "false";
const GlobalVariable = (prop: string) => {
  if (prop == "true") {
    loggedIn = "true";
  } else if (prop == "false") {
    loggedIn = "false";
  } else if (prop == "check") {
    console.log("ddrrrrrd", loggedIn);
    return loggedIn;
  }
};

export default GlobalVariable;
