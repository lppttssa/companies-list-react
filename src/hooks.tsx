import {useEffect, useRef, useState} from "react";

export function useInfiniteScroll() {
  const [page, setPage] = useState(1);
  const loadMoreRef = useRef(null);

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setPage((no) => no + 1);
        }
      })
  );

  useEffect(() => {
    if (loadMoreRef.current) observer.current.observe(loadMoreRef.current);
  }, [loadMoreRef]);

  return { loadMoreRef, page };
}
