export default function firstLetterInCapital(str: string | undefined) {
  if (!str) return;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
