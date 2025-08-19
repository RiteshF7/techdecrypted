const fs = require('fs');
const path = require('path');

// Function to rename files to remove spaces
function renameFilesInDirectory(directoryPath) {
  try {
    const files = fs.readdirSync(directoryPath);
    
    files.forEach(file => {
      const oldPath = path.join(directoryPath, file);
      const stats = fs.statSync(oldPath);
      
      if (stats.isFile()) {
        // Replace spaces with underscores
        const newFileName = file.replace(/\s+/g, '_');
        const newPath = path.join(directoryPath, newFileName);
        
        if (file !== newFileName) {
          fs.renameSync(oldPath, newPath);
          console.log(`✅ Renamed: ${file} → ${newFileName}`);
        }
      } else if (stats.isDirectory()) {
        // Recursively process subdirectories
        renameFilesInDirectory(oldPath);
      }
    });
  } catch (error) {
    console.error(`❌ Error processing directory ${directoryPath}:`, error);
  }
}

// Main execution
console.log('🔄 Fixing image file names...');

// Fix Projects directory
const projectsDir = path.join(__dirname, '../public/images/Projects');
if (fs.existsSync(projectsDir)) {
  console.log('📁 Processing Projects directory...');
  renameFilesInDirectory(projectsDir);
} else {
  console.log('⚠️  Projects directory not found');
}

// Fix other image directories if they exist
const imageDirs = [
  '../public/images/Skills',
  '../public/images/Tools',
  '../public/images/Socials'
];

imageDirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (fs.existsSync(fullPath)) {
    console.log(`📁 Processing ${path.basename(dir)} directory...`);
    renameFilesInDirectory(fullPath);
  }
});

console.log('✅ Image file name fixing completed!');
console.log('📝 Remember to update image paths in your code if needed.');
