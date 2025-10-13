export function parseQuery(queryString: string) {
  // %3F -> ?  url encoded
  // %3D -> = url encoded

  const urlEncodedField = "%3Fdata%3D";

  if (queryString.includes(urlEncodedField)) {
    const [beforeData, data] = queryString.split(urlEncodedField);
    // Keep the part before '?data=' and append '&data='
    return `${beforeData}&data=${data}`;
  }

  // Already fine
  return queryString;
}
