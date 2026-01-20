import { Card, Flex, Text } from "@radix-ui/themes";
import SigninForm from "./_components/SigninForm";


const SigninPage = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="drop-shadow-2xl w-full max-w-100 mx-4">
        <Flex direction="column" className="items-center p-4 pb-8">
          <p className="text-xl font-bold mt-4">Connexion</p>
          <p className="text-xs my-2">
            Veuillez entrer vos identifiants pour continuer
          </p>
          <SigninForm />
          <Text size="1" color="gray" my="4">
            Powered by ksoft <span className="text-xs align-top">&copy;</span>
          </Text>
        </Flex>
      </Card>
    </div>
  );
};

export default SigninPage;
