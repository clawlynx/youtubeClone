import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentElt from "./CommentElt";
//import VisitorAPI from "visitorapi";
import { addComment } from "../features/videorender/videoRenderSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Comments() {
  const { id } = useParams();

  const [comment, setComment] = useState("");
  const [toEdit, setToEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const { commentList } = useSelector((state) => state.videoRender);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //function to add comment
  async function handleSubmit(e) {
    e.preventDefault();
    const updata = {
      videoId: id,
      comment,
      userId: user._id,
      location: `${city}, ${state}, ${country}`,
    };
    const { data } = await axios.post("/api/comment/add", updata);
    if (data) {
      getComments();
      setComment("");
    } else {
      toast.error("failed to add comment. please try after sometime");
    }
  }

  //function to handle edit button
  function handleEdit(id) {
    setToEdit(true);
    const currentComment = commentList.find((item) => item._id === id);
    setEditId(currentComment._id);
    setComment(currentComment?.body);
  }

  //function to handle cancel button
  function cancelEdit() {
    setToEdit(false);
    setEditId("");
    setComment("");
  }

  //function to edit a comment
  async function handleEditSave(e) {
    e.preventDefault();
    const updata = {
      id: editId,
      body: comment,
      //location: `${city}, ${state}, ${country}`,
    };
    const { data } = await axios.patch("/api/comment/edit", updata);
    if (data) {
      getComments();
      setComment("");
      setToEdit(false);
      setEditId("");
    } else {
      toast.error("unable to edit. please try after sometime");
    }
  }

  //function for fetching comments
  async function getComments() {
    const { data } = await axios.get(`/api/comment/find/${id}`);
    if (data) {
      dispatch(addComment(data));
    } else {
      dispatch(addComment([]));
    }
  }

  useEffect(() => {
    getComments();
    /*VisitorAPI("GI1dZ3ssMngvbYEzaa6y", (data) => {
      setCountry(data.countryName);
      setState(data.region);
      setCity(data.city);
    });*/
  }, [id]);

  if (toEdit) {
    return (
      <form className="flex gap-2 items-center" onSubmit={handleEditSave}>
        <p className="px-2 py-0 bg-green-500 rounded-full">
          {user?.username.charAt(0).toUpperCase()}
        </p>
        <input
          className="px-2 py-1 grow bg-neutral-900 rounded-md"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></input>
        <button
          className="py-1 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-900 "
          onClick={cancelEdit}
        >
          cancel
        </button>
        <button
          className="py-1 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-900 "
          type="submit"
        >
          Save
        </button>
      </form>
    );
  }

  return (
    <div className=" py-4">
      {user ? (
        <form className="flex gap-2 items-center" onSubmit={handleSubmit}>
          <p className="px-2 py-0 bg-green-500 rounded-full">
            {user?.username.charAt(0).toUpperCase()}
          </p>
          <input
            className="px-2 py-1 grow bg-neutral-900 rounded-md"
            type="text"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder="add a comment..."
          ></input>
          <button
            className="py-1 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-900 "
            type="submit"
          >
            Add
          </button>
        </form>
      ) : (
        <p className=" text-xl">Please Sign in to add a coment</p>
      )}

      {commentList?.length > 0 &&
        commentList.map((item) => {
          return (
            <CommentElt
              key={item._id}
              commentbody={item.body}
              commentUser={item.whoCommented}
              commentid={item._id}
              commentorigin={item.created}
              commentlocation={item.location}
              handleEdit={handleEdit}
              fetchcomment={getComments}
            />
          );
        })}
      {/*toEdit && (
        
      )*/}
    </div>
  );
}
