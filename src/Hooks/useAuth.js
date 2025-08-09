import { useStore } from '../Store/Store';

export const useAuth = () => {
  const { user, setUser } = useStore();
  return { user, setUser };
};