import { useEffect, useState } from "react";
import { user } from "./types/user";
import { useApi } from "./hooks/useApi";
import { method } from "./types/methodsApi";
import { UsersProvider } from "./contexts/UserContext";
import UsersTable from "./components/custom/UsersTable";

function App() {
  const [users, setUsers] = useState([]);
  const { fetchData, error, loading } = useApi(import.meta.env.VITE_PUBLIC_API);

  useEffect(() => {
    fetchData("/users", method.get).then((res) =>
      setUsers(res?.data.users)
    );
  }, []);

  return (
    <>
      {/* <ul>
        {loading && <li>Loading...</li>}
        {users?.length > 0 ? (
          users.map((user: user) => (
            <li key={user.id}>{user.firstName}</li>
          ))
        ) : (
          <li>{error && "Something went wrong"}</li>
        )}
      </ul> */}
          <UsersProvider>
      <UsersTable />
    </UsersProvider>
    </>
  );
}

export default App;
