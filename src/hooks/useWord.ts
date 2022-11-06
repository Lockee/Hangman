import React from "react";

const baseUrl = "https://random-word-api.herokuapp.com";

export const useWord = () => {
  const [word, setWord] = React.useState<string[]>([]);

  const fetchWord = React.useCallback(
    async (controller?: AbortController): Promise<string[]> => {
      return fetch(`${baseUrl}/word`, { signal: controller?.signal }).then(
        (r) => r.json()
      );
    },
    []
  );

  React.useEffect(() => {
    const controller = new AbortController();
    fetchWord(controller)
      .then((words: string[]) => {
        const word = words[0].split("");
        setWord(word);
      })
      .catch(() => {});

    return () => {
      controller.abort();
    };
  }, []);

  return { word };
};
