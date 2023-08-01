import { tokenRefresh } from '@/apis/auth';
import { userState } from '@/store/user';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useRecoilState } from 'recoil';

interface LayoutProps {
  children: any;
}

export default function Layout({ children }: LayoutProps) {
  const [user, setUser] = useRecoilState(userState);
  const [cookies, setCookie, removeCookie] = useCookies(['refreshToken']);

  const tokenRefreshMutation = useMutation(tokenRefresh, {
    onSuccess: data => {
      //console.log(data);
      setUser({ ...user, accessToken: data.accessToken });
    },
    onError: error => {
      console.log(error);
    },
  });

  useEffect(() => {
    //console.log(cookies.refreshToken);

    tokenRefreshMutation.mutate(cookies.refreshToken);
  }, []);

  return <> {children} </>;
}
