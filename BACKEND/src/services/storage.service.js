const {ImageKit}= require ("@ImageKit/nodejs")

const ImageKitClient = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})