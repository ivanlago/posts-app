import React, { useState } from "react";
import Head from "next/head";
import Router from "next/router";
import Layout from "../../components/Layout";
//import styles from '@/styles/create.module.css';
import styles from '../../styles/create.module.css';

export default function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (title && content) {
      // send a request to the server.
      try {
        const body = { title, content, published: false };
        await fetch(`/api/post`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        await Router.push("/drafts");
      } catch (error) {
        console.error(error);
      }
    } else {
      setError("All fields are required");
      return;
    }
  };

  return (
    <Layout>
      <Head>
        <title>Create Post</title>
      </Head>
      <div>
        <form onSubmit={handleSubmit}>
          {error ? <div className={styles.form.error}>{error}</div> : null}
          {message ? <div className={styles.form.message}>{message}</div> : null}
          <div className={styles.form}>
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.form}>
            <label>Content</label>
            <textarea
              cols={50}
              name="content"
              placeholder="Content"
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className={styles.form}>
            <button type="submit">Add Post</button>
          </div>
        </form>
      </div>      
    </Layout>
  );
}
