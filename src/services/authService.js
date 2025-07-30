class AuthService {
  constructor() {
    this.USERS_KEY = "campusfind_users";
    this.CURRENT_USER_KEY = "campusfind_current_user";
  }

  // Get all users from localStorage
  getUsers() {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  // Save users to localStorage
  saveUsers(users) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  // Get current logged in user
  getCurrentUser() {
    const user = localStorage.getItem(this.CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  // Set current user
  setCurrentUser(user) {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }

  // Remove current user (logout)
  logout() {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  // Register a new user
  async register(userData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const users = this.getUsers();

          // Check if user already exists
          const existingUser = users.find(
            (user) => user.email === userData.email
          );
          if (existingUser) {
            resolve({
              success: false,
              error: "User already exists with this email",
            });
            return;
          }

          // Create new user
          const newUser = {
            id: Date.now().toString(),
            fullName: userData.fullName,
            email: userData.email,
            password: userData.password, // In real app, this would be hashed
            createdAt: new Date().toISOString(),
          };

          // Save to users list
          users.push(newUser);
          this.saveUsers(users);

          // Don't auto login on registration, let user login manually
          resolve({
            success: true,
            user: {
              id: newUser.id,
              fullName: newUser.fullName,
              email: newUser.email,
              createdAt: newUser.createdAt,
            },
          });
        } catch (error) {
          resolve({
            success: false,
            error: "An unexpected error occurred during registration",
          });
        }
      }, 1500); // Simulate network delay
    });
  }

  // Login user
  async login(email, password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const users = this.getUsers();

          // Find user
          const user = users.find(
            (u) => u.email === email && u.password === password
          );
          if (!user) {
            resolve({
              success: false,
              error: "Invalid email or password",
            });
            return;
          }

          // Set as current user
          const userForStorage = { ...user };
          delete userForStorage.password; // Don't store password in current user
          this.setCurrentUser(userForStorage);

          resolve({
            success: true,
            user: userForStorage,
          });
        } catch (error) {
          resolve({
            success: false,
            error: "An unexpected error occurred during login",
          });
        }
      }, 1000); // Simulate network delay
    });
  }

  // Check if user is logged in
  isAuthenticated() {
    return this.getCurrentUser() !== null;
  }

  // Get user display name
  getUserDisplayName() {
    const user = this.getCurrentUser();
    return user ? user.fullName : null;
  }
}

export default new AuthService();
