import axios from "axios";

const baseUrl = "https://mern-todo-df8q.onrender.com"

const getAllTodo = (setTodo, setLoadingTodo) => {
    axios
    .get(baseUrl)
    .then(({data}) => {
        setTodo(data)
        setLoadingTodo(false)
    })
}

const getCompletedTodo = (setCompletedTodo) => {
    axios
    .get(`${baseUrl}/completed_todos`)
    .then(({data}) => {
        console.log('data => ', data);
        setCompletedTodo(data)
    })
}

// const addTodo = (text, setText, setTodo) => {
    
//     axios
//     .post(`${baseUrl}/save`, {text})
//     .then((data) => {
//         setText('')
//         getAllTodo(setTodo)
//         const toast = useToast();
//         toast({
//             title: "Task Added!!!",
//             status: "success",
//             duration: 5000,
//             isClosable: true,
//             position: "top",
//         });
//     })
//     .catch((err) => console.log(err))
// }
// const updateTodo = (todoId, text, setTodo, setCompletedTodo, setText, setIsUpdating) => {
//     axios
//     .post(`${baseUrl}/update`, {_id: todoId, text})
//     .then((data) => {
//         setText('')
//         setIsUpdating(false)
//         getAllTodo(setTodo)
//         getCompletedTodo(setCompletedTodo)
//         const toast = useToast();
//         toast({
//             title: "Task Updated!!!",
//             status: "success",
//             duration: 5000,
//             isClosable: true,
//             position: "top",
//         });
//     })
//     .catch((err) => console.log(err))
// }
// const checkTodo = (_id, isCompleted, setTodo, setCompletedTodo) => {
//     axios
//     .post(`${baseUrl}/mark_completed`, {_id, isCompleted})
//     .then((data) => {
//         getAllTodo(setTodo)
//         getCompletedTodo(setCompletedTodo)
//     })
//     .catch((err) => console.log(err))
// }
// const deleteTodo = (_id, setTodo) => {
//     axios
//     .post(`${baseUrl}/delete`, {_id})
//     .then((data) => {
//         getAllTodo(setTodo)
//         const toast = useToast();
//         toast({
//             title: "Task Deleted!!!",
//             status: "error",
//             duration: 5000,
//             isClosable: true,
//             position: "top",
//         });
//     })
//     .catch((err) => console.log(err))
// }


// export { getAllTodo, getCompletedTodo, addTodo, updateTodo, checkTodo, deleteTodo };

export { getAllTodo, getCompletedTodo };

