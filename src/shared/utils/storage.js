export function getFromStorage(key, defaultValue) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
}

export function setInStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}