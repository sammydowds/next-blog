import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const notesDirectory = path.join(process.cwd(), 'notes');

export function getSortedNotesMetaData() {
  // Get file names under /notes
  const fileNames = fs.readdirSync(notesDirectory);
  const allnotesData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(notesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort notes by date
  return allnotesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getNote(id) {
  const fullPath = path.join(notesDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  return {
    id,
    data: matterResult.data,
    content: matterResult.content
  };
}

export function getNoteStaticPaths() {
  let paths = []
  const fileNames = fs.readdirSync(notesDirectory);
  fileNames.map(name => {
    const id = name.replace(/\.md$/, '');
    paths.push({ params: { id } })
  })
  return paths
}