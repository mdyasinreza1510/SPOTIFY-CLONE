const {ImageKit}= require ("@ImageKit/nodejs")

const ImageKitClient = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

//this func will upload fies in imagekit 
async function uploadfile(file){
    const result= await ImageKitClient.files.upload({
        file:file, //actual image/song/pdf,
        fileName:"music_" + Date.now(),
        folder:"spotify-clone/music"
        //ImageKit Dashboard me ye file jis folder me save hogi

    })
    return result;
}

module.exports ={uploadfile}