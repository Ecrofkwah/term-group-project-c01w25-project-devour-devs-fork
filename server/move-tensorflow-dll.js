import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourcePath = path.join(__dirname, 'node_modules', '@tensorflow', 'tfjs-node', 'tensorflow.dll');
const destinationPath = path.join(__dirname, 'node_modules', '@tensorflow', 'napi-v8', 'tensorflow.dll');

// function to move tensorflow.dll
const moveTensorflowDLL = async () => {
  try {
    if (fs.existsSync(sourcePath)) {
      await fs.promises.rename(sourcePath, destinationPath);
      console.log('tensorflow.dll moved successfully!');
    } else {
      console.log('tensorflow.dll not found at source path.');
    }
  } catch (error) {
    console.error('Error moving tensorflow.dll:', error);
  }
};

// run the function
moveTensorflowDLL();