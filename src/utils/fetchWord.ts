const baseUrl = "https://random-word-api.herokuapp.com";

export const fetchWord = async (): Promise<string[]> => {
  return fetch(`${baseUrl}/word`)
    .then((r) => r.json())
    .then((words) => words[0].split(""));
};
