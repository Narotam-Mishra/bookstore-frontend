import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from 'notistack';

const UpdateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
        .get(`https://bookstore-mern-backend-f4fn.onrender.com/bookAPI/getBookById/${id}`)
        .then((response) => {
            setAuthor(response.data.author);
            setPublishYear(response.data.publishYear);
            setTitle(response.data.title);
        })
        .catch((err) => {
            setLoading(false);
            //alert('An error happened. Please Check console');
            enqueueSnackbar('Error', {variant: 'error'});
            console.log(err);
        })
  }, [enqueueSnackbar, id])

  const handleUpdateBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`https://bookstore-mern-backend-f4fn.onrender.com/bookAPI/updateBook/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book details updated successfully!!', {variant: 'success'});
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        //alert("An error happened. Please Check console");
        enqueueSnackbar('Error', {variant: 'error'});
        console.log(err);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 text-center">Update Book Details</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label htmlFor="b-title" className="text-xl mr-4 text-gray-500">
            Title
          </label>
          <input
            type="text"
            id="b-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label htmlFor="b-author" className="text-xl mr-4 text-gray-500">
            Author
          </label>
          <input
            type="text"
            id="b-author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label htmlFor="b-pyear" className="text-xl mr-4 text-gray-500">
            Publish Year
          </label>
          <input
            type="text"
            id="b-pyear"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleUpdateBook}>
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateBook;
