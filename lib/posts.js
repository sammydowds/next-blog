import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const notesDirectory = path.join(process.cwd(), 'notes');

export function getSortedNotesMetaData() {
  const fileNames = fs.readdirSync(notesDirectory);
  const allnotesData = fileNames.map((fileName) => {

    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(notesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  return allnotesData.sort((a, b) => {
    if (Date.parse(a.date) < Date.parse(b.date)) {
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