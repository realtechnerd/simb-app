export default async function verifyFileSignature(file) {
  const FILE_SIGNATURE = [
    68, 79, 71, 66, 79, 78, 69, 0, 0, 0, 0, 0, 83, 73, 77, 66, 45, 45, 45, 45,
    45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45,
  ];

  const signatureLength = FILE_SIGNATURE.length;

  const signatureInFile = await file.slice(0, signatureLength).arrayBuffer();

  const array = new Uint8Array(signatureInFile);

  if (array.toString() != FILE_SIGNATURE.toString()) {
    throw new Error("Not a valid SIMB file");
  }
}
