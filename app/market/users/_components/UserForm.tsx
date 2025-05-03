"use client";

import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Roles, User, UserSchema } from "@/app/lib/types";
import { Button, Flex, Select } from "@radix-ui/themes";
import { useUpdateUser, useUserForm } from "../_features/hooks";
import { Controller } from "react-hook-form";
import { Spinner } from "@/app/_components";
import { userRoles } from "./UserRoleFilter";

const UserForm = ({ user }: { user?: User }) => {
  const axios = useAxiosAuth();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useUserForm();

  const { mutateAsync: updateUser } = useUpdateUser({ axios });

  const onSubmit = async (data: UserSchema) => {
    if (user && data.role)
      await updateUser({ id: user?.id, role: data.role as Roles });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl">
      <Flex direction="column" gap="2">
        <p className="text-sm font-bold">Role</p>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select.Root
              defaultValue={user?.role}
              value={field.value}
              onValueChange={field.onChange}
            >
              <Select.Trigger />
              <Select.Content>
                <Select.Group>
                  <Select.Label>Différents roles</Select.Label>
                  {userRoles.map((role) => (
                    <Select.Item key={role.value} value={`${role.value}`}>
                      {role.label}
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Content>
            </Select.Root>
          )}
        />
      </Flex>
      <Button disabled={isSubmitting} mt="4">
        Enregistrer {isSubmitting && <Spinner />}
      </Button>
    </form>
  );
};


export default UserForm;
