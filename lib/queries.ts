export const profileQuery = `*[_type == "profile"][0]{
  _id,
  fullName,
  headline,
  about,
  location,
  avatar,
  heroFocusLabel,
  heroFocusValue,
  heroSkillCountLabel,
  socials
}`;

export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(order desc) [0...5]{
  _id,
  title,
  slug,
  summary,
  thumbnails[]{
    ...,
    asset->{
      "_ref": _id,
      "_type": "reference",
      metadata { dimensions }
    }
  },
  thumbnail{
    ...,
    asset->{
      "_ref": _id,
      "_type": "reference",
      metadata { dimensions }
    }
  },
  techStack,
  demoUrl,
  repoUrl,
  featured,
  highlightYellow,
  order
}`;

export const allProjectsQuery = `*[_type == "project"] | order(order desc, _createdAt desc){
  _id,
  title,
  slug,
  summary,
  thumbnails[]{
    ...,
    asset->{
      "_ref": _id,
      "_type": "reference",
      metadata { dimensions }
    }
  },
  thumbnail{
    ...,
    asset->{
      "_ref": _id,
      "_type": "reference",
      metadata { dimensions }
    }
  },
  techStack,
  demoUrl,
  repoUrl,
  featured,
  highlightYellow,
  order
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  summary,
  thumbnails[]{
    ...,
    asset->{
      "_ref": _id,
      "_type": "reference",
      metadata { dimensions }
    }
  },
  thumbnail{
    ...,
    asset->{
      "_ref": _id,
      "_type": "reference",
      metadata { dimensions }
    }
  },
  techStack,
  demoUrl,
  repoUrl,
  featured,
  highlightYellow,
  order
}`;

export const experiencesQuery = `*[_type == "experience"] | order(order desc, startDate desc){
  _id,
  company,
  role,
  startDate,
  endDate,
  isCurrent,
  description,
  order
}`;

export const skillsQuery = `*[_type == "skill"] | order(order desc){
  _id,
  name,
  description,
  category,
  level,
  order
}`;
export const ORGANIZATIONS_QUERY = `*[_type == "organization"] | order(order desc, _createdAt desc){
  _id, name, role, startDate, endDate, isCurrent, description, order
}`;

export const CERTIFICATES_QUERY = `*[_type == "certificate"] | order(order desc, _createdAt desc){
  _id, title, issuer, issueDate, expiryDate, credentialUrl, credentialId, skills, logos, logo, order
}`;
