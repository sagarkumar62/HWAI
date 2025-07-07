// Upload video file to ImageKit
export function uploadVideoFile(file) {
    return new Promise((resolve, reject) => {
        imagekit.upload({
            file: file,
            fileName: "video-" + Date.now() + ".mp4",
            folder: "/videos/"
        }, function(error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}
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

// Upload PDF file to ImageKit
export function uploadPdfFile(file) {
    return new Promise((resolve, reject) => {
        imagekit.upload({
            file: file,
            fileName: "file-" + Date.now() + ".pdf",
            folder: "/pdfs/"
        }, function(error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

import dotenv from "dotenv";
import ImageKit from "imagekit";
dotenv.config();

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

// Upload image file to ImageKit
    