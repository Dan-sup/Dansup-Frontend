import { userState } from '@/store/user';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useCookies } from 'react-cookie';
import { useMutation } from '@tanstack/react-query';
import { getMyInfo } from '@/apis/my';

export default function OauthSuccessPage() {
  const router = useRouter();
  const data = router.query;

  const [user, setUser] = useRecoilState(userState);

  const [cookies, setCookie] = useCookies(['refreshToken']);

  /*
  const getMyInfoMutation = useMutation(getMyInfo, {
    onSuccess: data => {
      setUser({ ...user, profileImg: data.profileImageUrl });
    },
    onError: error => {
      console.log(error);
    },
  });
  */

  useEffect(() => {
    if (!router.isReady) return;
    console.log(data);
    console.log(data.accessToken);

    if (data.isGuest === 'true') {
      ////회원가입 테스트할 땐 'false'로
      router.push({
        pathname: '/register',
        query: { accessToken: data.accessToken },
      });
    } else {
      //이 페이지에서 바로 set은 되는데 콘솔에는 안나옴.....
      {
        setUser({
          ...user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });
        console.log(user);
        setCookie('refreshToken', data.refreshToken, {
          sameSite: 'strict',
          path: '/',
        }); //옵션 설정했더니 쿠키 바로 설정됨!!!!!!!
        //getMyInfoMutation.mutate(data.accessToken);
        router.push('/');
      }
    }
  }, [router.isReady]);

  return <></>;
}
