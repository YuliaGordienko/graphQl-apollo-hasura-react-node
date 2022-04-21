import "./App.css";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS, GET_ONE_USER } from "./query/user";
import { CREATE_USER } from "./mutation/user";
function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const { data: oneUser, loading: loadingOneUser } = useQuery(GET_ONE_USER, {
    variables: {
      id: 1,
    },
  });
  const [newUser] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  //  console.log(oneUser);
  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data]);
  const addUser = (e) => {
    e.preventDefault();
    newUser({
      variables: {
        input: {
          username,
          age,
        },
      },
    }).then(({ data }) => {
      console.log(data);
      setUsername("");
      setAge(0);
    });
  };
  // if (loading) {
  //   return <h1>Loading</h1>;
  // }
  const getAll = (e) => {
    e.preventDefault();
    refetch();
  };
  return (
    <div className="App">
      <form style={{ marginTop: 40 }}>
        <input
          style={{ width: 250, height: 25 }}
          placeholder="Name"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={{ width: 250, height: 25 }}
          placeholder="age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <div style={{ marginTop: 40 }}>
          <button
            style={{
              width: 100,
              height: 35,
              color: "orange",
            }}
            onClick={(e) => addUser(e)}
          >
            Create
          </button>
          <button
            onClick={(e) => getAll(e)}
            style={{ width: 100, height: 35, color: "orange" }}
          >
            Get
          </button>
        </div>
      </form>
      <div>
        {users.map((user) => (
          <div>
            {user.id} {user.username} {user.age}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
