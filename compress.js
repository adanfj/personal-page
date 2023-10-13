import sharp from "sharp";

sharp("./public/post-2.png").resize({
    height:768
}).jpeg().toFile("./public/post-2-sm.jpg")