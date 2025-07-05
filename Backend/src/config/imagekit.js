
import dotenv from "dotenv";
import ImageKit from "imagekit";
dotenv.config();

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

// Upload image file to ImageKit
export function uploadFile(file) {
    return new Promise((resolve, reject) => {
        imagekit.upload({
            file: file,
            fileName: "image-" + Date.now() + ".jpg",
            folder: "/images/"
        }, function(error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result)
            }
        });
    });
}
