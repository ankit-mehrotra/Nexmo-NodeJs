//Set Storage Engine
const storage = multer.diskStorage({
     destination: './public/upload',
     filename: function(req, file, cb) {
         cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
     }
});

//Initialize upload

function checkFileType(file,cb) {
   //Allowed exte
   const fileTypes = /jpeg|png|jpg|gif/g;
   const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
   const mimeType = fileTypes.test(file.mimetype);
   if(mimeType && extname){
       cb(null,true)
   } else {
       cb('Error: Images only')
   }
}

const upload =  multer({
    storage,
    limits: {fileSize: 1000000},
    fileFilter: (req,file,cb) => {
        checkFileType(file,cb)
    }
}).single('myImage')

const app = express();
const PORT = 3000;
app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.get('/', (req,res) => {
    res.render('index');
});

app.post('/upload', (req,res) => {
    upload(req,res,(err) => {
        if(err) {
            res.render('index',{
                msg: err
            })
        } else {
            if(req.file == undefined){
                res.render('index', {
                    msg: 'Error : No File Selected'
                })
            } else {
                res.render('index', {
                    msg: 'File Uploaded',
                    file: `upload/${req.file.filename}`
                })
            }
        }
        
    })
})
