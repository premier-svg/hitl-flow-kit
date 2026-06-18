#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";

const [, , filePath] = process.argv;

if (!filePath) {
  console.error("Usage: node src/runner/preview.mjs <workflow.json>");
  process.exit(1);
}

try {
  // 1. Read the JSON file
  const rawJson = await readFile(filePath, "utf8");
  const workflow = JSON.parse(rawJson);

  // 2. The HTML/Canvas Template
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Workflow Preview: ${workflow.name || "Canvas"}</title>
    <style>
        body { font-family: sans-serif; background: #f4f4f5; display: flex; flex-direction: column; align-items: center; padding: 2rem; }
        canvas { background: white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); border-radius: 8px; }
        .title { margin-bottom: 1rem; color: #18181b; }
    </style>
</head>
<body>
    <h2 class="title">${workflow.name || "Workflow"} (Canvas Preview)</h2>
    <canvas id="workflowCanvas" width="800" height="600"></canvas>

    <script>
        const workflowData = ${rawJson};
        const canvas = document.getElementById('workflowCanvas');
        const ctx = canvas.getContext('2d');

        // Simple layout variables
        const startX = 400;
        let currentY = 50;
        const nodeWidth = 160;
        const nodeHeight = 50;
        const verticalSpacing = 80;

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Draw nodes and connecting lines
        workflowData.steps.forEach((step, index) => {
            const x = startX - (nodeWidth / 2);
            const y = currentY;

            // Draw connecting line to the next node (except for the last one)
            if (index < workflowData.steps.length - 1) {
                ctx.beginPath();
                ctx.moveTo(startX, y + nodeHeight);
                ctx.lineTo(startX, y + nodeHeight + verticalSpacing);
                ctx.strokeStyle = "#94a3b8";
                ctx.lineWidth = 2;
                ctx.stroke();
                
                // Draw Arrowhead
                ctx.beginPath();
                ctx.moveTo(startX - 5, y + nodeHeight + verticalSpacing - 10);
                ctx.lineTo(startX, y + nodeHeight + verticalSpacing);
                ctx.lineTo(startX + 5, y + nodeHeight + verticalSpacing - 10);
                ctx.fillStyle = "#94a3b8";
                ctx.fill();
            }

            // Draw Node Box
            ctx.fillStyle = step.type === 'approval' ? '#fef08a' : '#e0f2fe';
            ctx.beginPath();
            ctx.roundRect(x, y, nodeWidth, nodeHeight, 8);
            ctx.fill();
            ctx.strokeStyle = step.type === 'approval' ? '#ca8a04' : '#0284c7';
            ctx.stroke();

            // Draw Node Text
            ctx.fillStyle = '#0f172a';
            ctx.font = 'bold 14px sans-serif';
            ctx.fillText(step.id, startX, y + 20);
            
            ctx.font = '12px sans-serif';
            ctx.fillStyle = '#475569';
            ctx.fillText(step.type, startX, y + 35);

            currentY += nodeHeight + verticalSpacing;
        });
    </script>
</body>
</html>
  `;

  // 3. Output the generated HTML
  await writeFile("preview.html", htmlContent);
  console.log("✅ Success! Generated preview.html");
  console.log("Open 'preview.html' in your web browser to view the canvas.");

} catch (error) {
  console.error("Failed to generate preview:", error.message);
  process.exit(1);
}