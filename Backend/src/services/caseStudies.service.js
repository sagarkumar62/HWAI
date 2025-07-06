import CaseStudy from "../models/caseStudies.model.js";

// Service: create a new case study
export async function createCaseStudyService({
  title,
  summary,
  content,
  coverImageUrl,
  tags,
  relatedProject,
  author,
  status,
  publishedAt,
  ...rest
}) {
  if (!title || !summary || !content || !author) {
    throw new Error("title, summary, content, and author are required");
  }

  const caseStudy = new CaseStudy({
    title,
    summary,
    content,
    coverImageUrl,
    tags,
    relatedProject,
    author,
    status,
    publishedAt,
    ...rest
  });
  return await caseStudy.save();
}
