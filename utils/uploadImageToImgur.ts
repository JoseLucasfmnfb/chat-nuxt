export async function uploadImageToImgur(file: File): Promise<string> {
    const formData = new FormData()
    formData.append('image', file)

    const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
            Authorization: 'Client-ID 979e9bd87a0e9df',
        },
        body: formData,
    })

    const data = await response.json()

    if (!response.ok || !data.success) {
        throw new Error(data?.data?.error || 'Falha ao enviar imagem')
    }

    return data.data.link // URL pública da imagem
}