import React, { createContext, useContext, useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

const InventoryContext = createContext();

export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    if (!user) return;
    const fetchInventory = async () => {
      const userRef = doc(db, "inventories", user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setInventory(docSnap.data().weapons ?? []);
      }
    };
    fetchInventory();
  }, [user]);

  const addWeaponToInventory = async (weapon) => {
    if (!user) return;
    const userRef = doc(db, "inventories", user.uid);
    const userDoc = await getDoc(userRef);
    let updatedWeapons = [];
    try {
      if (userDoc.exists()) {
        updatedWeapons = [...userDoc.data().weapons, weapon];
      } else {
        updatedWeapons.push(weapon);
      }
      await setDoc(userRef, { weapons: updatedWeapons });
      setInventory(updatedWeapons);
      toast.success("Le skin a été ajouté à l'inventaire avec succès!");
    } catch (error) {
      console.error("Erreur lors de l'ajout du skin dans l'inventaire: ", error);
      toast.error("Une erreur est survenue lors de l'ajout du skin à l'inventaire.");
    }
  };

  const removeWeaponFromInventory = async (weaponId) => {
    if (!user) return;
    const userRef = doc(db, "inventories", user.uid);
    const userDoc = await getDoc(userRef);
    try {
      if (userDoc.exists()) {
        const updatedWeapons = userDoc
          .data()
          .weapons.filter((weapon) => weapon.id !== weaponId);
        await setDoc(userRef, { weapons: updatedWeapons });
        setInventory(updatedWeapons);
        console.log(weaponId)
        toast.success("Le skin a été supprimé à l'inventaire avec succès!");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du skin de l'inventaire: ", error);
      toast.error("Une erreur est survenue lors de la suppression du skin de l'inventaire.");
    }
  };

  const value = {
    inventory,
    addWeaponToInventory,
    removeWeaponFromInventory,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};
