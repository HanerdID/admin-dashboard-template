import { useState, useEffect } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // State untuk menyimpan nilai
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      // Coba dapatkan item dari localStorage
      const item = window.localStorage.getItem(key);
      // Parse JSON jika ada, jika tidak kembalikan initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Jika terjadi error, kembalikan nilai awal
      console.error(error);
      return initialValue;
    }
  });

  // Fungsi untuk memperbarui nilai localStorage dan state
  const setValue = (value: T) => {
    try {
      // Simpan state
      setStoredValue(value);

      // Simpan ke localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Sinkronisasi state jika localStorage berubah di tab/window lain
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        setStoredValue(JSON.parse(e.newValue));
      }
    };

    // Listen for storage changes
    window.addEventListener("storage", handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}
