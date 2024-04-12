import { db } from "../_utils/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

export const getTransactions = async (userId) => {
  try {
    const itemsCollection = collection(db, "users", userId, "items");
    const itemsSnapshot = await getDocs(itemsCollection);

    const items = itemsSnapshot.docs.map((doc) => {
      const data = doc.data();

      let date = data.date.toDate();

      // Adjust the date to Mountain Standard Time (MST)
      const mstOffset = -7 * 60; // MST is UTC-7 hours
      const localOffset = date.getTimezoneOffset(); // User's local time offset
      date = new Date(date.getTime() + (mstOffset - localOffset) * 60 * 1000);

      // Update the data object with the adjusted date
      data.date = date;

      // Return the mapped item
      return {
        id: doc.id,
        ...data,
      };
    });
    return items;
  } catch (error) {
    console.log("Error getting transactions: ", error);
  }
};

export const addTransactions = async (userId, item) => {
  try {
    const itemsCollection = collection(db, "users", userId, "items");

    if (item.date instanceof Timestamp) {
      item.date = item.date.toDate();
      item.date.setDate(item.date.getDate() + 1);
    }

    const docRef = await addDoc(itemsCollection, item);

    console.log("date service: ", item.date);

    return docRef.id;
  } catch (error) {
    console.log("Error adding transaction (service): ", error);
  }
};

export const deleteTransaction = async (userId, itemId) => {
  console.log("User id: ", userId);
  console.log("Transaction id: ", itemId);
  try {
    const itemRef = doc(db, "users", userId, "items", itemId);
    await deleteDoc(itemRef);
    return itemId;
  } catch (error) {
    console.log("Error deleting transaction (service): ", error);
  }
};
