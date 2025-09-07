export const getErrorMessage = (error: any): string => {
//   const statusCode = error?.response?.status;
  const backendMessage =
    error?.response?.data?.message ?? "Une erreur est survenue";
  throw Error(backendMessage);
};