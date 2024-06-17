import { createContext } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { AllPosts } from "./AllPosts";
import "/output.css";
import MessageBoard from "./MessageBoard";
import NavBar from "./NavBar";
import { PostView } from "./Post";
import { SupashipUserInfo, useSession } from "./use-session";
import { Welcome } from "./Welcome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <MessageBoard />,
        children: [
          {
            path: ":pageNumber",
            element: <AllPosts />,
          },
          {
            path: "post/:postId",
            element: <PostView />,
          },
        ],
      },
      {
        path: "welcome",
        element: <Welcome />,
      },
    ],
  },
]);

export const UserContext = createContext<SupashipUserInfo>({
  session: null,
  profile: null,
});

function App() {
  return <RouterProvider router={router} />;
}

function Layout() {
  const supashipUserInfo = useSession();
  return (
    <UserContext.Provider value={supashipUserInfo}>
      <NavBar />
      <Outlet />
    </UserContext.Provider>
  );
}

export default App;
