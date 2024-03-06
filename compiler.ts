import fs from "fs";
import ejs from "ejs";
import path from "path";

(async () => {
  const currentDir = path.resolve(__dirname);
  const pagesDir = path.join(currentDir, "pages");
  const pages = fs.readdirSync(pagesDir);

  for (const page of pages) {
    const renderResult = await ejs.renderFile(path.join(pagesDir, page));

    await fs.promises.writeFile(
      path.join(currentDir, "dist", page.replace("ejs", "html")),
      renderResult
    );
  }
})();
