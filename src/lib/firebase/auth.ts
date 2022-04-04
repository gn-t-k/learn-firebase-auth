import firebase from "firebase";
import firebaseui from "firebaseui";

const ui = new firebaseui.auth.AuthUI(firebase.auth());

export const init = () => {
  ui.start("#firebaseui-auth-container", {
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  });
};
