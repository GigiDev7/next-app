import axios from "axios";

export async function deleteFacility(id: string) {
  axios.delete(`https://my-app.gigivadachkoria.workers.dev/facility/${id}`);
}

export async function editFacility(data: FormData, id: string) {
  axios.put(`https://my-app.gigivadachkoria.workers.dev/facility/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
