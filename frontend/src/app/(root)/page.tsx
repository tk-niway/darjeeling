export default function Home() {
  return (
    <>
      <h1>Welcome to Darjeeling</h1>
    </>
  );
  // const { user, error, isLoading } = useUser();

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;

  // if (user) {
  //   return (
  //     <div>
  //       Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
  //     </div>
  //   );
  // }

  // return <a href="/api/auth/login">Login</a>;
  // const { loginWithRedirect } = useAuth0();

  // return <button onClick={() => loginWithRedirect()}>Log In</button>;
}
