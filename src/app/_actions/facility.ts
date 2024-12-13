import axios from "axios";
import type { Facility } from "../_types/facility";

export async function createFacility(data: FormData) {
  axios.post("https://my-app.gigivadachkoria.workers.dev/facility", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
