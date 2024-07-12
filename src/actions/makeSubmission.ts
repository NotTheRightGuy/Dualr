import makeAuthenticatedRequest from "./makeAuthenticateRequest";

export default async function makeSubmission(
  user_id: number,
  language_id: number,
  submissions: string[]
) {
  const response = makeAuthenticatedRequest("/judge/submission/batch", "POST", {
    user_id,
    language_id,
    submissions,
  });

  return await response;
}
