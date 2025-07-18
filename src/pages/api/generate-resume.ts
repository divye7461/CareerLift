import puppeteer from "puppeteer";
import { NextApiRequest, NextApiResponse } from "next";

const escapeHTML = (str: string) =>
  str?.replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const { 
    name, 
    email, 
    phone, 
    instituteName,
    course,
    collegeAggregate,
    twelfthInstitute,
    twelfthAggregate,
    tenthInstitute,
    tenthAggregate,
    experience,
    frontend,
    backend,
    databases,
    ormTools,
    softSkills,
    coursework,
    achievements 
  } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Times New Roman', serif;
            line-height: 1.6;
            color: #000;
            background: #fff;
            min-height: 100vh;
            padding: 40px;
          }
          
          .resume-container {
            max-width: 800px;
            margin: 0 auto;
            background: #fff;
            position: relative;
          }
          
          .header {
            text-align: center;
            padding: 30px 0;
            border-bottom: 2px solid #000;
            margin-bottom: 30px;
          }
          
          .name {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #000;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .contact-info {
            font-size: 14px;
            color: #000;
            margin-top: 10px;
          }
          
          .contact-info span {
            margin: 0 10px;
          }
          
          .content {
            padding: 0;
          }
          
          .section {
            margin-bottom: 25px;
            position: relative;
          }
          
          .section:last-child {
            margin-bottom: 0;
          }
          
          .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #000;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 1px solid #000;
            padding-bottom: 5px;
          }
          
          .section-content {
            font-size: 14px;
            line-height: 1.6;
            color: #000;
            margin-left: 0;
          }
          
          .education-item {
            margin-bottom: 15px;
            padding: 10px 0;
            border-left: 3px solid #000;
            padding-left: 15px;
          }
          
          .education-item:last-child {
            margin-bottom: 0;
          }
          
          .education-title {
            font-weight: bold;
            color: #000;
            margin-bottom: 3px;
            font-size: 16px;
          }
          
          .education-institution {
            color: #333;
            font-size: 14px;
            margin-bottom: 2px;
          }
          
          .education-aggregate {
            color: #555;
            font-size: 13px;
            font-style: italic;
          }
          
          .skills-content {
            margin-top: 10px;
          }
          
          .skill-category {
            margin-bottom: 12px;
            font-size: 14px;
            line-height: 1.4;
          }
          
          .skill-category-title {
            font-weight: bold;
            display: inline;
            margin-right: 8px;
            color: #000;
          }
          
          .skill-items {
            display: inline;
            font-weight: normal;
            color: #333;
          }
          
          .achievements-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          
          .achievements-list li {
            margin: 8px 0;
            padding-left: 20px;
            position: relative;
            color: #000;
            font-size: 14px;
          }
          
          .achievements-list li::before {
            content: '•';
            position: absolute;
            left: 0;
            color: #000;
            font-weight: bold;
            font-size: 16px;
          }
          
          .experience-item {
            margin-bottom: 15px;
            padding: 10px 0;
            border-left: 3px solid #000;
            padding-left: 15px;
          }
          
          .experience-item:last-child {
            margin-bottom: 0;
          }
          
          .experience-title {
            font-weight: bold;
            color: #000;
            margin-bottom: 5px;
          }
          
          .experience-description {
            color: #000;
            font-size: 14px;
          }
          
          @media print {
            body {
              background: #fff;
              padding: 20px;
            }
            
            .resume-container {
              box-shadow: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="resume-container">
          <div class="header">
            <div class="name">${escapeHTML(name)}</div>
            <div class="contact-info">
              <span>Email: ${escapeHTML(email)}</span>
              <span>|</span>
              <span>Phone: ${escapeHTML(phone)}</span>
            </div>
          </div>

          <div class="content">
            ${(instituteName || course || collegeAggregate || twelfthInstitute || twelfthAggregate || tenthInstitute || tenthAggregate) ? `
            <div class="section">
              <div class="section-title">Education</div>
              <div class="section-content">
                ${instituteName || course || collegeAggregate ? `
                <div class="education-item">
                  ${course ? `<div class="education-title">${escapeHTML(course)}</div>` : ''}
                  ${instituteName ? `<div class="education-institution">${escapeHTML(instituteName)}</div>` : ''}
                  ${collegeAggregate ? `<div class="education-aggregate">Aggregate: ${escapeHTML(collegeAggregate)}</div>` : ''}
                </div>
                ` : ''}
                
                ${twelfthInstitute || twelfthAggregate ? `
                <div class="education-item">
                  <div class="education-title">Class XII Boards</div>
                  ${twelfthInstitute ? `<div class="education-institution">${escapeHTML(twelfthInstitute)}</div>` : ''}
                  ${twelfthAggregate ? `<div class="education-aggregate">Aggregate: ${escapeHTML(twelfthAggregate)}</div>` : ''}
                </div>
                ` : ''}
                
                ${tenthInstitute || tenthAggregate ? `
                <div class="education-item">
                  <div class="education-title">Class X Boards</div>
                  ${tenthInstitute ? `<div class="education-institution">${escapeHTML(tenthInstitute)}</div>` : ''}
                  ${tenthAggregate ? `<div class="education-aggregate">Aggregate: ${escapeHTML(tenthAggregate)}</div>` : ''}
                </div>
                ` : ''}
              </div>
            </div>
            ` : ''}

            ${experience ? `
            <div class="section">
              <div class="section-title">Professional Experience</div>
              <div class="section-content">
                <div class="experience-item">
                  <div class="experience-description">${escapeHTML(experience).replace(/\n/g, '<br>')}</div>
                </div>
              </div>
            </div>
            ` : ''}

            ${(frontend || backend || databases || ormTools || softSkills || coursework) ? `
            <div class="section">
              <div class="section-title">Technical Skills</div>
              <div class="section-content">
                <div class="skills-content">
                  ${frontend ? `
                  <div class="skill-category">
                    <span class="skill-category-title">Frontend Technologies:</span>
                    <span class="skill-items">${escapeHTML(frontend)}</span>
                  </div>
                  ` : ''}
                  
                  ${backend ? `
                  <div class="skill-category">
                    <span class="skill-category-title">Backend Technologies:</span>
                    <span class="skill-items">${escapeHTML(backend)}</span>
                  </div>
                  ` : ''}
                  
                  ${databases ? `
                  <div class="skill-category">
                    <span class="skill-category-title">Databases:</span>
                    <span class="skill-items">${escapeHTML(databases)}</span>
                  </div>
                  ` : ''}
                  
                  ${ormTools ? `
                  <div class="skill-category">
                    <span class="skill-category-title">ORM Tools:</span>
                    <span class="skill-items">${escapeHTML(ormTools)}</span>
                  </div>
                  ` : ''}
                  
                  ${softSkills ? `
                  <div class="skill-category">
                    <span class="skill-category-title">Soft Skills:</span>
                    <span class="skill-items">${escapeHTML(softSkills)}</span>
                  </div>
                  ` : ''}
                  
                  ${coursework ? `
                  <div class="skill-category">
                    <span class="skill-category-title">Relevant Coursework:</span>
                    <span class="skill-items">${escapeHTML(coursework)}</span>
                  </div>
                  ` : ''}
                </div>
              </div>
            </div>
            ` : ''}

            ${achievements ? `
            <div class="section">
              <div class="section-title">Key Achievements</div>
              <div class="section-content">
                <ul class="achievements-list">
                  ${escapeHTML(achievements).split('\n').filter(item => item.trim()).map(achievement => 
                    `<li>${achievement.trim().replace(/^[•\-\*]\s*/, '')}</li>`
                  ).join('')}
                </ul>
              </div>
            </div>
            ` : ''}
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "load" });
    await page.evaluateHandle("document.fonts.ready");

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
    });

    console.log("Generated PDF size:", pdfBuffer?.length);
    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=resume.pdf");
    res.end(pdfBuffer);

  } catch (error) {
    console.error("PDF generation error:", error);
    return res.status(500).json({ error: "Failed to generate resume" });
  }
}