import { Flex, Text } from "@radix-ui/themes";

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

export default ProfileItem;
