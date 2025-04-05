/* 
This file is used to configure the multer middleware to receive files in the server without storing files to disk
*/

import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

export { upload as default }