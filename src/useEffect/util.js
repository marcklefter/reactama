export const apiFetch = async (url) => {
  return (await fetch(url)).json();
}