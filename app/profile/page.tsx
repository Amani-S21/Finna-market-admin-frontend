import { Avatar, Button, Flex, Grid, Separator, Text } from "@radix-ui/themes";
import { FaRegUserCircle } from "react-icons/fa";
import { BackButton } from "../_components";

const ProfilePage = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-3xl mx-auto flex flex-col">
        <Flex justify="between" mb="9" gap="4" className="col-span-2">
          <Flex align="center" gap="4">
            <FaRegUserCircle />
            <Flex direction="column">
              <Text as="p" className="font-bold">
                Profile
              </Text>
              <Text as="p" size="1">
                Informations du compte
              </Text>
            </Flex>
          </Flex>

          <BackButton />
        </Flex>

        <Flex>
          <div className="mb-4 bg-green-00 ">
            <Avatar fallback="YG" radius="full" size="8" />
          </div>
          <Flex direction="column" ml="5" className="bg-amber-0 w-full">
            <ProfileItem title="Nom complet" value="YALA Gédéon" />
            <Separator size="4" mt="4" />
            <ProfileItem title="Numero de téléphone" value="+243 971 945 367" />
            <Separator size="4" mt="4" />
            <ProfileItem
              title="Addrèsse mail"
              value="gedeonyalakuhanda@gmail.com"
            />
            <div className="self-start">
              <Button mt="8">Editer le profile</Button>
            </div>
          </Flex>
        </Flex>
      </div>
    </div>
  );
};

type Props = {
  title: string;
  value: string;
};

const ProfileItem = ({ title, value }: Props) => {
  return (
    <Flex direction="column" gap="2" mt="5">
      <Text as="p" size="1" className="font-bold">
        {title}
      </Text>
      <Text as="p" size="2">
        {value}
      </Text>
    </Flex>
  );
};

export default ProfilePage;
