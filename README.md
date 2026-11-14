
# ResumeCraft – Resume Builder

A simple, offline resume builder that allows users to create professional resumes with a live A4 preview.

## Features

- Live resume preview while typing
- Three resume templates:
  - Classic
  - Modern
  - Minimal
- Drag-and-drop resume section ordering
- Export resumes as PDF
- Save resume information as a JSON file
- Load previously saved resume data
- A4 page layout
- Supports long resumes across multiple pages
- Works offline without an internet connection

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Browser Print to PDF
- JSON

## Project Structure

```text
Resume-Builder/
│
├── index.html
├── README.md
├── .gitignore
│
├── assets/
├── css/
│   └── style.css
│
├── js/
│   └── app.js
│
└── data/
```

## How to Run

1. Download or clone this repository.
2. Open the project folder.
3. Double-click `index.html`.
4. Enter your personal and professional information.
5. Choose a resume template.
6. Reorder sections by dragging them in the preview.
7. Click Save Resume to download your data as JSON.
8. Click Load Resume to restore saved data.
9. Click Export PDF to save your resume.

## PDF Export

The application uses the browser's built-in Print feature.

Recommended settings:
- Destination: Save as PDF
- Paper size: A4
- Layout: Portrait

The exported PDF contains selectable text.

## Offline Support

ResumeCraft uses local HTML, CSS and JavaScript files. No server, API key, or internet connection is required.

## Privacy

Resume information is processed locally in the browser. The application does not send resume details to an external server.

## Project Purpose

This project was developed as part of a beginner-friendly web development portfolio to demonstrate frontend development, JavaScript functionality, file handling, and PDF generation.
