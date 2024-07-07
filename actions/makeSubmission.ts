"use server";

export default async function makeSubmission(
  user_id: number,
  language_id: number,
  source_code: string
) {
  const response = await fetch("http://localhost:8080/judge/submission", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id,
      language_id,
      source_code,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to make submission");
  }

  return await response.json();
}
