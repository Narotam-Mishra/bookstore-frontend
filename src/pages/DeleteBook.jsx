import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams} from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    axios
      .delete(`https://bookstore-mern-backend-f4fn.onrender.com/bookAPI/deleteBook/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book deleted successfully!!', {variant: 'success'});
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        //alert("An error happened. Please Check console more details");
        enqueueSnackbar('Error', {variant: 'error'});
        console.log(err);
      });
  };

  return (
    <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4 text-center">Delete Book</h1>
        {loading ? <Spinner /> : ''}
        <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl p-8 w-[600px] mx-auto">
            <h3 className="text-2xl">Are You Sure You want to delete this book?</h3>
            <button 
                className="p-4 bg-red-600 text-white m-8 w-full"
                onClick={handleDeleteBook}
            >
            Yes, Delete it
            </button>
        </div>
    </div>
  )
}

export default DeleteBook;
