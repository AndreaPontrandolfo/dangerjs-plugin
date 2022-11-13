/**
 * this dangerjs plugin decorates your pull-requests when it finds eslint-disable references
 */
export default function eslintDisableWarn() {
  const modifiedFiles = danger.git.modified_files.filter(
    (path) =>
      (path.endsWith("js") && path !== "dangerfile.js") || path.endsWith("ts")
  );

  const structuredModifiedFiles = modifiedFiles.map((file) => {
    return {
      fileName: file,
      fileDiffPromise: danger.git.diffForFile(file),
    };
  });

  for (const structuredModifiedFile of structuredModifiedFiles) {
    structuredModifiedFile.fileDiffPromise.then((fileDiff) => {
      if (fileDiff.added.includes("eslint-disable")) {
        warn(
          `🤔 An "eslint-disable" directive was added in file: "${structuredModifiedFile.fileName}"`
        );
      }
    });
  }
}
