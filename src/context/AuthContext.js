import React, { createContext, useState, useContext } from 'react';
import { userData } from '../data/dummyData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const login = (userToken, phone) => {
    setToken(userToken);
    setPhoneNumber(phone);
    // Set user data from dummy data
    setCurrentUser(userData[phone] || null);
  };

  const logout = () => {
    setToken(null);
    setPhoneNumber(null);
    setCurrentUser(null);
  };

  const updateFlashCard = (cardId, newData, type) => {
    setCurrentUser(prev => {
      const updatedFlashCards = { ...prev.flashCards };
      
      // Remove from current category
      Object.keys(updatedFlashCards).forEach(category => {
        updatedFlashCards[category] = updatedFlashCards[category].filter(
          card => card.id !== cardId
        );
      });

      // Add to new category
      updatedFlashCards[type].push({ ...newData, id: cardId });

      return {
        ...prev,
        flashCards: updatedFlashCards
      };
    });
  };

  const addFlashCard = (cardData) => {
    setCurrentUser(prev => {
      const newCard = {
        id: Date.now().toString(),
        ...cardData,
        createdAt: new Date().toISOString().split('T')[0],
        status: 'active'
      };

      return {
        ...prev,
        flashCards: {
          ...prev.flashCards,
          active: [...prev.flashCards.active, newCard]
        }
      };
    });
  };

  return (
    <AuthContext.Provider value={{ 
      token,
      phoneNumber,
      setPhoneNumber,
      currentUser,
      login,
      logout,
      updateFlashCard,
      addFlashCard,
      isLoggedIn: !!token
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 