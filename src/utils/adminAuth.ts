
// Admin authentication utility
export const adminCredentials = {
  email: "admin@admin.com",
  password: "admin321"
};

export const isAdminUser = (email: string, password: string): boolean => {
  return email === adminCredentials.email && password === adminCredentials.password;
};

// Store admin authentication status in session storage to persist across page refreshes
export const setAdminAuthenticated = (value: boolean): void => {
  sessionStorage.setItem("adminAuthenticated", String(value));
};

export const getAdminAuthenticated = (): boolean => {
  return sessionStorage.getItem("adminAuthenticated") === "true";
};

export const logoutAdmin = (): void => {
  sessionStorage.removeItem("adminAuthenticated");
};
