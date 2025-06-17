import fs from 'fs/promises';

export const removeUploadedFiles = async (files) => {
  if (!files || files.length === 0) return;

  await Promise.all(files.map((file) => fs.unlink(file.path).catch(() => {})));
};
