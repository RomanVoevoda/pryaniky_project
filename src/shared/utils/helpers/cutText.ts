export const cutText = (limit: number, text: string) => {
  if(text.length < 1)
    return "-";
  return (text.length > limit) ? text.slice(0, limit) + "..." : text;
}