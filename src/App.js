import { useEffect, useState } from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";

builder.init(process.env.REACT_APP_BUILDER_API_KEY)

export default function App() {
  const isPreviewingInBuilder = useIsPreviewing()
  const [notFound, setNotFound] = useState(false)
  const [content, setContent] = useState(null)

  useEffect(() => {
    async function fetchContent() {
      const content = await builder
        .get('page', {
          url: window.location.pathname
        })
        .promise()

      setContent(content)
      setNotFound(!content)

      if (content?.data.title) {
        document.title = content.data.title
      }
    }
    fetchContent()
  }, [window.location.pathname]);

  if (notFound && !isPreviewingInBuilder) {
    return 404
  }

  return (
    <>
      <BuilderComponent model="page" content={content} />
    </>
  );
}
