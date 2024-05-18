// AppHeader.test.tsx
import { render, fireEvent, screen } from "@testing-library/react";
import { AuthUserProvider } from "@/app/_providers/authUserProvider";
import AppHeader from "@/app/_components/appHeader";
import { MockedProvider } from "@apollo/client/testing";

describe("AppHeader", () => {
  it("renders without crashing", () => {
    render(
      <MockedProvider>
        <AuthUserProvider>
          <AppHeader />
        </AuthUserProvider>
      </MockedProvider>
    );
  });

  it("shows sign in and sign up buttons when user is not active", () => {
    render(
      <MockedProvider>
        <AuthUserProvider>
          <AppHeader />
        </AuthUserProvider>
      </MockedProvider>
    );

    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

  // Assuming that you have a way to mock the active user state
  it("shows user menu when user is active", () => {
    render(
      <MockedProvider>
        <AuthUserProvider
          user={{
            name: "John Doe",
            email: "",
            isActive: true,
            auth0Id: "",
            createdAt: "",
            id: "",
            updatedAt: "",
          }}
        >
          <AppHeader />
        </AuthUserProvider>
      </MockedProvider>
    );

    fireEvent.click(screen.getByLabelText("account of current user"));

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("My account")).toBeInTheDocument();
    expect(screen.getByText("サインアウト")).toBeInTheDocument();
  });
});
