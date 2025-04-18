import { Text } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <Text size="1" color="red" as="p">
      {children}
    </Text>
  );
};

export default ErrorMessage;
