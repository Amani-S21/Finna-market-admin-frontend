import EditPasswordForm from "../../_components/EditPasswordForm";

import AccountPage from "@/app/_components/AccountPage";

const EditPasswordPage = () => {
  return <AccountPage title="Modifier mon mot de passe" description="Renseignez les champs ci-dessous pour modifier votre mot de passe."><EditPasswordForm /></AccountPage>;
};

export default EditPasswordPage;
