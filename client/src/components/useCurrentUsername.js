import { useState } from "react";

export default function useId() {
  const getId = () => {
    const id = localStorage.getItem("id");
    return id;
  };

  // const [id, setId] = useState(getId());

  const saveId = (clientId) => {
    localStorage.setItem("id", JSON.stringify(clientId));
    // setId(clientId);
  };

  return {
    setId: saveId,
    getId,
  };
}
