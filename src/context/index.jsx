import { createContext, useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const GlobalContext = createContext(null)

export default function GlobalState({ children }) {
    const date = new Date()
    const currentYear = date.getFullYear();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null});
    const [token, setToken] = useState(() => localStorage.getItem("token"))
    const navigate = useNavigate()
    const [userData, setUserData] = useState(user);
    const [notes, setNotes] = useState([])
    const [note, setNote] = useState({
        title: "",
        content: ""
    })
    const [isOpen, setIsOpen] = useState(false);
    const profileRef = useRef(null);



    const handleChange = (e) => {
        const { name, value } = e.target

        setNote(prevNote => {
            return {
                ...prevNote,
                [name]: value
            }
        })
    }

    useEffect(() => {
        if (token) {
            axios.get("https://notes-app1738-8a7df68e8a41.herokuapp.com/profile", {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => {
                    localStorage.setItem("user", JSON.stringify(res.data));
                    setUser(res.data)
                })
                .catch(() => {
                    localStorage.removeItem("user")
                    localStorage.removeItem("token")
                    setUser(null)
                    setToken(null)
                })
        }
    }, [token])

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            await axios.post("https://notes-app1738-8a7df68e8a41.herokuapp.com/register", { name, email, password });
            navigate("/login")
        } catch (err) {
            console.log("Regitration failed", err);

        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://notes-app1738-8a7df68e8a41.herokuapp.com/login", { email, password });
            localStorage.setItem("token", res.data.access_token);
            setToken(res.data.access_token);
            console.log("Login response:", res.data);

            const userRes = await axios.get("https://notes-app1738-8a7df68e8a41.herokuapp.com/profile", {
                headers: { Authorization: `Bearer ${res.data.access_token}` },
            })
            console.log("User data:", userRes.data);
            localStorage.setItem("token", res.data.access_token)
            setUser(userRes.data)
            navigate('/dashboard')
        } catch (err) {
            console.log("Login failed:", err);
        }
    }


    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null)
        setToken(null)
        navigate("/")
         setIsOpen(false);
    }

    
   

    useEffect(() => {
        if (user) {
          setUserData(user);
        }
      }, [user]);

    

    useEffect(() => {
        if (!userData) {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUserData(JSON.parse(storedUser))
            }
        }
    }, [userData]);

    useEffect(() => {
        const path = window.location.pathname;
        const isAuthRoute = path === '/' || path === '/login' || path === '/register';
    
        // Check if token is present in localStorage first
        if (!token) {
            // If the token doesn't exist and the user is not on the auth routes, redirect to login
            if (!isAuthRoute) {
                navigate('/login');
            }
        } else {
            // If token exists but userData is missing, try to load userData from localStorage
            if (!userData) {
                const storedUser = localStorage.getItem("user");
                if (storedUser) {
                    setUserData(JSON.parse(storedUser)); // Load userData into state from localStorage
                }
            }
        }
    }, [token, userData, navigate]);
    

      const fetchNotes = useCallback(async () => {
        try {
            const response = await axios.get("https://notes-app1738-8a7df68e8a41.herokuapp.com/notes", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("fetched notes:", response.data)
            setNotes(response.data.notes_list)
        } catch (error) {
            console.error("Error fetching notes:", error);

        }
    }, [token])
    


    const addNote = async (note) => {
        if (!note.title.trim() || !note.content.trim()) return;
        try {
           
                await axios.post("https://notes-app1738-8a7df68e8a41.herokuapp.com/notes", JSON.stringify(note), {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },

            })
            await fetchNotes()
            //setNotes([...notes, response.data]);
            console.log('Note added successfully');

        } catch (error) {
            console.error("Error adding note");

        }
    }

    const deleteNote = async (id) => {
        try {
            await axios.delete(`https://notes-app1738-8a7df68e8a41.herokuapp.com/notes/${id}`, {
                headers: { 
                    Authorization: `Bearer ${token}` 
                }
            });
            // Using the functional form of setNotes to ensure it's based on the latest state
            setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!note.title.trim() || !note.content.trim()) {
            alert("Title and content can not be empty")
            return;
        }
       addNote(note)

        setNote({
            title: "",
            content: ""
        })
    }


    return <GlobalContext.Provider
        value={{
            note,
            notes,
            user,
            token,
            userData,
            email,
            name,
            password,
            currentYear,
            isOpen,
            profileRef,
            setIsOpen,
            setEmail,
            setName,
            setNote,
            setNotes,
            setPassword,
            setToken,
            setUser,
            setUserData,
            handleChange,
            handleLogin,
            handleLogout,
            handleRegister,
            handleSubmit,
            addNote,
            deleteNote,
            fetchNotes
        }} >{children}</GlobalContext.Provider>
}