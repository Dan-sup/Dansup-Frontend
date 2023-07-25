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

  const getMyInfoMutation = useMutation(getMyInfo, {
    onSuccess: data => {
      setUser({ ...user, profileImg: data.userProfileImage });
    },
    onError: error => {
      console.log(error);
    },
  });

  useEffect(() => {
    //console.log(data);
    //console.log(data.accessToken);

    if (data.isGuest === 'true') {
      router.push({
        pathname: '/register',
        query: { accessToken: data.accessToken },
      });
    } else {
      setUser({ ...user, accessToken: data.accessToken });
      setCookie('refreshToken', data.refreshToken);
      getMyInfoMutation.mutate(data.accessToken);
    }
  }, [data]);

  return <></>;
}
