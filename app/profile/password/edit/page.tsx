import { BackButton } from "@/app/_components";
import { Flex, Text } from "@radix-ui/themes";
import { Key } from "lucide-react";
import EditPasswordForm from "../../_components/EditPasswordForm";

const EditPasswordPage = () => {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col">
        <div className="flex items-center justify-between border-b border-gray-200 h-[80px] mb-8">
          <Flex
            justify="between"
            gap="4"
            className="col-span-2 w-full max-w-3xl mx-auto"
          >
            <Flex align="center" gap="4">
              <Key size={15} />
              <Flex direction="column">
                <Text as="p" className="font-bold">
                  Modifier le mot de passe
                </Text>
                <Text as="p" size="1">
                  Completez les champs ci-dessous pour modifier le mot de passe
                </Text>
              </Flex>
            </Flex>

            <BackButton />
          </Flex>
        </div>
        <div className="min-w-3xl mx-auto">
          <EditPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default EditPasswordPage;
