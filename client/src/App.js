
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
import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import {
  getAllTodo,
  getCompletedTodo
} from "./utils/HandleApi";
function App() {
  const [todo, setTodo] = useState([]);
  const [completedTodo, setCompletedTodo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoId, setTodoId] = useState("");
  const [loadingTodo, setLoadingTodo] = useState(true);

  const toast = useToast();
  const baseUrl = "https://mern-todo-df8q.onrender.com"


  useEffect(() => {
    setLoadingTodo(true);
    getAllTodo(setTodo, setLoadingTodo);
    getCompletedTodo(setCompletedTodo);
    
  }, []);
  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setTodoId(_id);
  };
  const submitHandler = () => {
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

    addTodo(text, setText, setTodo);
  };

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

    updateTodo(todoId, text, setTodo, setCompletedTodo, setText, setIsUpdating);
  };
  const reset = () => {
    setText("");
    setIsUpdating(false);
    setTodoId('');
  };

  const addTodo = (text, setText, setTodo) => {
    
    axios
    .post(`${baseUrl}/save`, {text})
    .then((data) => {
        setText('')
        getAllTodo(setTodo)
        toast({
            title: "Task Added!!!",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
        });
    })
    .catch((err) => console.log(err))
};
const updateTodo = (todoId, text, setTodo, setCompletedTodo, setText, setIsUpdating) => {
  axios
  .post(`${baseUrl}/update`, {_id: todoId, text})
  .then((data) => {
      setText('')
      setIsUpdating(false)
      getAllTodo(setTodo)
      getCompletedTodo(setCompletedTodo)
      toast({
          title: "Task Updated!!!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
      });
  })
  .catch((err) => console.log(err))
}
const checkTodo = (_id, isCompleted, setTodo, setCompletedTodo) => {
  axios
  .post(`${baseUrl}/mark_completed`, {_id, isCompleted})
  .then((data) => {
      getCompletedTodo(setCompletedTodo)
      getAllTodo(setTodo)
      if(isCompleted===true){
        toast({
          title: "Task Completed!!!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else{
        toast({
          title: "Added to Upcomming Tasks!!!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
      });
      }
      
  })
  .catch((err) => console.log(err))
}


const deleteTodo = (_id, setTodo) => {
  axios
  .post(`${baseUrl}/delete`, {_id})
  .then((data) => {
      getAllTodo(setTodo)
      toast({
          title: "Task Deleted!!!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
      });
  })
  .catch((err) => console.log(err))
}
  

  return (
    <VStack spacing="10px" className="container">
      <Container maxW="xl" centerContent>
        <Box
          d="flex"
          justifyContent="center"
          p={3}
          bg="white"
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
          color="teal"
          textAlign="center"
        >
          <Text fontSize="4xl" fontFamily="Work sans">
            2Do CheckList
          </Text>
        </Box>
        <div className="todo-input">
          <div className="input">
            <input
              type="text"
              placeholder="Write Your Task...."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            {text ? <SmallCloseIcon className="cross" onClick={reset} /> : ""}
          </div>

          <div
            className={`${text ? "btn active" : "btn"}`}
            onClick={isUpdating ? () => updateHandler() : () => submitHandler()}
          >
            {isUpdating ? <CheckIcon/> : <AddIcon />}

          </div>
        </div>

        <Box
          bg="white"
          w="100%"
          p={4}
          borderRadius="lg"
          borderWidth="1px"
          style={{ marginTop: 15 }}
        >
          <Tabs isFitted variant="soft-rounded">
            <TabList mb="1em">
              <Tab>Upcomming Tasks</Tab>
              <Tab>Completed Tasks</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {loadingTodo ? (
                  <Box
                    d="flex"
                    justifyContent="center"
                    p={3}
                    bg="white"
                    w="100%"
                    borderRadius="lg"
                    textAlign="center"
                  >
                    <Spinner size="xl" />
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
                        deleteTodo={() => deleteTodo(item._id, setTodo)}
                        checkMode={() =>
                          checkTodo(item._id, true, setTodo, setCompletedTodo)
                        }
                      />
                    ))}
                  </div>
                ) : !loadingTodo ? (
                  <Text
                    fontSize="4xl"
                    fontFamily="Work sans"
                    textAlign="center"
                    className="todo"
                  >
                    No Task Found
                  </Text>
                ) : (
                  ""
                )}
              </TabPanel>
              <TabPanel>
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
                            deleteTodo={() => deleteTodo(item._id, setTodo)}
                            checkMode={() =>
                              checkTodo(
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
                      <Text
                        fontSize="4xl"
                        fontFamily="Work sans"
                        textAlign="center"
                        className="todo"
                      >
                        No Task Found
                      </Text>
                    )}
                  </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </VStack>
  );
}

export default App;
