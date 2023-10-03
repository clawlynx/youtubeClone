import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentElt from "./CommentElt";
import {
  addComment,
  editComment,
} from "../features/videorender/videoRenderSlice";

export default function Comments() {
  const [comment, setComment] = useState("");
  const [toEdit, setToEdit] = useState(false);
  const [editId, setEditId] = useState(0);
  const { commentList } = useSelector((state) => state.videoRender);
  const { user } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    const id = Date.now();

    const data = {
      id,
      comment,
      user,
    };

    dispatch(addComment(data));
    setComment("");
  }

  function handleEdit(id) {
    setToEdit(true);
    const currentComment = commentList.find((item) => item.id === id);
    setEditId(currentComment.id);
    setComment(currentComment?.comment);
  }

  function handleEditSave(e) {
    e.preventDefault();
    const data = {
      id: editId,
      comment,
      user,
    };
    dispatch(editComment(data));
    setComment("");
    setToEdit(false);
    setEditId(0);
  }

  return (
    <div className=" py-4">
      <form className="flex gap-2 items-center" onSubmit={handleSubmit}>
        <p className="px-2 py-0 bg-green-500 rounded-full">
          {user ? user.charAt(0).toUpperCase() : "U"}
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
      {commentList?.length > 0 &&
        commentList.map((item) => {
          return (
            <CommentElt
              key={item.id}
              commentbody={item.comment}
              commentUser={item.user}
              commentid={item.id}
              handleEdit={handleEdit}
            />
          );
        })}
      {toEdit && (
        <form className="flex gap-2 items-center" onSubmit={handleEditSave}>
          <p className="px-2 py-0 bg-green-500 rounded-full">
            {user ? user.charAt(0).toUpperCase() : "U"}
          </p>
          <input
            className="px-2 py-1 grow bg-neutral-900 rounded-md"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></input>
          <button
            className="py-1 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-900 "
            type="submit"
          >
            Save
          </button>
        </form>
      )}
    </div>
  );
}
