import { AddIcon, CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Todo from "../components/Todo";
import { useAuthContext } from "../hooks/useAuthContext";
import { getAllTodo, getCompletedTodo } from "../utils/HandleApi";
function Home() {
  const [todo, setTodo] = useState([]);
  const [completedTodo, setCompletedTodo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoId, setTodoId] = useState("");
  const [loadingTodo, setLoadingTodo] = useState(true);
  const { user } = useAuthContext();
  const toast = useToast();
  const baseUrl = "https://mern-todo-s3kz.onrender.com";
  // const baseUrl = "http://localhost:5000";
  const token = user.token;
  const inputReference = useRef(null);

  useEffect(() => {
    if (user) {
      setLoadingTodo(true);
      getAllTodo(token, setTodo, setLoadingTodo);
      getCompletedTodo(token, setCompletedTodo);
    }
  }, [user]);

  /** Add new Task */
  const addHandler = async () => {
    // e.preventDefault();
    if (!text) {
      toast({
        title: "Please Fill the Feild",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    axios
      .post(
        `${baseUrl}/todos`,
        { text },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${user.token}`,
          },
        }
      )
      .then((data) => {
        setText("");
        getAllTodo(token, setTodo, setLoadingTodo);
        toast({
          title: "Task Added!!!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => console.log(err));
  };

  /** Set the task to be updated */
  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setTodoId(_id);
    inputReference.current.focus();
  };

  /** Update Task */
  const updateHandler = () => {
    if (!text) {
      toast({
        title: "Please Fill the Feild",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    axios
      .post(
        `${baseUrl}/todos/update`,
        { _id: todoId, text },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${user.token}`,
          },
        }
      )
      .then((data) => {
        setText("");
        setIsUpdating(false);
        getAllTodo(token, setTodo, setLoadingTodo);
        getCompletedTodo(token, setCompletedTodo);
        toast({
          title: "Task Updated!!!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => console.log(err));
  };

  /** Handle Todo Status */
  const handleCheck = (_id, isCompleted, setTodo, setCompletedTodo) => {
    axios
      .post(
        `${baseUrl}/todos/mark_completed`,
        { _id, isCompleted },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${user.token}`,
          },
        }
      )
      .then((data) => {
        getAllTodo(token, setTodo, setLoadingTodo);
        getCompletedTodo(token, setCompletedTodo);
        if (isCompleted === true) {
          toast({
            title: "Task Completed!!!",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        } else {
          toast({
            title: "Added to Upcomming Tasks!!!",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  /** Delete Task */
  const handleDelete = (_id, setTodo) => {
    axios
      .post(
        `${baseUrl}/todos/delete`,
        { _id },
        {
          mode: "no-cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${user.token}`,
          },
        }
      )
      .then((data) => {
        getAllTodo(token, setTodo, setLoadingTodo);
        getCompletedTodo(token, setCompletedTodo);
        toast({
          title: "Task Deleted!!!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => console.log(err));
  };

  /** reset input field */
  const handleReset = () => {
    setText("");
    setIsUpdating(false);
    setTodoId("");
  };

  return (
    <VStack spacing="10px" className="container">
      <Container maxW="xl" centerContent>
        <Text fontSize="3xl" mt={5} color="#58a6ff">
          {/* Hello {user.user.username}!!! */}
        </Text>

        <Box
          d="flex"
          justifyContent="center"
          p={4}
          bg="#242526"
          w="100%"
          m="5px 0"
          borderRadius="lg"
          textAlign="center"
        >
          <Text fontSize="2xl" color="#e4e6eb">
            {isUpdating ? "Update Your Task" : "Add New Task"}
          </Text>
          <div className="todo-input">
            <div className="input">
              <input
                type="text"
                placeholder="Write Your Task...."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                ref={inputReference}
              />
              {text ? (
                <SmallCloseIcon className="cross" onClick={handleReset} />
              ) : (
                ""
              )}
            </div>

            <div
              className={`${text ? "button active" : "button"}`}
              onClick={isUpdating ? () => updateHandler() : () => addHandler()}
            >
              {isUpdating ? <CheckIcon /> : <AddIcon />}
            </div>
          </div>
        </Box>

        <Box
          bg="#242526"
          w="100%"
          p={4}
          borderRadius="lg"
          style={{ marginTop: 15 }}
        >
          <Text fontSize="2xl" color="58a6ff" className="text-center">
            Your CheckList
          </Text>
          <Tabs isFitted variant="soft-rounded">
            <TabList mb="1em" className="tab">
              <Tab
                _selected={{ color: "white", bg: "#58a6ff" }}
                color="#B0B3B8"
              >
                Upcomming Tasks
              </Tab>
              <Tab
                _selected={{ color: "white", bg: "#58a6ff" }}
                color="#B0B3B8"
              >
                Completed Tasks
              </Tab>
            </TabList>

            <TabPanels>
              {/* Upcomming Tasks Tab */}
              <TabPanel>
                {loadingTodo ? (
                  <Box
                    d="flex"
                    justifyContent="center"
                    w="100%"
                    borderRadius="lg"
                    textAlign="center"
                  >
                    <Spinner size="xl" color="#fff" />
                  </Box>
                ) : todo.length > 0 ? (
                  <div>
                    {todo.map((item) => (
                      <Todo
                        key={item._id}
                        time={item.updatedAt}
                        text={item.text}
                        isChecked={false}
                        updateMode={() => updateMode(item._id, item.text)}
                        deleteMode={() => handleDelete(item._id, setTodo)}
                        checkMode={() =>
                          handleCheck(item._id, true, setTodo, setCompletedTodo)
                        }
                      />
                    ))}
                  </div>
                ) : !loadingTodo ? (
                  <Text fontSize="4xl" textAlign="center" className="todo">
                    No Task Found
                  </Text>
                ) : (
                  ""
                )}
              </TabPanel>

              {/* Completed Tasks Tab */}
              <TabPanel>
                {loadingTodo ? (
                  <Box
                    d="flex"
                    justifyContent="center"
                    w="100%"
                    borderRadius="lg"
                    textAlign="center"
                  >
                    <Spinner size="xl" color="#fff" />
                  </Box>
                ) : (
                  <div className="list">
                    {completedTodo.length > 0 ? (
                      <div>
                        {completedTodo.map((item) => (
                          <Todo
                            key={item._id}
                            time={item.updatedAt}
                            text={item.text}
                            isChecked={true}
                            updateMode={() => updateMode(item._id, item.text)}
                            deleteMode={() => handleDelete(item._id, setTodo)}
                            checkMode={() =>
                              handleCheck(
                                item._id,
                                false,
                                setTodo,
                                setCompletedTodo
                              )
                            }
                          />
                        ))}
                      </div>
                    ) : (
                      <Text fontSize="4xl" textAlign="center" className="todo">
                        No Task Found
                      </Text>
                    )}
                  </div>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </VStack>
  );
}

export default Home;
