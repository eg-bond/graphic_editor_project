import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth, db } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import {
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { SignInFormValues, SignUpFormValues } from '@/types/authTypes';
import { FbCollectionNames } from '@/types/firebaseTypes';

export interface ProviderProps {
  children: React.ReactNode;
}

export interface IAuthContext {
  user: User | null;
  loading: boolean;
  signIn: (values: SignInFormValues) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (values: SignUpFormValues) => Promise<void>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }

  return context;
}

export function AuthProvider({ children }: ProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Обсервер для изменения состояния аутентификации пользователя в firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading) {
        setLoading(false);
        console.warn('Auth state check timed out');
      }
    }, 10000);
    return () => clearTimeout(timeoutId);
  }, [loading]);

  const signIn: IAuthContext['signIn'] = useCallback(
    async (values: SignInFormValues) => {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
      } catch (error) {
        throw new Error((error as Error).message);
      }
    }, []);

  const signUp: IAuthContext['signUp'] = useCallback(
    async (values: SignUpFormValues) => {
      try {
        // Создаем пользователя в Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password,
        );

        // Сохраняем дополнительные данные о пользователе в Firestore
        await setDoc(doc(db, FbCollectionNames.Users, userCredential.user.uid), {
          nickname: values.nickname,
          email: values.email,
          createdAt: new Date(),
        });
      } catch (error) {
        throw new Error((error as Error).message);
      }
    }, []);

  const signOut: IAuthContext['signOut'] = useCallback(async () => {
    try {
      await auth.signOut();
      console.log('signOut success ');
    } catch (error) {
      console.error('signOut error:', error);
    }
  }, []);

  const value = { user, loading, signIn, signOut, signUp };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
