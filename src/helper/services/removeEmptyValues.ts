export const removeEmptyValues = <T extends Record<string, any>>(obj: T) => {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([_, value]) =>
          value !== "" &&
          value !== null &&
          value !== undefined
      )
    ) as Partial<T>;
  };