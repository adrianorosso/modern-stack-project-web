import { FieldError, Maybe } from "../generated/graphql";

export const toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    if (field != null && message != null) {
      errorMap[field] = message;
    }
  });

  return errorMap;
};
