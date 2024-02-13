import { useEffect, useMemo } from "react";

export default function FileRead({
  onFileParsed,
}: {
  onFileParsed: (result: string[]) => void;
}) {
  const reader = useMemo(() => new FileReader(), []);
  useEffect(() => {
    const handeFileRead = () => {
      const result = (reader.result as string)
        .split("\n")
        .filter((line) => line);
      onFileParsed(result);
    };

    reader.addEventListener("load", handeFileRead);
    return () => {
      reader.removeEventListener("load", handeFileRead);
    };
  }, [reader, onFileParsed]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      reader.readAsText(e.target.files[0]);
    }
  };

  return (
    <div>
      <label htmlFor="file">Choose a txt file </label>
      <input id="file" type="file" accept=".txt" onChange={handleFileChange} />
    </div>
  );
}
