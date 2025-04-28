import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'hr' | 'recruiter';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PREDEFINED_USER = {
  id: '1',
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'admin123',      
  role: 'admin' as const,
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('ats_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('ats_user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setError(null);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      if (email === PREDEFINED_USER.email && password === PREDEFINED_USER.password) {
        const { password: _, ...userWithoutPassword } = PREDEFINED_USER;
        setUser(userWithoutPassword);
        localStorage.setItem('ats_user', JSON.stringify(userWithoutPassword));
        return true;
      } else {
        setError('ایمیل یا رمز عبور نامعتبر است');
        return false;
      }
    } catch (error) {
      console.error('خطا در ورود:', error);
      setError('خطایی در هنگام ورود رخ داد');
      return false;
    }
  };

  const register = async (
    _name: string,
    email: string,
    _password: string
  ): Promise<boolean> => {
    setError(null);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    try {
      if (email === PREDEFINED_USER.email) {
        setError('این ایمیل قبلا ثبت شده است');
        return false;
      }
      alert('ثبت نام موفقیت آمیز بود! اکنون می‌توانید وارد شوید.\n\nدر نسخه واقعی، این بخش کاربر جدید را در پایگاه داده ایجاد می‌کند.');
      return true;
    } catch (error) {
      console.error('خطا در ثبت نام:', error);
      setError('خطایی در هنگام ثبت نام رخ داد');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ats_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth باید داخل AuthProvider استفاده شود');
  }
  
  return context;
};