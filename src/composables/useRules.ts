export function useFieldIsRequired(fieldName: string) {
  return (v?: string) => {
    if (v !== undefined && v !== null && v !== "") return true;
    return `Field ${fieldName} is required`;
  };
}

export const useRules = (fieldName: string) => {
  useFieldIsRequired(fieldName);
};
export default useRules;
