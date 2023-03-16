import { useHistory } from "react-router-dom";


export default function logout(history){
    
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    history.push("/auth/login");
    
  }