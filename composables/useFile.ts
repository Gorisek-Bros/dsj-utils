export default function () {
  /**
   *
   * @param file
   * @returns Blob representation of the file
   */
  async function toBlob(file: File) {
    return URL.createObjectURL(new Blob([await file.arrayBuffer()]))
  }

  /**
   *
   * @param file
   * @returns File content as string
   */
  async function getContent(file: File) {
    if (!file)
      return null

    const buffer = await file.arrayBuffer()
    const blob = new Blob([buffer])
    return (await blob.text()).split('\n')
  }

  return {
    toBlob,
    getContent,
  }
}
