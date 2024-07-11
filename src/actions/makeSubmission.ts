"use server";

export default async function makeSubmission(
  user_id: number,
  language_id: number,
  submissions: string[]
) {
  const response = await fetch(
    "http://localhost:8080/api/judge/submission/batch",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        language_id,
        submissions,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to make submission");
  }

  return await response.json();
}
