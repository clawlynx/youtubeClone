import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../features/videorender/videoRenderSlice";

export default function CommentElt({
  commentbody,
  commentUser,
  commentid,
  handleEdit,
}) {
  const { user } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  function handleDelete(id) {
    dispatch(deleteComment(id));
  }

  return (
    <>
      <div className="border-b border-neutral-900">
        <div className="mt-3 py-2  flex gap-3 items-center">
          <p className="px-4 py-2 bg-gray-800 rounded-full">
            {commentUser.charAt(0).toUpperCase()}
          </p>
          <div>
            <p className=" text-gray-600 text-sm">{commentUser}</p>
            <p>{commentbody}</p>
          </div>
        </div>
        <div className="flex pb-2 justify-end gap-4">
          {user === commentUser && (
            <>
              <p
                className=" text-sm text-blue-500 cursor-pointer"
                onClick={() => handleEdit(commentid)}
              >
                Edit
              </p>
              <p
                className=" text-sm text-blue-500 cursor-pointer"
                onClick={() => handleDelete(commentid)}
              >
                Delete
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
