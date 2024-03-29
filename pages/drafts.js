import Head from "next/head";
import { useRouter } from "next/router";
import prisma from "../lib/prisma";
import Layout from "../components/Layout";
import { useState } from "react";

export default function Home({ feed }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const publishPost = async (postId) => {
    try {
      setLoading(true);
      const body = {
        published: true,
      };
      await fetch("/api/post/edit?id=" + postId, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      setLoading(false);
      await router.push("/");
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Drafts</title>
        <meta name="description" content=" Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {feed.length > 0 ? (
        feed.map((item, index) => (
          <div className="post-card" key={index}>
            <span style={{ fontWeight: "bold" }}>{item.title}</span>

            <p>{item.content}</p>
            <div className="post-card-action">
              <button onClick={() => publishPost(item.id)}>
                {loading ? "Loading..." : "Publish"}
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>
          <p>No draft posts found.</p>
        </div>
      )}
      <style jsx>
        {`
          .post-card {
            border: 1px solid #d4d4d5;
            padding: 10px;
            backgrouns: #fdcfbf;
          }
        `}
      </style>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: false },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};
