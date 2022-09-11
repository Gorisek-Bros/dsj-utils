export default function () {
  async function toBlob(file: File) {
    return URL.createObjectURL(new Blob([await file.arrayBuffer()]))
  }

  async function getContent(file: File) {
    const buffer = await file.arrayBuffer()
    const blob = new Blob([buffer])
    return blob.text()
  }

  return {
    toBlob,
    getContent,
  }
}
