const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else if (file === 'page.tsx' || file === 'route.ts' || file === 'page.ts') {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

function addEdgeRuntime() {
  const srcDir = path.join(process.cwd(), 'src', 'app');
  const files = getAllFiles(srcDir);
  
  let modifiedCount = 0;
  
  for (const filePath of files) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // 检查是否已经有 runtime 导出
    if (content.includes('export const runtime')) {
      continue;
    }
    
    // 检查是否有 GET/POST 等导出（API routes）或者是页面组件
    const hasHandler = /export\s+(async\s+)?function\s+(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS|default)/.test(content);
    
    if (hasHandler) {
      // 在文件末尾添加 runtime 导出
      content = content.trimEnd() + '\n\nexport const runtime = \'edge\';\n';
      fs.writeFileSync(filePath, content);
      modifiedCount++;
      console.log(`Modified: ${filePath.replace(process.cwd() + path.sep, '')}`);
    }
  }
  
  console.log(`\nTotal modified: ${modifiedCount} files`);
}

addEdgeRuntime();
