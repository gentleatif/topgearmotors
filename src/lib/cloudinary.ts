import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImage(
  base64File: string,
  folder = 'drive-elite/cars'
): Promise<string> {
  const result = await cloudinary.uploader.upload(base64File, {
    folder,
    transformation: [
      { width: 1200, height: 800, crop: 'fill', quality: 'auto', fetch_format: 'auto' },
    ],
  })
  return result.secure_url
}

export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId)
}

/** Extract public_id from a Cloudinary URL */
export function getPublicId(url: string): string {
  const parts = url.split('/')
  const fileName = parts[parts.length - 1].split('.')[0]
  const folder   = parts[parts.length - 2]
  return `${folder}/${fileName}`
}

export default cloudinary
