import { defineType, defineField } from "sanity";

export default defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({ name: "fullName", title: "Full Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "about", title: "About", type: "text" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({
      name: "avatar",
      title: "Hero Avatar",
      type: "image",
      options: { hotspot: true },
      description: "Gambar yang dipakai di section Hero.",
    }),
    defineField({
      name: "heroFocusLabel",
      title: "Hero Focus Label",
      type: "string",
      initialValue: "Focus Area",
      description: "Label kecil di card hero. Contoh: Focus Area, Main Stack, Current Focus.",
    }),
    defineField({
      name: "heroFocusValue",
      title: "Hero Focus Value",
      type: "string",
      description: "Teks besar di bawah label focus. Jika kosong, akan memakai skill dengan level/order tertinggi.",
    }),
    defineField({
      name: "heroSkillCountLabel",
      title: "Hero Skill Count Label",
      type: "string",
      initialValue: "Skills",
      description: "Label kecil untuk jumlah skill di card hero.",
    }),
    defineField({
      name: "socials",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "github", title: "GitHub", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
        defineField({ name: "instagram", title: "Instagram", type: "url" }),
        defineField({ name: "website", title: "Website", type: "url" }),
      ],
    }),
  ],
});
