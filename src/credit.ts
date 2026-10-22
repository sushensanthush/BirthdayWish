/**
 * Birthday Exam
 * Copyright (c) 2026 Sushen Santhush .. Released under the MIT License.
 *
 * Attribution lives here, separate from the user-facing personalization in
 * `config.ts`, so that changing the recipient or sender never touches the credit.
 * Keep this file and the <Credit /> component intact when you fork or reuse the project.
 */
export const CREDIT = Object.freeze({
  project: "Birthday Exam",
  author: "Sushen Santhush .",
  shortName: "Sushen Santhush",
  year: 2026,
  github: "https://github.com/sushensanthush",
  linkedin: "https://www.linkedin.com/in/sushensanthush",
  license: "MIT",
});

export const SIGNATURE = `${CREDIT.project} © ${CREDIT.year} ${CREDIT.author} • ${CREDIT.github}`;
