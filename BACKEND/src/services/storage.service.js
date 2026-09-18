const {ImageKit}= require ("@ImageKit/nodejs")

const ImageKitClient = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadfile(file){
    const result= await ImageKitClient.files.upload({
        file,
        fileName:"music_" + Date.now(),
        folder:"spotify-clone/music"

    })
    return result;
}

module.exports ={uploadfile}