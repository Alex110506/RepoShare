import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null,"src/uploads/");
    },
    filename:(req, file, cb) => {
        const uniqueName=`${Date.now()}-${file.originalname}`;
        cb(null,uniqueName);
    },
});

const fileFilter=(req, file, cb)=>{
    const fileTypes=/jpeg|jpg|png|webp/;
    const extName=fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType=fileTypes.test(file.mimetype);
    if(extName && mimeType) 
        cb(null, true);
    else 
        cb(new Error("Only image files are allowed"));
};

export const upload = multer({storage, fileFilter});