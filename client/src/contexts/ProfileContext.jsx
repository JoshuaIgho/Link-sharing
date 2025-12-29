import { createContext, useState, useContext } from 'react';

export const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);

  const updateProfile = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  const updateLinks = (updatedLinks) => {
    setLinks(updatedLinks);
  };

  const addLink = (newLink) => {
    setLinks((prev) => [...prev, newLink]);
  };

  const removeLink = (linkId) => {
    setLinks((prev) => prev.filter((link) => link.id !== linkId));
  };

  const updateLink = (linkId, updatedData) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === linkId ? { ...link, ...updatedData } : link))
    );
  };

  const value = {
    profile,
    links,
    setProfile,
    setLinks,
    updateProfile,
    updateLinks,
    addLink,
    removeLink,
    updateLink,
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
};