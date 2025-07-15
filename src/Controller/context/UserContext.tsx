import { createContext, ReactNode, useContext, useEffect } from "react";
import { useLocalStorage } from "../LocalStorage/useLocalStorage";

//Types:
import { Role } from "../../Model/Types/Roletypes";
import { User } from "../../Model/Types/Usertypes";

//Services:
import { getRoleById } from "../../Model/Services/Role/index";

type UserContextType = {
  user: User | null;
  role: Role | null;
  setUser: (user: User) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserStorage] = useLocalStorage<User | null>("user", () => null);
  const [role, setRoleStorage] = useLocalStorage<Role | null>("role", () => null);

  const setUser = async (newUser: User) => {
    if(newUser != null){
      setUserStorage(newUser);

      try {
        if (user != null && !role) {
          const roleData = await getRoleById(newUser.role);
          setRoleStorage(roleData);
          console.log(roleData);
        }
      } catch (err) {
        console.error("Error al cargar el rol:", err);
        setRoleStorage(null);
      }
    }else{

    }
    
  };

  const logout = () => {
    setUserStorage(null);
    setRoleStorage(null);
    localStorage.removeItem("token");
  };

  // Si ya hay un usuario cargado al iniciar, intenta recuperar el rol
  useEffect(() => {
    //If the jwt doesn't exist anymore logout
    if(!localStorage.getItem("token")){
      logout();
    }

    const loadRole = async () => {
      if (user != null && user.role != null && !role) {
        try {
          const roleData = await getRoleById(user.role);

          setRoleStorage(roleData);
        } catch (err) {
          setUserStorage(null);
          setRoleStorage(null);

          console.error(err);
        }
      }
    };

    

    loadRole();
  }, [user, role]);

  return (
    <UserContext.Provider value={{ user, role, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un UserProvider");
  }
  return context;
};