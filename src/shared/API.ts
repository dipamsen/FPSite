import Axios from "axios";

function locationType() {
  if (!window.location.host.replace(/localhost|127\.0\.0\.1/i, '')) return "dev";
  return "prod";
}

const API_URL = locationType() == "dev" ? "http://localhost:1930" : "https://fun-planet-fpsite-api.vercel.app"

export interface Question {
  question: string;
  options: string[]
}

export interface Test {
  id: string;
  title: string;
  questions: Question[];
  answers: number[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function get(url: string): Promise<any> {
  const { data } = await Axios.get(`${API_URL}${url}`)
  return data
}

export function getTest(testID: string): Promise<Test> {
  return get(`/test/${testID}`)
}
