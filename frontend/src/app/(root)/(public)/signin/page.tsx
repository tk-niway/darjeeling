"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const SignIn = () => {
  const { isAuthenticated, logout, getAccessTokenSilently, getIdTokenClaims } =
    useAuth0();
  // const { getAccessTokenWithPopup } = useAuth0(); // For Dev 初回認証時はgetAccessTokenSilentlyの変わりにこれを使う

  async function verifyToken() {
    const accessToken = await getAccessTokenSilently({
      authorizationParams: {
        audience: process.env.NEXT_PUBLIC_AUTH0_IDENTIFIER,
        scope: process.env.NEXT_PUBLIC_AUTH0_SCOPE,
      },
    });

    const idToken = await getIdTokenClaims();

    console.log("tokens", { accessToken, idToken });

    // const result = await axios.get("http://127.0.0.1:3333/private", {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // });

    // console.log({ result });
  }

  // ログイン完了後にトークンを取得しRecoilへ格納
  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.NEXT_PUBLIC_AUTH0_IDENTIFIER,
            scope: process.env.NEXT_PUBLIC_AUTH0_SCOPE,
          },
        });
        console.log({ accessToken });
      } catch (e) {
        console.log(e);
      }
    };

    if (isAuthenticated) getToken();
  }, [isAuthenticated]);

  return (
    <>
    <h2>Sign in</h2>
      <div>
        <h2>ログイン状態</h2>
        {isAuthenticated ? (
          <>
            <p>ログイン中です</p>
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              ログアウト
            </button>
            <br />
            <br />
            <button onClick={verifyToken}>認証</button>
          </>
        ) : (
          <p>ログアウトしています</p>
        )}{" "}
      </div>
    </>
  );
};

export default SignIn;

// TODO フロントからトークンを投げてlogin apiを実行する
// TODO ログインのトークン認証をバックエンドに実装する
