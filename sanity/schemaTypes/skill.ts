import { defineType, defineField } from "sanity";

export default defineType({
  name: "skill",
  title: "Skills",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Deskripsi opsional untuk ditampilkan di chip skill.",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["Tools", "Frontend", "Backend", "Fullstack", "Database", "DevOps", "Other"] },
    }),
    defineField({ name: "level", title: "Level (1-5)", type: "number" }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),
  ],
});
