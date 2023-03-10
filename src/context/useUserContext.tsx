import { createContext, useContext } from "react";

interface IUserContext {
  customer: string;
}

interface IUserProvider {
  value: IUserContext;
  children: React.ReactNode;
}
export const userContext = createContext<IUserContext | null>(null);

export function UserProvider({ children, value }: IUserProvider) {
  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}

export function useUserValue() {
  return useContext(userContext);
}
