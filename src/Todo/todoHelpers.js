import { useRef, useEffect } from 'react';

export const helpers = {
    usePrevious: function (value) {
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        });
        return ref.current;
    },
    getIndexFromId: function (id, list) {
      // find todoIndex of element that is being changed
      const todoIndex = list.findIndex((todo) => {
          return id === todo.id;
      });

      return todoIndex;
    }
};

