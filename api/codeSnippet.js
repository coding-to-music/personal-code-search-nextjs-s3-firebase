export const UploadCodeImageToS3 = async (file) => {
  const filename = encodeURIComponent(file.name)

  const formData = new FormData()
  formData.append("file", file)

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/uploadSnippetToS3?fileName=${filename}`
    const res  = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    const { imageUrl } = await res.json()
    return imageUrl
  } catch (e) {
    console.error(e)
    return ""
  }
}

export const AddCodeSnippetToDb = async (data) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/addCodeSnippet`
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: 'POST',
      body: JSON.stringify(data),
    })
    const { success } = await response.json()
    return success
  } catch (e) {
    console.error(e)
  }
  return false
}