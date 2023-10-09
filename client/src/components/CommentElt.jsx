import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import timeElapsed from "../../utilities/datefunction";
import axios from "axios";
import { toast } from "react-toastify";

export default function CommentElt({
  commentbody,
  commentUser,
  commentid,
  commentorigin,
  handleEdit,
  fetchcomment,
}) {
  const { user } = useSelector((state) => state.auth);

  async function handleDelete(id) {
    const { data } = await axios.delete(`/api/comment/delete/${id}`);
    if (data) {
      fetchcomment();
    } else {
      toast.error("unable to delete the comment");
    }
  }

  return (
    <>
      <div className="border-b border-neutral-900">
        <div className="mt-3 py-2  flex gap-3 items-center">
          <p className="px-4 py-2 bg-gray-800 rounded-full">
            {commentUser?.username?.charAt(0).toUpperCase()}
          </p>
          <div>
            <p className=" text-gray-600 text-sm">{commentUser?.username}</p>
            <p>{commentbody}</p>
            <p className=" text-gray-600 text-sm">
              {timeElapsed(commentorigin)} ago
            </p>
          </div>
        </div>
        <div className="flex pb-2 justify-end gap-4">
          {user?._id === commentUser?._id && (
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
