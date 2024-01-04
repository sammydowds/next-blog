import fs from "fs";
import path from "path";
import matter from "gray-matter";

const notesDirectory = path.join(process.cwd(), "notes");

export function getSortedNotesMetaData() {
  const fileNames = fs.readdirSync(notesDirectory);
  const allnotesData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(notesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, metaData } = extractPostData(fileContents);

    return {
      id,
      ...data,
      ...metaData,
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

export function getWordCount(content) {
  const matches = content.match(/\b\w+\b/g);
  return matches ? matches.length : 0;
}

export function estimateMinsToRead(wordCount) {
  return Math.round(wordCount / 400);
}

export function extractPostData(markdown) {
  const matterResult = matter(markdown);
  const words = getWordCount(matterResult.content);
  const readTime = estimateMinsToRead(words);

  return {
    data: matterResult.data,
    content: matterResult.content,
    metaData: {
      wordCount: words,
      estimatedTime: readTime,
    },
  };
}

export function getNote(id) {
  const fullPath = path.join(notesDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content, metaData } = extractPostData(fileContents);
  return {
    id,
    data,
    content,
    ...metaData,
  };
}

export function getNoteStaticPaths() {
  let paths = [];
  const fileNames = fs.readdirSync(notesDirectory);
  fileNames.map((name) => {
    const id = name.replace(/\.md$/, "");
    paths.push({ params: { id } });
  });
  return paths;
}
