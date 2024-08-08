export default function saveBlob(blob, ref, filename, extension) {
  const url = URL.createObjectURL(blob);
  ref.current.innerHTML = `Download ${filename}.${extension}`;
  ref.current.href = url;
  ref.current.download = `${filename}.${extension}`;
}
