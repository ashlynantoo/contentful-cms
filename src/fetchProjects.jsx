import { useState, useEffect } from "react";
import { createClient } from "contentful";

const client = createClient({
  space: "yb1zz6bj9m9j",
  environment: "master",
  accessToken: import.meta.env.VITE_API_KEY,
});

export const useFetchProjects = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const fetchData = async () => {
    try {
      const response = await client.getEntries({ content_type: "projects" });
      const projectsList = response.items.map((project) => {
        const id = project.sys.id;
        const { title, url, image } = project.fields;
        const img = image?.fields?.file?.url;
        return { id, title, url, img };
      });
      setProjects(projectsList);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, projects };
};
