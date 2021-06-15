
import React, { useEffect, useRef } from 'react';


interface Props {
  loadMore: () => void;
}

const InfiniteScroll: React.FC<Props> = ({loadMore}) => {
  const divRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options: any = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };
    
    const observer = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting) {
        observer.disconnect();
        loadMore();
      }
    }, options);

    if (divRef  && divRef.current) {
      observer.observe(divRef.current!);
    }

    return () => {
      observer.disconnect();
    }
  }, [loadMore])

  return <div ref={divRef} />
}

export default InfiniteScroll;