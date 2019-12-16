import { useEffect, useState } from "react";
import pictures from "../service/pictures";

async function getComments(id, setComments) {
  const data = await pictures.getComments(id);
  setComments(data);
}

export function useComments(id) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(id, setComments);
  }, [id]);

  return comments;
}
