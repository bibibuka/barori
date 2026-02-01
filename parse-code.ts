import * as fs from 'fs';
import * as path from 'path';

/**
 * Checks if a file should be included in the parsing process
 */
function shouldIncludeFile(filePath: string): boolean {
  const extension = path.extname(filePath);
  const relativePath = path.relative(process.cwd(), filePath);
  
  // Skip node_modules and .git directories
  if (relativePath.includes('node_modules') || relativePath.includes('.git')) {
    return false;
  }
  
  // Include only source code files
  const validExtensions = ['.ts', '.tsx', '.js', '.jsx', '.html', '.css', '.json', '.md'];
  return validExtensions.includes(extension.toLowerCase());
}

/**
 * Recursively reads a directory and returns all file paths that should be included
 */
function readFilesRecursively(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let filePaths: string[] = [];
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      filePaths = [...filePaths, ...readFilesRecursively(fullPath)];
    } else if (shouldIncludeFile(fullPath)) {
      filePaths.push(fullPath);
    }
  }
  
  return filePaths;
}

/**
 * Parses all code files and writes them to a single output file with headers
 */
function parseCodeToTxt(outputFile: string): void {
  console.log('Starting to parse code files...');
  
  const allFilePaths = readFilesRecursively('.');
  allFilePaths.sort(); // Sort alphabetically for consistent output
  
  const outputStream = fs.createWriteStream(outputFile);
  
  outputStream.write(`Codebase Dump\n`);
  outputStream.write(`Generated on: ${new Date().toISOString()}\n`);
  outputStream.write(`Directory: ${process.cwd()}\n`);
  outputStream.write(`=========================================\n\n`);
  
  let fileCount = 0;
  
  for (const filePath of allFilePaths) {
    // Skip the output file itself if it's in the same directory
    if (path.resolve(filePath) === path.resolve(outputFile)) {
      continue;
    }
    
    try {
      const relativePath = path.relative(process.cwd(), filePath);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      
      outputStream.write(`// FILE: ${relativePath}\n`);
      outputStream.write(`// LOCATION: ${filePath}\n`);
      outputStream.write(`\n`);
      outputStream.write(fileContent);
      outputStream.write(`\n\n`);
      outputStream.write(`// END OF FILE: ${relativePath}\n`);
      outputStream.write(`=========================================\n\n`);
      
      fileCount++;
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
    }
  }
  
  outputStream.end();
  console.log(`Successfully parsed ${fileCount} files into ${outputFile}`);
}

// Output file name
const outputFile = 'code-dump.txt';

// Run the parser
parseCodeToTxt(outputFile);